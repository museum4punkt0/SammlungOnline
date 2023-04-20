package de.smbonline.searchindexer.rest;

public final class Params {

    /**
     * http parameter indicating whether indexing complete object
     */
    public static final String FORCED_UPDATE_PARAMETER = "force";

    /**
     * http parameter indicating the language
     */
    public static final String LANGUAGE_PARAMETER = "lang";

    /**
     * http parameter to specify the id of the first object for a range of objects
     */
    public static final String STARTID_PARAMETER = "startId";

    /**
     * http parameter to specify the id of the last object for a range of objects
     */
    public static final String ENDID_PARAMETER = "endId";

    /**
     * http parameter for paginated requests
     */
    public static final String OFFSET_PARAMETER = "offset";

    /**
     * http parameter for paginated requests
     */
    public static final String LIMIT_PARAMETER = "limit";

    /**
     * search query parameter
     */
    public static final String SEARCHQUERY_PARAMETER = "q";

    /**
     * http parameter for query results sorting
     */
    public static final String SORT_PARAMETER = "sort";
    /**
     * http parameter for response format
     */
    public static final String PROJECTION_PARAMETER = "projection";

    /**
     * http parameter for response format
     */
    public static final String FORMAT_PARAMETER = "format";

    private Params() {
        // no instances
    }
}
