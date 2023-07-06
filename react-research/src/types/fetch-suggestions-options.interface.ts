import { ISearchFilter } from "./filter.interface";

export interface IFetchSuggestionsOptions {
  value: string;
  attributeField?: string;
  limit?: number;
  language?: string;
  qAdvanced?: ISearchFilter[];
}
