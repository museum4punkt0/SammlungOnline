import { ESearchConditionFields } from '../enums/index';
import { IQueryParameterParser, IDateRangeFilter } from './index';

export interface ISearchFilterParsersMapInterface {
  [ESearchConditionFields.titles]: IQueryParameterParser<string>;
  [ESearchConditionFields.dateRange]: IQueryParameterParser<IDateRangeFilter>;
  [ESearchConditionFields.dating]: IQueryParameterParser<string>;
  [ESearchConditionFields.geographicalReferences]: IQueryParameterParser<string>;
  [ESearchConditionFields.geographicalReferencesID]: IQueryParameterParser<string>;
  [ESearchConditionFields.involvedParties]: IQueryParameterParser<string>;
  [ESearchConditionFields.involvedPartiesID]: IQueryParameterParser<string>;
  [ESearchConditionFields.materialAndTechnique]: IQueryParameterParser<string>;
  [ESearchConditionFields.exhibitions]: IQueryParameterParser<string>;
  [ESearchConditionFields.materialAndTechniqueID]: IQueryParameterParser<string>;
  [ESearchConditionFields.technicalTerm]: IQueryParameterParser<string>;
  [ESearchConditionFields.identNumber]: IQueryParameterParser<string>;
  [ESearchConditionFields.iconclasses]: IQueryParameterParser<string>;
  [ESearchConditionFields.iconography]: IQueryParameterParser<string>;
  [ESearchConditionFields.keywords]: IQueryParameterParser<string>;
}
