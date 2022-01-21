package de.smbonline.mdssync.exec.parser;

import org.springframework.lang.Nullable;
import org.springframework.util.StringUtils;

public class ParserUtils {

    /**
     * Concat given info to form an fq-key.
     * @param parentFqKey fq key of parent attribute
     * @param childName name of child attribute
     * @param childId id of child, probably build by {@link #toItemId(Long, int)}
     * @return attribute fq-key
     */
    public static String joinFqKey(
            final @Nullable String parentFqKey,
            final @Nullable String childName,
            final @Nullable Object childId) {

        boolean hasParentKey = !StringUtils.isEmpty(parentFqKey);
        boolean hasChildName = !StringUtils.isEmpty(childName);
        boolean hasChildId = !StringUtils.isEmpty(childId);

        StringBuilder sb = new StringBuilder();
        if (hasParentKey) {
            sb.append(parentFqKey);
            if (hasChildName || hasChildId) {
                sb.append('.');
            }
        }
        if (hasChildName) {
            sb.append(childName);
        }
        if (hasChildId) {
            sb.append('[').append(childId).append(']');
        }
        return sb.toString();
    }

    /**
     * Convert fq-key to regular attribute key. All item info is stripped.
     * @param fqKey attribute fq-key
     * @return attribute key
     */
    public static String toKey(final String fqKey) {
        String withoutTypes = fqKey.replaceAll("\\.(compositeItem|moduleItem|repeatableGroupItem|repeatableGroupReferenceItem|vocabularyReferenceItem|moduleReferenceItem)\\[", ".[");
        String withoutIds = withoutTypes.replaceAll("\\.?\\[.*?\\]", "");
        return withoutIds.length() > 0 && withoutIds.charAt(0) == '.' ? withoutIds.substring(1) : withoutIds;
    }

    /**
     * Build item id for use in fq-key. <i>id</i> and <i>index</i> are separated by #-sign.
     * @param id item id, may be null for composite-items
     * @param index index (seqNo) of item in list, may be -1 if we have "x:1" multiplicity or if there is no sequence info at all
     * @return item-id for use in fq-keys
     */
    public static String toItemId(final @Nullable Long id, final int index) {
        StringBuilder sb = new StringBuilder();
        if (id != null) {
            sb.append(id);
        }
        if (index != -1) {
            sb.append('#').append(index);
        }
        return sb.toString();
    }
}
