package de.smbonline.mdssync.exec;

import de.smbonline.mdssync.dataprocessor.queue.DataQueue;
import de.smbonline.mdssync.dto.ImageDTO;
import de.smbonline.mdssync.dto.Operation;
import de.smbonline.mdssync.dto.WrapperDTO;
import de.smbonline.mdssync.exc.MdsApiConnectionException;
import de.smbonline.mdssync.ruleset.AttachmentCreditsLineRule;
import de.smbonline.mdssync.search.MdsApiClient;
import de.smbonline.mdssync.search.MdsApiConfig;
import de.smbonline.mdssync.search.SearchRequestHelper;
import de.smbonline.mdssync.search.request.Search;
import de.smbonline.mdssync.search.response.Attachment;
import de.smbonline.mdssync.search.response.DataField;
import de.smbonline.mdssync.search.response.Module;
import de.smbonline.mdssync.search.response.ModuleItem;
import de.smbonline.mdssync.search.response.ModuleReference;
import de.smbonline.mdssync.search.response.ModuleReferenceItem;
import de.smbonline.mdssync.log.ErrorLogging;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

import java.net.URLConnection;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Objects;

import static de.smbonline.mdssync.util.Lookup.*;

@Component
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class AttachmentsResolver {

    private static final Logger LOGGER = LoggerFactory.getLogger(AttachmentsResolver.class);
    private static final String ATTACHMENTS_MODULE_NAME = "Multimedia";

    private final DataQueue<WrapperDTO> imageQueue;
    private final MdsApiClient multimediaApiClient;
    private final SearchRequestHelper requestHelper;
    private final Config config;

    @Autowired
    public AttachmentsResolver(final MdsApiConfig mdsConfig, final DataQueue<WrapperDTO> dataQueue) {
        this.multimediaApiClient = new MdsApiClient(mdsConfig, ATTACHMENTS_MODULE_NAME);
        this.requestHelper = new SearchRequestHelper(mdsConfig, ATTACHMENTS_MODULE_NAME);
        this.imageQueue = dataQueue;
        this.config = new Config();
    }

    public void processAttachments(final ModuleItem objectItem) throws MdsApiConnectionException {

        LOGGER.debug("Checking attachments for object {}...", objectItem.getId());

        int processed = 0;
        int total = 0;

        // There are different ways to fetch the media.
        // Our approach is to use all attachment ids and combine them into an OR-search.

        ModuleReference multimediaRef = findFirst(objectItem.getModuleReference(), ref -> ATTACHMENTS_MODULE_NAME.equals(ref.getTargetModule()));
        if (multimediaRef != null && (total = Math.toIntExact(multimediaRef.getSize())) > 0) {
            Long[] attachmentIds = multimediaRef.getModuleReferenceItem()
                    .stream()
                    .map(ModuleReferenceItem::getModuleItemId)
                    .toArray(Long[]::new);
            Search attachmentSearch = this.requestHelper.buildSearchPayload(attachmentIds);
            attachmentSearch.setLoadAttachment(true);
            Module multimedia = this.multimediaApiClient.search(attachmentSearch, null);
            for (ModuleItem mediaItem : multimedia.getModuleItem()) {
                // sync image attachments
                Attachment attachment = mediaItem.getAttachment();
                if (isImage(attachment)) {
                    processed++;
                    ModuleReferenceItem mediaRefItem = Objects.requireNonNull(
                            findFirst(multimediaRef.getModuleReferenceItem(),
                                    ref -> ref.getModuleItemId().equals(mediaItem.getId()))
                    );
                    String name = validImageFilename("", mediaItem); // TBD set object-id as prefix?
                    ImageDTO img = new ImageDTO(objectItem.getId());
                    img.setImageFileName(name);
                    img.setPrimary(isPrimaryAttachment(mediaRefItem));
                    img.setBase64(attachment.getValue());
                    img.setCredits(buildCreditsLine(mediaItem));
                    this.imageQueue.add(newWrapper(img));
                }
            }
        }

        if (total == 0) {
            LOGGER.debug("Nothing to sync.");
        } else if (total != processed) {
            LOGGER.debug("Synced {} images, skipped {} unsupported attachments.", processed, (total - processed));
        } else {
            LOGGER.debug("Synced {} images.", processed);
        }
    }

    private String validImageFilename(final String prefix, final ModuleItem mediaItem) {
        Attachment attachment = mediaItem.getAttachment();

        String actualName = attachment.getName() == null ? ".jpg" : attachment.getName();
        if (this.config.isUseSimpleImageNames()) {
            return prefix + mediaItem.getId() + "." + actualName.substring(actualName.lastIndexOf('.') + 1);
        }

        String uniqueName = prefix + mediaItem.getId() + "_" + actualName;
        String encodedName = URLEncoder.encode(uniqueName, StandardCharsets.ISO_8859_1);
        String prettyName = encodedName
                // The space character " " is converted into a plus sign "+". We don't want that.
                .replace("+", "-")
                // the slash is indeed required for path handling
                .replace("%2F", "/")
                // some chars are not critical - so keep those for better readability
                .replace("%40", "@")
                .replace("%2C", ",")
                .replace("%28", "(")
                .replace("%29", ")");
        LOGGER.debug("Transformed attachment name '{}' to filename '{}'", attachment.getName(), prettyName);
        return prettyName;
    }

    private static String buildCreditsLine(final ModuleItem mediaItem) {
        return new AttachmentCreditsLineRule().apply(mediaItem);
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
        DataField thumbnail = findOne(mediaItem.getDataField(), f -> "ThumbnailBoo".equals(f.getName()));
        return thumbnail != null && "true".equals(thumbnail.getValue());
    }

    private WrapperDTO newWrapper(final ImageDTO img) {
        WrapperDTO wrapper = new WrapperDTO(img);
        wrapper.setOperation(Operation.UPSERT);
        wrapper.setAfterExecuteCommand(() -> null);
        wrapper.setBeforeExecuteCommand(() -> null);
        wrapper.setOnError(exc -> {
            ErrorLogging.log(exc, "Exception executing upsert of image {} for object {}", img.getImageFileName(), img.getObjectId());
            return null;
        });
        return wrapper;
    }

    public static class Config {

        private boolean useSimpleImageNames = true;

        public void setUseSimpleImageNames(final boolean flag) {
            this.useSimpleImageNames = flag;
        }

        public boolean isUseSimpleImageNames() {
            return this.useSimpleImageNames;
        }
    }
}
