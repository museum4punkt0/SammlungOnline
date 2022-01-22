import { ESearchConditionFields } from '../enums/search-condition-fields.enum';

import { ISearchFilterParsersMapInterface } from '../interfaces/maps/search-filter-parsers.interface';

import { DataRangeFilterQueryParameterParser } from '../query-parsers/data-range-filter.parser';
import { SearchFilterQueryParameterParser } from '../query-parsers/search-filter.parser';

const dataRangeFilterQueryParameterParser = new DataRangeFilterQueryParameterParser();
const searchFilterQueryParameterParser = new SearchFilterQueryParameterParser();

export const searchFilterParsersMap: ISearchFilterParsersMapInterface = {
  [ESearchConditionFields.dateRange]: dataRangeFilterQueryParameterParser,
  [ESearchConditionFields.dating]: searchFilterQueryParameterParser,
  [ESearchConditionFields.geographicalReferences]: searchFilterQueryParameterParser,
  [ESearchConditionFields.involvedParties]: searchFilterQueryParameterParser,
  [ESearchConditionFields.materialAndTechnique]: searchFilterQueryParameterParser,
  [ESearchConditionFields.technicalTerm]: searchFilterQueryParameterParser,
  [ESearchConditionFields.identNumber]: searchFilterQueryParameterParser,
};
