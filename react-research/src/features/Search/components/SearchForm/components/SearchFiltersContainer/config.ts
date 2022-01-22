import { ESearchConditionFields } from '../../../../services/search/enums/search-condition-fields.enum';
import { ESearchOperators } from '../../../../services/search/enums/search-operators.enum';

import { ISearchAttributeOption } from '../../interfaces/attribute-option.interface';

export const SearchAttributeConditionFilterOperators: ISearchAttributeOption<ESearchOperators>[] =
  [
    {
      label: 'searchForm.filters.operators.and',
      value: ESearchOperators.AND,
    },
    {
      label: 'searchForm.filters.operators.or',
      value: ESearchOperators.OR,
    },
    {
      label: 'searchForm.filters.operators.not',
      value: ESearchOperators.NOT,
    },
  ];

export const SearchAttributeConditionFilterFields: ISearchAttributeOption<ESearchConditionFields>[] =
  [
    {
      label: 'searchForm.filters.attributes.datingFromTo',
      value: ESearchConditionFields.dateRange,
    },
    {
      label: 'searchForm.filters.attributes.identNumber',
      value: ESearchConditionFields.identNumber,
    },
    {
      label: 'searchForm.filters.attributes.involvedParties',
      value: ESearchConditionFields.involvedParties,
    },
    {
      label: 'searchForm.filters.attributes.technicalTerm',
      value: ESearchConditionFields.technicalTerm,
    },
    {
      label: 'searchForm.filters.attributes.materialAndTechnique',
      value: ESearchConditionFields.materialAndTechnique,
    },
    {
      label: 'searchForm.filters.attributes.geographicalReferences',
      value: ESearchConditionFields.geographicalReferences,
    },
  ];
