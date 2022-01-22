import { ESearchConditionFields } from '../enums/search-condition-fields.enum';
import { ISearchFilterResolversMap } from '../interfaces/maps/search-filter-resolvers.interface';

import { SearchFilterResolver } from '../resolvers/search-filter.resolver';
import { DataRangeFilterResolver } from '../resolvers/data-range-filter.resolver';

const dataRangeFilterResolver = new DataRangeFilterResolver();
const searchFilterResolver = new SearchFilterResolver();

export const searchFilterResolversMap: ISearchFilterResolversMap = {
  [ESearchConditionFields.dateRange]: dataRangeFilterResolver,
  [ESearchConditionFields.dating]: searchFilterResolver,
  [ESearchConditionFields.geographicalReferences]: searchFilterResolver,
  [ESearchConditionFields.involvedParties]: searchFilterResolver,
  [ESearchConditionFields.materialAndTechnique]: searchFilterResolver,
  [ESearchConditionFields.technicalTerm]: searchFilterResolver,
  [ESearchConditionFields.identNumber]: searchFilterResolver,
};
