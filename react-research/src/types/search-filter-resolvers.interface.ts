import { ESearchConditionFields } from '../enums/index';
import { IResolver, IDateRangeFilter } from './index';

export interface ISearchFilterResolversMap {
  [ESearchConditionFields.titles]: IResolver<string>;
  [ESearchConditionFields.dateRange]: IResolver<IDateRangeFilter>;
  [ESearchConditionFields.dating]: IResolver<string>;
  [ESearchConditionFields.geographicalReferences]: IResolver<string>;
  [ESearchConditionFields.geographicalReferencesID]: IResolver<string>;
  [ESearchConditionFields.involvedParties]: IResolver<string>;
  [ESearchConditionFields.involvedPartiesID]: IResolver<string>;
  [ESearchConditionFields.materialAndTechnique]: IResolver<string>;
  [ESearchConditionFields.materialAndTechniqueID]: IResolver<string>;
  [ESearchConditionFields.technicalTerm]: IResolver<string>;
  [ESearchConditionFields.exhibitions]: IResolver<string>;
  [ESearchConditionFields.identNumber]: IResolver<string>;
  [ESearchConditionFields.iconclasses]: IResolver<string>;
  [ESearchConditionFields.iconography]: IResolver<string>;
  [ESearchConditionFields.keywords]: IResolver<string>;
}
