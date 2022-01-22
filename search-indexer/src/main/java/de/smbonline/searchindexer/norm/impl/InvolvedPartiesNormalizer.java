package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.norm.MultipleHitsSortedNormalizer;
import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;
import java.util.List;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class InvolvedPartiesNormalizer extends MultipleHitsSortedNormalizer<String> {

    private static final List<String> ROLES_BLACKLIST = Arrays.asList(
            "", "Leihgeber", "Mäzen", "Nachlasser", "Person", "Veräußerer", "Vorbesitzer"
    );

    private final boolean withExplicitRole;

    public InvolvedPartiesNormalizer(final boolean withExplicitRole) {
        super(INVOLVED_PARTIES_ATTRIBUTE, "ObjPerAssociationRef");
        this.withExplicitRole = withExplicitRole;
    }

    public boolean isWithExplicitRole() {
        return this.withExplicitRole;
    }

    @Override
    protected Data[] applyFilter(final Data[] items) {
        return Arrays.stream(items)
                .filter(item -> {
                    String value = item.getTypedAttribute(VIRTUAL_ATTRIBUTE_NAME);
                    if (StringUtils.isBlank(value)) {
                        return false;
                    }
                    String roleVoc = item.getTypedAttribute("RoleVoc");
                    if (StringUtils.isBlank(roleVoc)) {
                        roleVoc = StringUtils.substringAfterLast(value, ", ");
                    }
                    return !ROLES_BLACKLIST.contains(roleVoc);
                })
                .toArray(Data[]::new);
    }

    @Override
    protected String[] pickValues(final Data[] items) {
        return Arrays.stream(items).map(this::extractPartyInfo).toArray(String[]::new);
    }

    private String extractPartyInfo(final Data item) {
        return this.withExplicitRole ? buildPartyInfo(item) : StringUtils.trim(item.getTypedAttribute(VIRTUAL_ATTRIBUTE_NAME));
    }

    private static String buildPartyInfo(final Data item) {
        String person = item.getTypedAttribute(VIRTUAL_ATTRIBUTE_NAME);
        String role = item.getTypedAttribute("RoleVoc");

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