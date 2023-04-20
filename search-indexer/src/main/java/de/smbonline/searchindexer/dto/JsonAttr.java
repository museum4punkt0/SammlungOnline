package de.smbonline.searchindexer.dto;

import de.smbonline.searchindexer.rest.Params;
import de.smbonline.searchindexer.conf.ConstKt;
import de.smbonline.searchindexer.rest.Responses;

public final class JsonAttr {
    public static final String ATTR_ADVANCED_SEARCHQUERY = "q_advanced";
    public static final String ATTR_COUNTER = "counter";
    public static final String ATTR_ERROR = Responses.RESPONSE_ERROR_ATTRIBUTE;
    public static final String ATTR_FIELD = "field";
    public static final String ATTR_FIELDS = "fields";
    public static final String ATTR_ID = ConstKt.ID_ATTRIBUTE;
    public static final String ATTR_IDS = "ids";
    public static final String ATTR_OPERATOR = "operator";
    public static final String ATTR_RESULTS = "objects";
    public static final String ATTR_SEARCHQUERY = Params.SEARCHQUERY_PARAMETER;
    public static final String ATTR_SORT = Params.SORT_PARAMETER;

    public static final String ATTR_STATUS = "status";
    public static final String ATTR_SUGGESTIONS = "suggestions";
    public static final String ATTR_VALUE = "value";

    // pagination
    public static final String ATTR_LIMIT = Params.LIMIT_PARAMETER;
    public static final String ATTR_OFFSET = Params.OFFSET_PARAMETER;
    public static final String ATTR_TOTAL = "total";

    private JsonAttr() {
        // no instances
    }
}
