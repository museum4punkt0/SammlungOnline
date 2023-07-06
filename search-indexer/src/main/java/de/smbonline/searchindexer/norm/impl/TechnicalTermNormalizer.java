package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.norm.AttributeMappingNormalizer;
import de.smbonline.searchindexer.norm.impl.shared.Links;

import static de.smbonline.searchindexer.conf.ConstKt.*;
import static de.smbonline.searchindexer.rest.Params.urlEncode;
import static de.smbonline.searchindexer.util.Misc.wrapQuotes;


public class TechnicalTermNormalizer extends AttributeMappingNormalizer<Data> {

    public TechnicalTermNormalizer() {
        super("ObjTechnicalTermClb", TECHNICAL_TERM_ATTRIBUTE, TechnicalTermNormalizer::convertToDTO);
    }

    private static Data convertToDTO(final String term) {

        String searchParams = TECHNICAL_TERM_ATTRIBUTE + ":" + wrapQuotes(urlEncode(term));
        String html = Links.internalHTML(searchParams, term);

        return new Data()
                .setNonNullAttribute(FORMATTED_VALUE_ATTRIBUTE, term)
                .setNonNullAttribute("search", Links.internal(searchParams))
                .setNonNullAttribute(MARKUP_VALUE_ATTRIBUTE, "<div>%s</div>".formatted(html));
    }
}
