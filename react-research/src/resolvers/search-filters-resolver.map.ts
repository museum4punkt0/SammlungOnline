import { ESearchConditionFields } from '../enums/index';
import { ISearchFilterResolversMap } from '../types/index';
import { SearchFilterResolver } from './search-filter.resolver';
import { DataRangeFilterResolver } from './data-range-filter.resolver';

const dataRangeFilterResolver = new DataRangeFilterResolver();
const searchFilterResolver = new SearchFilterResolver();

export const searchFilterResolversMap: ISearchFilterResolversMap = {
  [ESearchConditionFields.titles]: searchFilterResolver,
  [ESearchConditionFields.dateRange]: dataRangeFilterResolver,
  [ESearchConditionFields.dating]: searchFilterResolver,
  [ESearchConditionFields.geographicalReferences]: searchFilterResolver,
  [ESearchConditionFields.geographicalReferencesID]: searchFilterResolver,
  [ESearchConditionFields.culturalReferences]: searchFilterResolver,
  [ESearchConditionFields.culturalReferencesID]: searchFilterResolver,
  [ESearchConditionFields.involvedParties]: searchFilterResolver,
  [ESearchConditionFields.involvedPartiesID]: searchFilterResolver,
  [ESearchConditionFields.materialAndTechnique]: searchFilterResolver,
  [ESearchConditionFields.exhibitions]: searchFilterResolver,
  [ESearchConditionFields.materialAndTechniqueID]: searchFilterResolver,
  [ESearchConditionFields.technicalTerm]: searchFilterResolver,
  [ESearchConditionFields.identNumber]: searchFilterResolver,
  [ESearchConditionFields.iconclasses]: searchFilterResolver,
  [ESearchConditionFields.iconography]: searchFilterResolver,
  [ESearchConditionFields.keywords]: searchFilterResolver,
};
