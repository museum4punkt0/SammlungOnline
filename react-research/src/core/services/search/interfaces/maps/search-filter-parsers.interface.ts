import { ESearchConditionFields } from '../../enums/search-condition-fields.enum';

import { IQueryParameterParser } from '../parser.interface';
import { IDateRangeFilter } from '../filters/data-range.interface';

export interface ISearchFilterParsersMapInterface {
    [ESearchConditionFields.dateRange]: IQueryParameterParser<IDateRangeFilter>;
    [ESearchConditionFields.dating]: IQueryParameterParser<string>;
    [ESearchConditionFields.geographicalReferences]: IQueryParameterParser<string>;
    [ESearchConditionFields.involvedParties]: IQueryParameterParser<string>;
    [ESearchConditionFields.materialAndTechnique]: IQueryParameterParser<string>;
    [ESearchConditionFields.technicalTerm]: IQueryParameterParser<string>;
    [ESearchConditionFields.identNumber]: IQueryParameterParser<string>;
}
