import { ESearchConditionFields } from '../enums/index';
import { ISearchFilterParsersMapInterface } from '../types/index';
import { DataRangeFilterQueryParameterParser } from './data-range-filter.parser';
import { SearchFilterQueryParameterParser } from './search-filter.parser';

const dataRangeFilterQueryParameterParser = new DataRangeFilterQueryParameterParser();
const searchFilterQueryParameterParser = new SearchFilterQueryParameterParser();

export const searchFilterParsersMap: ISearchFilterParsersMapInterface = {
  [ESearchConditionFields.titles]: searchFilterQueryParameterParser,
  [ESearchConditionFields.dateRange]: dataRangeFilterQueryParameterParser,
  [ESearchConditionFields.dating]: searchFilterQueryParameterParser,
  [ESearchConditionFields.geographicalReferences]: searchFilterQueryParameterParser,
  [ESearchConditionFields.geographicalReferencesID]: searchFilterQueryParameterParser,
  [ESearchConditionFields.involvedParties]: searchFilterQueryParameterParser,
  [ESearchConditionFields.involvedPartiesID]: searchFilterQueryParameterParser,
  [ESearchConditionFields.materialAndTechnique]: searchFilterQueryParameterParser,
  [ESearchConditionFields.exhibitions]: searchFilterQueryParameterParser,
  [ESearchConditionFields.materialAndTechniqueID]: searchFilterQueryParameterParser,
  [ESearchConditionFields.technicalTerm]: searchFilterQueryParameterParser,
  [ESearchConditionFields.identNumber]: searchFilterQueryParameterParser,
  [ESearchConditionFields.iconclasses]: searchFilterQueryParameterParser,
  [ESearchConditionFields.iconography]: searchFilterQueryParameterParser,
  [ESearchConditionFields.keywords]: searchFilterQueryParameterParser,
};
