export enum SortOption {
  RELEVANCE = 'relevance',
  LAST_UPDATED = 'lastUpdate',
  IDENT_NUMBER = 'identNumber',
  TITLE_ASC = 'titleAsc',
  TITLE_DESC = 'titleDesc',
  DATE_ASC = 'dateAsc',
  DATE_DESC = 'dateDesc',
  TERM_ASC = 'termAsc',
  TERM_DESC = 'termDesc',
}

export const SORT_VALUES_MAP = {
  [SortOption.RELEVANCE]: '-_score,-attachments,-@lastSynced',
  [SortOption.LAST_UPDATED]: '-@lastSynced',
  [SortOption.IDENT_NUMBER]: '+identNumber',
  [SortOption.TITLE_ASC]: '+title',
  [SortOption.TITLE_DESC]: '-title',
  [SortOption.DATE_ASC]: '+dateRange,-@lastSynced',
  [SortOption.DATE_DESC]: '-dateRange,-@lastSynced',
  [SortOption.TERM_ASC]: '+technicalTerm,-@lastSynced',
  [SortOption.TERM_DESC]: '-technicalTerm,-@lastSynced',
};
