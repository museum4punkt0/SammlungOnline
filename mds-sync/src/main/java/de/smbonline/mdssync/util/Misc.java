package de.smbonline.mdssync.util;

import de.smbonline.mdssync.dto.Operation;
import de.smbonline.mdssync.dto.SyncCycle;
import de.smbonline.mdssync.dto.SyncCycleType;
import de.smbonline.mdssync.dto.WrapperDTO;
import de.smbonline.mdssync.exc.ErrorHandling;
import de.smbonline.mdssync.exec.SyncResult;
import de.smbonline.mdssync.jaxb.search.response.Attachment;
import de.smbonline.mdssync.jaxb.search.response.Module;
import de.smbonline.mdssync.jaxb.search.response.ModuleItem;
import de.smbonline.mdssync.jaxb.search.response.ObjectFactory;
import de.smbonline.mdssync.jaxb.search.response.SystemField;
import de.smbonline.mdssync.jaxb.search.response.Thumbnail;
import de.smbonline.mdssync.jaxb.search.response.VocabularyReferenceItem;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.Nullable;

import java.time.OffsetDateTime;
import java.util.Arrays;

import static de.smbonline.mdssync.util.MdsConstants.*;

public final class Misc {

    private static final Logger LOGGER = LoggerFactory.getLogger(Misc.class);
    public static final ObjectFactory RESPONSE_FACTORY = new ObjectFactory();

    public static WrapperDTO createSyncCycleWrapper(final String module, final SyncCycleType type, final SyncResult result, final OffsetDateTime timestamp) {
        return createSyncCycleWrapper(module, type, result, timestamp, null);
    }

    public static WrapperDTO createSyncCycleWrapper(final String module, final SyncCycleType type, final SyncResult result, final OffsetDateTime timestamp, final @Nullable String info) {
        SyncCycle sync = new SyncCycle();
        sync.setType(type);
        sync.setModule(module);
        sync.setTimestamp(timestamp);
        sync.setDebugInformation(info == null ? result.getSummary() : info);
        // TODO this is not entirely correct. In case of DELETIONS we don't really know if the item was
        //  deleted or skipped in case it didn't exist. Also, Hasura console loads too slow if we store all
        //  the succeeded ids.
        //sync.setSucceeded(result.getSuccessfulIds());
        sync.setFailed(result.getFailedIds());
        sync.setSkipped(result.getSkippedIds());

        WrapperDTO wrapper = new WrapperDTO(sync);
        wrapper.setOperation(Operation.UPSERT);
        wrapper.getOnError().add(exc -> {
            ErrorHandling.capture(exc, "Error updating sync cycle");
            return null;
        });
        return wrapper;
    }

    public static String nonNullVocName(final VocabularyReferenceItem refItem) {
        String nonNull = refItem.getName();
        if (nonNull == null && refItem.getFormattedValue() != null) {
            nonNull = refItem.getFormattedValue().getValue();
        }
        if (nonNull == null) {
            nonNull = refItem.getId();
        }
        return nonNull;
    }

    public static Module emptyModule(final String name) {
        Module dummy = RESPONSE_FACTORY.createModule();
        dummy.setName(name);
        dummy.setTotalSize(0L);
        return dummy;
    }

    public static Module asModule(final ModuleItem item) {
        Module dummyModule = RESPONSE_FACTORY.createModule();
        dummyModule.getModuleItem().add(item);
        dummyModule.setTotalSize(1L);
        return dummyModule;
    }

    public static Module markAsDeleted(final Long... ids) {
        Module dummyModule = RESPONSE_FACTORY.createModule();
        dummyModule.getModuleItem().addAll(
                Arrays.stream(ids).map(id -> {
                    SystemField trashBin = RESPONSE_FACTORY.createSystemField();
                    trashBin.setName(FIELD_ORG_UNIT);
                    trashBin.setValue(ORGUNIT_TRASHBIN);
                    ModuleItem dummyItem = RESPONSE_FACTORY.createModuleItem();
                    dummyItem.setId(id);
                    dummyItem.getSystemField().add(trashBin);
                    return dummyItem;
                }).toList());
        dummyModule.setTotalSize((long) dummyModule.getModuleItem().size());
        return dummyModule;
    }

    public static Attachment asAttachment(final Thumbnail thumb, final String name) {
        Attachment attachment = RESPONSE_FACTORY.createAttachment();
        attachment.setName(name);
        attachment.setValue(thumb.getValue());
        return attachment;
    }

    /**
     * Try to convert string to MB. If no unit-suffix is available, assumes KB as base.
     *
     * @param sizeText something like "1244847", "123 KB", "34.45 MB", ...
     * @return converted value to MB or -1 if not possible
     */
    public static int sizeToMegaBytes(final String sizeText) {
        if (StringUtils.isNumeric(sizeText)) {
            return (int) Math.ceil(Double.parseDouble(sizeText) / 1000); // assume KB
        }
        if (sizeText.toLowerCase().endsWith("mb")) {
            String number = sizeText.substring(0, sizeText.length() - 2).trim();
            return (int) Math.ceil(Double.parseDouble(number)); // mb
        }
        if (sizeText.toLowerCase().endsWith("kb")) {
            String number = sizeText.substring(0, sizeText.length() - 2).trim();
            return (int) Math.ceil(Double.parseDouble(number) / 1000); // kb
        }
        LOGGER.warn("Can't convert {} to MB, expected numeric value (with KB suffix).", sizeText);
        return -1;
    }

    private Misc() {
        // no instances
    }
}
