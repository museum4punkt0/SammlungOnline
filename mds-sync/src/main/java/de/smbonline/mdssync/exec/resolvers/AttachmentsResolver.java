package de.smbonline.mdssync.exec.resolvers;

import de.smbonline.mdssync.api.MdsApiClientFactory;
import de.smbonline.mdssync.api.MdsApiConfig;
import de.smbonline.mdssync.dataprocessor.queue.DataQueue;
import de.smbonline.mdssync.dto.Credits;
import de.smbonline.mdssync.dto.Image;
import de.smbonline.mdssync.dto.MdsAttachment;
import de.smbonline.mdssync.dto.ObjImage;
import de.smbonline.mdssync.dto.Operation;
import de.smbonline.mdssync.dto.WrapperDTO;
import de.smbonline.mdssync.exc.ErrorHandling;
import de.smbonline.mdssync.exc.MdsApiConnectionException;
import de.smbonline.mdssync.index.SearchIndexerConfig;
import de.smbonline.mdssync.jaxb.search.request.Search;
import de.smbonline.mdssync.jaxb.search.response.Attachment;
import de.smbonline.mdssync.jaxb.search.response.DataField;
import de.smbonline.mdssync.jaxb.search.response.Module;
import de.smbonline.mdssync.jaxb.search.response.ModuleItem;
import de.smbonline.mdssync.jaxb.search.response.ModuleReference;
import de.smbonline.mdssync.jaxb.search.response.ModuleReferenceItem;
import de.smbonline.mdssync.properties.ImageProcessingProperties;
import de.smbonline.mdssync.util.Licenses;
import org.apache.commons.lang3.ArrayUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

import java.net.URLConnection;
import java.util.Objects;

import static de.smbonline.mdssync.util.Lookup.*;
import static de.smbonline.mdssync.util.MdsConstants.*;

@Component
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class AttachmentsResolver extends ModuleItemResolverBase<MdsAttachment> {

    private static final String RESTRICTED_IMAGES_PATH = "restricted/";

    private final ImageProcessingProperties imageConfig;
    private final CreditsResolver creditsResolver;

    @Autowired
    public AttachmentsResolver(
            final MdsApiConfig mdsConfig,
            final ImageProcessingProperties imageConfig,
            final MdsApiClientFactory clientFactory,
            final SearchIndexerConfig indexerConfig,
            final CreditsResolver creditsResolver,
            final DataQueue<WrapperDTO> dataQueue) {
        super(MODULE_MULTIMEDIA, mdsConfig, indexerConfig, clientFactory, dataQueue);
        this.creditsResolver = creditsResolver;
        this.imageConfig = imageConfig;
    }

    @Override
    public ResolverResult parseAndProcess(
            final Module module,
            final ResolverContext ctx) {
        return parseAndProcess(module, state(), null);
    }

    private ResolverResult parseAndProcess(
            final Module module,
            final ResolverResult result,
            final @Nullable ModuleItem objectItem) {
        for (ModuleItem mediaItem : module.getModuleItem()) {
            // sync image attachments
            Attachment attachment = mediaItem.getAttachment();
            result.processed(mediaItem.getId()); // will be treated as "skipped" later in case we don't get into the process method
            if (isImage(attachment)) {
                try {
                    Image img = parseImageData(mediaItem, objectItem);
                    process(newWrapper(img, Operation.UPSERT, result));
                } catch (Exception exc) {
                    ErrorHandling.capture(exc, "Failed to sync attachment {}", mediaItem.getId());
                    result.failed(mediaItem.getId());
                }
            }
            // TODO allow more types
        }
        return result;
    }

    private Image parseImageData(final ModuleItem item, final @Nullable ModuleItem objectItem)
            throws MdsApiConnectionException {

        // TODO use parser
        Credits credits = this.creditsResolver.buildCredits(objectItem, item);
        String name = validImageFilename(item);
        String path = Licenses.isRightsHolder(credits.getLicenseKey()) ? RESTRICTED_IMAGES_PATH + name : name;

        Image img = new Image(item.getId());
        img.setFilePath(path);
        img.setBase64(item.getAttachment().getValue());

        if (objectItem != null) {
            ModuleReference multimediaRef = Objects.requireNonNull(
                    findFirst(objectItem.getModuleReference(), ref -> MODULE_MULTIMEDIA.equals(ref.getTargetModule())));
            ModuleReferenceItem mediaRefItem = Objects.requireNonNull(
                    findFirst(multimediaRef.getModuleReferenceItem(),
                            ref -> ref.getModuleItemId().equals(item.getId()))
            );
            img = new ObjImage(img, objectItem.getId(), 0, isPrimaryImage(mediaRefItem));
            ((ObjImage)img).setCredits(credits);
        }
        return img;
    }

    @Override
    public ResolverResult parseAndProcessReferences(final ModuleItem objectItem, final boolean linkToParent, final String language)
            throws MdsApiConnectionException {

        LOGGER.debug("Checking attachments for object {}...", objectItem.getId());

        int total = 0;
        ResolverResult result = new ResolverResult();

        // There are different ways to fetch the media.
        // Our approach is to use all attachment ids and combine them into an OR-search...
        // ...but only paginated as it is too heavy-weight for MDS

        ModuleReference multimediaRef = findFirst(objectItem.getModuleReference(), ref -> MODULE_MULTIMEDIA.equals(ref.getTargetModule()));
        if (multimediaRef != null && (total = Math.toIntExact(multimediaRef.getSize())) > 0) {
            Long[] attachmentIds = multimediaRef.getModuleReferenceItem()
                    .stream()
                    .map(ModuleReferenceItem::getModuleItemId)
                    .toArray(Long[]::new);

            for (int offset = 0, limit = 3; offset < attachmentIds.length; offset += limit) {
                Long[] partialIds = ArrayUtils.subarray(attachmentIds, offset, offset + limit);
                Search attachmentSearch = getSearchRequestHelper().buildSearchPayload(partialIds);
                attachmentSearch.setLoadAttachment(true);
                Module multimedia = getMdsClient().search(attachmentSearch, language);
                parseAndProcess(multimedia, result, linkToParent ? objectItem : null);
                if (result.getSuccessfulIds().size() >= this.imageConfig.getMaxImagesPerObject()) {
                    LOGGER.info("Reached max amount of configured images per object. Skipping the rest.");
                    break;
                }
            }
        }

        logStatistics(total, result);
        return result;
    }

    private String validImageFilename(final ModuleItem mediaItem) {
        Attachment attachment = mediaItem.getAttachment();
        String actualName = attachment.getName() == null ? "." + this.imageConfig.getDefaultImageType() : attachment.getName();
        String suffix = actualName.substring(actualName.lastIndexOf('.') + 1).toLowerCase();
        return mediaItem.getId() + "." + suffix;
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
    private static boolean isPrimaryImage(final ModuleReferenceItem mediaItem) {
        DataField thumbnail = findDataField(mediaItem.getDataField(), "ThumbnailBoo");
        return thumbnail != null && "true".equals(thumbnail.getValue());
    }
}
