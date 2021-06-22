package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.norm.MultipleHitsSortedNormalizer;
import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;
import java.util.List;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class InvolvedPartiesNormalizer extends MultipleHitsSortedNormalizer<String> {

    private static final String MODULE_REFERENCE = "ObjPerAssociationRef";
    // super class uses the ref-key itself as attribute key
    private static final String VIRTUAL_NAME_ATTRIBUTE = "ObjPerAssociationRef";
    private static final String ROLE_VOC_ATTRIBUTE = "RoleVoc";

    private static final List<String> ROLES_BLACKLIST = Arrays.asList(
            "", "Leihgeber", "Mäzen", "Nachlasser", "Person", "Veräußerer", "Vorbesitzer"
    );

    private final boolean withExplicitRole;

    public InvolvedPartiesNormalizer(final boolean withExplicitRole) {
        super(INVOLVED_PARTIES_ATTRIBUTE, MODULE_REFERENCE);
        this.withExplicitRole = withExplicitRole;
    }

    public boolean isWithExplicitRole() {
        return this.withExplicitRole;
    }

    @Override
    protected Data[] applyFilter(final Data[] items) {
        return Arrays.stream(items)
                .filter(item -> {
                    String value = item.getTypedAttribute(VIRTUAL_NAME_ATTRIBUTE);
                    if (StringUtils.isBlank(value)) {
                        return false;
                    }
                    String roleVgr = item.getTypedAttribute(ROLE_VOC_ATTRIBUTE);
                    if (StringUtils.isBlank(roleVgr)) {
                        roleVgr = StringUtils.substringAfterLast(value, ", ");
                    }
                    return !ROLES_BLACKLIST.contains(roleVgr);
                })
                .toArray(Data[]::new);
    }

    @Override
    protected String[] pickValues(final Data[] items) {
        return Arrays.stream(items).map(this::extractPartyInfo).toArray(String[]::new);
    }

    private String extractPartyInfo(final Data item) {
        return this.withExplicitRole
                ? buildPartyInfo(item) : StringUtils.trim(item.getTypedAttribute(VIRTUAL_NAME_ATTRIBUTE));
    }

    private static String buildPartyInfo(final Data item) {
        String person = item.getTypedAttribute(VIRTUAL_NAME_ATTRIBUTE);
        String role = item.getTypedAttribute(ROLE_VOC_ATTRIBUTE);

        boolean hasPerson = StringUtils.isNotBlank(person);
        boolean hasRole = StringUtils.isNotBlank(role);

        StringBuilder sb = new StringBuilder();
        if (hasPerson) {
            sb.append(StringUtils.substringBeforeLast(person, ",").trim());
            if (hasRole) {
                sb.append(" (").append(role.trim()).append(')');
            }
        }
        return sb.toString();
    }
}