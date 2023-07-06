import { ESearchConditionFields, ESearchOperators } from "../../enums/index";
import { ISearchAttributeOption } from "../../types/index";

export const SearchAttributeConditionFilterOperators: ISearchAttributeOption<
  ESearchOperators
>[] = [
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

export const SearchAttributeConditionFilterFields: ISearchAttributeOption<
  ESearchConditionFields
>[] = [
  {
    label: 'searchForm.filters.attributes.title',
    value: ESearchConditionFields.titles,
  },
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
  {
    label: 'searchForm.filters.attributes.culturalReferences',
    value: ESearchConditionFields.culturalReferences,
  },
  {
    label: 'searchForm.filters.attributes.exhibitions',
    value: ESearchConditionFields.exhibitions,
  },
  {
    label: 'searchForm.filters.attributes.iconclasses',
    value: ESearchConditionFields.iconclasses,
  },
  {
    label: 'searchForm.filters.attributes.iconography',
    value: ESearchConditionFields.iconography,
  },
  {
    label: 'searchForm.filters.attributes.keywords',
    value: ESearchConditionFields.keywords,
  },
];
