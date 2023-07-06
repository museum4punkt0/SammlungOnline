package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import de.smbonline.searchindexer.norm.Normalizer;
import de.smbonline.searchindexer.norm.NormalizerBase;
import de.smbonline.searchindexer.norm.impl.mappings.MappingSupplier;
import de.smbonline.searchindexer.norm.impl.shared.Links;
import de.smbonline.searchindexer.util.Validations;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.ObjectProvider;

import java.util.Arrays;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class AssetsNormalizer implements Normalizer<Data[]> {

    private final ObjectProvider<? extends MappingSupplier> graphQl;

    public AssetsNormalizer(final ObjectProvider<? extends MappingSupplier> graphQl) {
        this.graphQl = graphQl;
    }

    private boolean isBlocked(final ObjectData.Attachment attachment) {
        // TODO check via graphQl blocked_attachments
        Long id = Validations.requireId(attachment.getId());
        return id == 5802648L || id == 6545994L || id == 6548841L;
    }
    private String getBlockedReason(final ObjectData.Attachment attachment,final String language) {
        // TODO
        return null;
    }

    @Override
    public String getAttributeKey() {
        return ASSETS_ATTRIBUTE;
    }

    @Override
    public String[] getRelevantAttributeKeys() {
        return new String[]{
                "ObjMultimediaRef.__id",
                "ObjMultimediaRef.SortLnu",
                "ObjMultimediaRef.ThumbnailBoo",
        };
    }

    @Override
    public Data[] resolveAttributeValue(final ObjectData source, final String language) {
        return source.getAttachments().stream().map(attachment -> {
            if (isBlocked(attachment)) {
                // no need to build the asset
                return new Data()
                        .setNonNullAttribute(ID_ATTRIBUTE, attachment.getId())
                        .setNonNullAttribute(FORMATTED_VALUE_ATTRIBUTE, attachment.getId().toString());
            } else {
                // {image-provider-base-url} and {image-default-size} wil be replaced in response-filter
                String path = attachment.getPath();
                String filename = path.indexOf('/') > 1 ? StringUtils.substringAfterLast(path, "/") : path;
                String suffix = StringUtils.substringAfterLast(filename, ".");
                String pathTemplate = StringUtils.substringBeforeLast(path, "." + suffix) + "_{width}x{height}." + suffix;
                String linkTemplate = "{image-provider-base-url}/%s".formatted(pathTemplate);
                String thumbnailPath = pathTemplate
                        .replace("{width}", "{image-default-size}")
                        .replace("{height}", "{image-default-size}");
                String thumbnail = "{image-provider-base-url}/%s".formatted(thumbnailPath);
                String linkText = source.getId() + "_" + filename;
                return new Data()
                        .setNonNullAttribute(ID_ATTRIBUTE, attachment.getId())
                        .setNonNullAttribute("filename", filename)
                        .setNonNullAttribute("linkTemplate", linkTemplate)
                        .setNonNullAttribute("thumbnail", thumbnail)
                        .setNonNullAttribute(FORMATTED_VALUE_ATTRIBUTE, attachment.getId().toString())
                        .setNonNullAttribute(MARKUP_VALUE_ATTRIBUTE, Links.externalHTML("{image-provider-base-url}/" + thumbnailPath, linkText));
            }
        }).toArray(Data[]::new);
    }
}
