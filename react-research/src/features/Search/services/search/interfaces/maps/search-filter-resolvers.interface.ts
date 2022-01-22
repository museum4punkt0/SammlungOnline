import { ESearchConditionFields } from '../../enums/search-condition-fields.enum';

import { IResolver } from '../resolver.interface';
import { IDateRangeFilter } from '../filters/data-range.interface';

export interface ISearchFilterResolversMap {
  [ESearchConditionFields.dateRange]: IResolver<IDateRangeFilter>;
  [ESearchConditionFields.dating]: IResolver<string>;
  [ESearchConditionFields.geographicalReferences]: IResolver<string>;
  [ESearchConditionFields.involvedParties]: IResolver<string>;
  [ESearchConditionFields.materialAndTechnique]: IResolver<string>;
  [ESearchConditionFields.technicalTerm]: IResolver<string>;
  [ESearchConditionFields.identNumber]: IResolver<string>;
}
