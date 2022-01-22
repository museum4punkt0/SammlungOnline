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

    private Params() {
        // no instances
    }
}
