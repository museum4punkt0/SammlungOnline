package de.smbonline.mdssync.exec;

import de.smbonline.mdssync.api.MdsApiClientFactory;
import de.smbonline.mdssync.api.MdsApiConfig;
import de.smbonline.mdssync.api.SearchRequestHelper;
import de.smbonline.mdssync.dataprocessor.queue.DataQueue;
import de.smbonline.mdssync.dto.CreditsDTO;
import de.smbonline.mdssync.dto.ImageDTO;
import de.smbonline.mdssync.dto.Operation;
import de.smbonline.mdssync.dto.WrapperDTO;
import de.smbonline.mdssync.exc.MdsApiConnectionException;
import de.smbonline.mdssync.jaxb.search.request.Search;
import de.smbonline.mdssync.jaxb.search.response.Attachment;
import de.smbonline.mdssync.jaxb.search.response.DataField;
import de.smbonline.mdssync.jaxb.search.response.Module;
import de.smbonline.mdssync.jaxb.search.response.ModuleItem;
import de.smbonline.mdssync.jaxb.search.response.ModuleReference;
import de.smbonline.mdssync.jaxb.search.response.ModuleReferenceItem;
import de.smbonline.mdssync.log.ErrorLogging;
import de.smbonline.mdssync.util.Credits;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

import java.net.URLConnection;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicInteger;

import static de.smbonline.mdssync.util.Lookup.*;
import static de.smbonline.mdssync.util.MdsConstants.*;

@Component
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class AttachmentsResolver {

    private static final Logger LOGGER = LoggerFactory.getLogger(AttachmentsResolver.class);
    private static final String RESTRICTED_IMAGES_PATH = "restricted/";

    private final DataQueue<WrapperDTO> imageQueue;
    private final MdsApiClientFactory clientFactory;
    private final CreditsResolver creditsResolver;
    private final SearchRequestHelper requestHelper;

    @Autowired
    public AttachmentsResolver(
            final MdsApiConfig mdsConfig,
            final MdsApiClientFactory clientFactory,
            final CreditsResolver creditsResolver,
            final DataQueue<WrapperDTO> dataQueue) {
        this.clientFactory = clientFactory;
        this.creditsResolver = creditsResolver;
        this.requestHelper = new SearchRequestHelper(mdsConfig, MODULE_MULTIMEDIA);
        this.imageQueue = dataQueue;
    }

    public void processAttachments(final ModuleItem objectItem) throws MdsApiConnectionException {

        LOGGER.debug("Checking attachments for object {}...", objectItem.getId());

        AtomicInteger processed = new AtomicInteger(0);
        int total = 0;

        // There are different ways to fetch the media.
        // Our approach is to use all attachment ids and combine them into an OR-search.

        ModuleReference multimediaRef = findFirst(objectItem.getModuleReference(), ref -> MODULE_MULTIMEDIA.equals(ref.getTargetModule()));
        if (multimediaRef != null && (total = Math.toIntExact(multimediaRef.getSize())) > 0) {
            Long[] attachmentIds = multimediaRef.getModuleReferenceItem()
                    .stream()
                    .map(ModuleReferenceItem::getModuleItemId)
                    .toArray(Long[]::new);
            Search attachmentSearch = this.requestHelper.buildSearchPayload(attachmentIds);
            attachmentSearch.setLoadAttachment(true);
            Module multimedia = this.clientFactory.getApiClient(MODULE_MULTIMEDIA).search(attachmentSearch, null);
            for (ModuleItem mediaItem : multimedia.getModuleItem()) {
                // sync image attachments
                Attachment attachment = mediaItem.getAttachment();
                if (isImage(attachment)) {
                    ModuleReferenceItem mediaRefItem = Objects.requireNonNull(
                            findFirst(multimediaRef.getModuleReferenceItem(),
                                    ref -> ref.getModuleItemId().equals(mediaItem.getId()))
                    );
                    CreditsDTO credits = buildCredits(objectItem, mediaItem);
                    String name = validImageFilename(mediaItem);
                    String path = Credits.isRightsHolder(credits.getLicenseKey()) ? RESTRICTED_IMAGES_PATH + name : name;
                    ImageDTO img = new ImageDTO(objectItem.getId());
                    img.setImageFilePath(path);
                    img.setPrimary(isPrimaryAttachment(mediaRefItem));
                    img.setBase64(attachment.getValue());
                    img.setCredits(credits);
                    this.imageQueue.add(newWrapper(img, processed));
                }
            }
        }

        if (total == 0) {
            LOGGER.debug("Nothing to sync.");
        } else if (total != processed.get()) {
            LOGGER.debug("Synced {} images, skipped {} unsupported attachments.", processed.get(), (total - processed.get()));
        } else {
            LOGGER.debug("Synced {} images.", processed.get());
        }
    }

    private String validImageFilename(final ModuleItem mediaItem) {
        Attachment attachment = mediaItem.getAttachment();
        String actualName = attachment.getName() == null ? ".jpg" : attachment.getName();
        String suffix = actualName.substring(actualName.lastIndexOf('.') + 1).toLowerCase();
        return mediaItem.getId() + "." + suffix;
    }

    private CreditsDTO buildCredits(final ModuleItem objectItem, final ModuleItem mediaItem) throws MdsApiConnectionException {
        return this.creditsResolver.apply(objectItem, mediaItem);
    }

    private static boolean isImage(final @Nullable Attachment attachment) {
        if (attachment == null) {
            return false;
        }
        String mimeType = URLConnection.guessContentTypeFromName(attachment.getName());
        if (mimeType == null) {
            return false;
        }
        int slashIdx = mimeType.indexOf('/');
        return "image".equals(slashIdx == -1 ? mimeType : mimeType.substring(0, slashIdx));
    }

    /**
     * Checks if the given multimedia reference item fulfils requirement of a "Standardbild".
     * Checked requirement is {@code ThumbnailBoo == "true"}.
     *
     * @param mediaItem multimedia reference item
     * @return if the media described by the given item is considered a primary attachment
     */
    private static boolean isPrimaryAttachment(final ModuleReferenceItem mediaItem) {
        DataField thumbnail = findDataField(mediaItem.getDataField(), "ThumbnailBoo");
        return thumbnail != null && "true".equals(thumbnail.getValue());
    }

    private WrapperDTO newWrapper(final ImageDTO img, final AtomicInteger counter) {
        WrapperDTO wrapper = new WrapperDTO(img);
        wrapper.setOperation(Operation.UPSERT);
        wrapper.setAfterExecuteCommand(() -> {
            LOGGER.info("Attachment {} for object {}...", img.getImageFilePath(), img.getObjectId());
            counter.incrementAndGet();
            return null;
        });
        wrapper.setBeforeExecuteCommand(() -> {
            LOGGER.debug("Saving attachment {} for object {}...", img.getImageFilePath(), img.getObjectId());
            return null;
        });
        wrapper.setOnError(exc -> {
            // It's a bit hacky to do this here, but...
            // ...saving most likely failed due to huge attachment size so we better clear the data here to free memory
            img.setBase64(new byte[0]);
            ErrorLogging.log(exc, "Exception executing upsert of image {} for object {}", img.getImageFilePath(), img.getObjectId());
            return null;
        });
        return wrapper;
    }
}
