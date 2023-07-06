package de.smbonline.mdssync.exec.resolvers;

import de.smbonline.mdssync.api.MdsApiClientFactory;
import de.smbonline.mdssync.api.MdsApiConfig;
import de.smbonline.mdssync.dataprocessor.queue.DataQueue;
import de.smbonline.mdssync.dataprocessor.service.AttachmentService;
import de.smbonline.mdssync.dto.Credits;
import de.smbonline.mdssync.dto.Image;
import de.smbonline.mdssync.dto.MdsAttachment;
import de.smbonline.mdssync.dto.ObjImage;
import de.smbonline.mdssync.dto.Operation;
import de.smbonline.mdssync.dto.WrapperDTO;
import de.smbonline.mdssync.exc.ErrorHandling;
import de.smbonline.mdssync.exc.MdsApiConnectionException;
import de.smbonline.mdssync.index.SearchIndexerClient;
import de.smbonline.mdssync.jaxb.search.request.Search;
import de.smbonline.mdssync.jaxb.search.response.Attachment;
import de.smbonline.mdssync.jaxb.search.response.Composite;
import de.smbonline.mdssync.jaxb.search.response.CompositeItem;
import de.smbonline.mdssync.jaxb.search.response.DataField;
import de.smbonline.mdssync.jaxb.search.response.Module;
import de.smbonline.mdssync.jaxb.search.response.ModuleItem;
import de.smbonline.mdssync.jaxb.search.response.ModuleReference;
import de.smbonline.mdssync.jaxb.search.response.ModuleReferenceItem;
import de.smbonline.mdssync.jaxb.search.response.Thumbnail;
import de.smbonline.mdssync.jaxb.search.response.ThumbnailSize;
import de.smbonline.mdssync.properties.ImageProcessingProperties;
import de.smbonline.mdssync.util.Dates;
import de.smbonline.mdssync.util.Licenses;
import de.smbonline.mdssync.util.ValueExtractor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

import java.net.URLConnection;
import java.time.OffsetDateTime;
import java.util.Comparator;
import java.util.Objects;

import static de.smbonline.mdssync.util.Lookup.*;
import static de.smbonline.mdssync.util.MdsConstants.*;
import static de.smbonline.mdssync.util.Misc.*;
import static de.smbonline.mdssync.util.ValueExtractor.*;

@Component
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class AttachmentsResolver extends ModuleItemResolverBase<MdsAttachment> {

    private static final String RESTRICTED_IMAGES_PATH = "restricted/";

    private final ImageProcessingProperties imageConfig;
    private final CreditsResolver creditsResolver;
    private final AttachmentService attachmentService;

    @Autowired
    public AttachmentsResolver(
            final MdsApiConfig mdsConfig,
            final ImageProcessingProperties imageConfig,
            final AttachmentService attachmentService,
            final MdsApiClientFactory clientFactory,
            final SearchIndexerClient indexerClient,
            final CreditsResolver creditsResolver,
            final DataQueue<WrapperDTO> dataQueue) {
        super(MODULE_MULTIMEDIA, mdsConfig, indexerClient, clientFactory, dataQueue);
        this.creditsResolver = creditsResolver;
        this.imageConfig = imageConfig;
        this.attachmentService = attachmentService;
    }

    @Override
    public ResolverResult parseAndProcess(final Module module, final ResolverContext ctx) {
        Module objects;
        for (ModuleItem mediaItem : module.getModuleItem()) {
            Long id = mediaItem.getId();
            try {
                ModuleReference objectRef = findObjectReference(mediaItem);
                if (objectRef == null || (objects = fetchReferencedModule(objectRef, ctx.language)).getModuleItem().isEmpty()) {
                    // no references found, this means the attachment is not linked anymore - we can delete it
                    parseAndProcess(mediaItem, state(), null, Operation.DELETE, ctx.force);
                } else {
                    // in 99% we have only one object here ... but the blocked attachments are shared
                    for (ModuleItem objectItem : objects.getModuleItem()) {
                        parseAndProcess(mediaItem, state(), objectItem, Operation.UPSERT, ctx.force);
                    }
                }
            } catch (MdsApiConnectionException exc) {
                ErrorHandling.capture(exc, "Failed to sync attachment {}", id);
                state().failed(id);
            }
        }
        return state();
    }

    private boolean parseAndProcess(
            final ModuleItem mediaItem,
            final ResolverResult result,
            final @Nullable ModuleItem objectItem,
            final Operation operation,
            final boolean force) throws MdsApiConnectionException {

        // will be treated as "skipped" later in case we don't get into the process method
        result.processed(mediaItem.getId());

        boolean needsProcessing = force || operation == Operation.DELETE || !isUpToDate(mediaItem, objectItem);
        if (!needsProcessing) {
            return false;
        }

        Attachment attachment = resolveAttachment(mediaItem, true);

        // sync image attachments
        if (isImage(attachment)) {
            try {
                Image img = parseImageData(mediaItem, attachment, objectItem);
                process(newWrapper(img, operation, result));
            } catch (Exception exc) {
                ErrorHandling.capture(exc, "Failed to sync attachment {}", mediaItem.getId());
                result.failed(mediaItem.getId());
            }
        }
        // TODO allow more types

        boolean success = result.hasSucceeded(mediaItem.getId());
        if (success && objectItem != null) {
            // TODO should be done in SyncRunner instead - add to ctx
            notifyReindexObject(objectItem.getId(), "assets", "attachments");
        }
        return success;
    }

    private @Nullable Attachment resolveAttachment(final ModuleItem mediaItem, final boolean retry) throws MdsApiConnectionException {

        // if config.autoLoadAttachments==true, we already have an attachment
        if (mediaItem.getAttachment() != null) {
            return mediaItem.getAttachment();
        }

        // if we come in here after retry, we should have a thumbnail
        if (mediaItem.getThumbnails() != null) {
            Thumbnail thumb = findFirst(mediaItem.getThumbnails().getThumbnail(), t -> t.getSize() == ThumbnailSize.EXTRA_LARGE);
            if (thumb != null) {
                return asAttachment(thumb, mediaItem.getId() + "-xl.jpg"); // thumbnails are JPG, always
            }
        }

        // sometimes the attachment is too big, in this case we fall back to loadThumbnailExtraLarge="true"
        String size = extractValue(findDataField(mediaItem.getDataField(), "MulSizeTxt"));
        if (size != null) {
            int mb = sizeToMegaBytes(size);
            if (mb > this.imageConfig.getMaxOriginalSize() && retry) {
                ModuleItem fullItem = getMdsClient().get(mediaItem.getId(), null); // loads ThumbnailExtraLarge
                if (fullItem != null) {
                    return resolveAttachment(fullItem, false);
                }
            }
        }

        // if size info is missing are we are below the maximum, fetch the actual attachment
        return retry ? getMdsClient().getAttachment(mediaItem.getId()) : null;
    }

    private Image parseImageData(final ModuleItem mediaItem, final Attachment imageData, final @Nullable ModuleItem objectItem)
            throws MdsApiConnectionException {

        // TODO extract/use ImageParser
        Credits credits = this.creditsResolver.buildCredits(objectItem, mediaItem);
        String relativePath = validImageFilePath(imageData.getName(), mediaItem.getId());
        String absolutePath = Licenses.isRightsHolder(credits.getLicenseKey()) ? RESTRICTED_IMAGES_PATH + relativePath : relativePath;

        Image img = new Image(mediaItem.getId());
        img.setFilePath(absolutePath);
        img.setBase64(imageData.getValue());
        // credits are not entirely available if object-item is missing - so these are set only for ObjImage but not for Image

        if (objectItem != null) {
            ModuleReferenceItem refItem = findReferenceItem(mediaItem, objectItem);
            img = new ObjImage(img, objectItem.getId(), extractSortInfo(refItem), isPrimaryImage(refItem));
            ((ObjImage) img).setCredits(credits);
        }
        return img;
    }

    @Override
    public ResolverResult parseAndProcessReferences(final ModuleItem objectItem, final boolean linkToParent, final String language)
            throws MdsApiConnectionException {

        LOGGER.debug("Checking attachments for object {}...", objectItem.getId());

        int total = 0;
        ResolverResult result = new ResolverResult();

        // There are different ways to fetch the media. Our approach is to run a separate search for each id
        // as it is too heavy-weight for MDS to fetch in bulk. On the other hand, directly fetching the attachments
        // by id is not ideal as we would bypass the approval filter which we can only apply when we use search.

        ModuleReference multimediaRef = findFirst(objectItem.getModuleReference(), ref -> MODULE_MULTIMEDIA.equals(ref.getTargetModule()));
        if (multimediaRef != null && (total = Math.toIntExact(multimediaRef.getSize())) > 0) {
            Long[] attachmentIds = multimediaRef.getModuleReferenceItem()
                    .stream()
                    .sorted(Comparator.comparingInt(ValueExtractor::extractSortInfo))
                    .map(ModuleReferenceItem::getModuleItemId)
                    .toArray(Long[]::new);

            for (Long id : attachmentIds) {
                // use search instead of fetch to honor approval-filter
                Search attachmentSearch = getSearchRequestHelper().buildSearchPayload(id);
                Module multimedia = getMdsClient().search(attachmentSearch, language);
                if (!multimedia.getModuleItem().isEmpty()) {
                    ModuleItem mediaItem = multimedia.getModuleItem().get(0);
                    parseAndProcess(mediaItem, result, linkToParent ? objectItem : null, Operation.UPSERT, true);
                    if (result.getSuccessfulIds().size() >= this.imageConfig.getMaxImagesPerObject()) {
                        LOGGER.info("Reached max amount of configured images per object. Skipping the rest.");
                        break;
                    }
                }
            }
        }

        logStatistics(total, result);
        return result;
    }

    private String validImageFilePath(final @Nullable String name, final Long itemId) {
        String actualName = name == null ? "." + this.imageConfig.getDefaultImageType() : name;
        String newName = "";
        if (actualName.endsWith("-xl.jpg")) {
            // our thumbnail logic is already applied - keep it
            newName = actualName;
        } else {
            // replace weird filenames with item-id
            String suffix = actualName.substring(actualName.lastIndexOf('.') + 1).toLowerCase();
            newName = itemId + "." + suffix;
        }
        String folder = itemId < 10 ? "0" + itemId : itemId.toString().substring(0, 2);
        return folder + "/" + newName;
    }

    private boolean isUpToDate(final ModuleItem mediaItem, final @Nullable ModuleItem objectItem) {
        String lastModified = extractValue(findSysField(mediaItem.getSystemField(), FIELD_LAST_MODIFIED));
        if (lastModified == null) {
            // no info available - we need to assume attachment is not up-to-date
            return false;
        }
        OffsetDateTime lastSynced = objectItem == null
                ? this.attachmentService.getLastUpdated(mediaItem.getId())
                : this.attachmentService.getLastUpdated(mediaItem.getId(), objectItem.getId());
        if (lastSynced == null) {
            // never synced - hence outdated
            return false;
        }
        // we only store sync time, not the updated-timestamp of the attachment -
        // hence it's only approximately correct
        return lastSynced.minusMinutes(5).isAfter(Dates.toOffsetDateTime(lastModified));
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
     * @param refItem multimedia-reference item (from Object) or object-reference item (from Attachment)
     * @return if the media described by the given item is considered a primary attachment
     */
    private static boolean isPrimaryImage(final ModuleReferenceItem refItem) {
        DataField thumbnail = findDataField(refItem.getDataField(), "ThumbnailBoo");
        return thumbnail != null && "true".equals(thumbnail.getValue());
    }

    private static @Nullable ModuleReference findObjectReference(final ModuleItem mediaItem) {
        Composite composite = findFirst(mediaItem.getComposite(), c -> "MulReferencesCre".equals(c.getName()));
        return composite == null ? null : composite.getCompositeItem().stream()
                .map(CompositeItem::getModuleReference)
                .filter(ref -> "MulObjectRef".equals(ref.getName()))
                .findFirst().orElse(null);
    }

    private static ModuleReferenceItem findReferenceItem(final ModuleItem mediaItem, final ModuleItem objectItem) {
        ModuleReference multimediaRef = Objects.requireNonNull(
                findFirst(objectItem.getModuleReference(), ref -> MODULE_MULTIMEDIA.equals(ref.getTargetModule())));
        return Objects.requireNonNull(
                findFirst(multimediaRef.getModuleReferenceItem(), ref -> ref.getModuleItemId().equals(mediaItem.getId()))
        );
    }
}
