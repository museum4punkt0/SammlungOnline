import React, { ReactElement } from 'react';
import Filters from './Filters';

import './dropdown-filters.scss';

function DropdownFilters({
  data,
  onFilterSelect,
  onSortingSelect,
}: {
  data: any;
  onFilterSelect: (val: string) => void;
  onSortingSelect: (val: string) => void;
}): ReactElement {
  const { filters, sorting } = data;

  return (
    <>
      <div className="dropdown-filters" id="filters-section">
        <Filters
          filters={filters}
          onSelect={(val: string) => onFilterSelect(val)}
          defaultValue={filters.options[filters.default]}
        />

        <Filters
          filters={sorting}
          onSelect={(val: string) => onSortingSelect(val)}
          defaultValue={sorting.options[sorting.default]}
        />
      </div>
    </>
  );
}

export default DropdownFilters;
