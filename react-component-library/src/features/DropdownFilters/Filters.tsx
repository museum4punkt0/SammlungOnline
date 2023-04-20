/* eslint-disable no-console */
import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TextField, InputAdornment, Checkbox } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './filters.scss';

interface FiltersProps {
  onSelect: (value: string) => void;
  defaultValue: {
    title: string;
    value: string;
    id: string;
  };
  filters: {
    label: string;
    iconPosition: string;
    options: {
      title: string;
      value: string;
      id: string;
    }[];
  };
}

function Filters({
  filters,
  onSelect,
  defaultValue,
}: FiltersProps): ReactElement {
  const { t } = useTranslation();
  const [selectedValue, setSelectedValue] = useState(defaultValue.value);
  const [selectedLabel, setSelectedLabel] = useState(t(defaultValue.title));
  const [isOpen, setIsOpen] = React.useState(false);

  const selectedFilter = (e: any) => {
    e.preventDefault();
    const filterLabel = e.target.ariaLabel;
    const filterValue = e.target.value;

    setSelectedLabel(filterLabel);
    setSelectedValue(filterValue);
    onSelect(filterValue);
    setIsOpen(!isOpen);
  };

  const toggleFilterState = () => {
    setIsOpen(!isOpen);
  };

  const getArrowState = () => {
    return isOpen
      ? 'filters__arrow filters__arrow--open'
      : 'filters__arrow filters__arrow--close';
  };

  const renderOptionItem = (option: {
    title: string;
    value: string;
    id: string;
  }) => {
    return (
      <li className="filters__list-item" key={`filters-${option.id}`}>
        <label htmlFor={option.id}>
          {t(option.title)}
          <Checkbox
            id={option.id}
            checked={selectedValue === option.value}
            value={option.value}
            size="small"
            onChange={selectedFilter}
            inputProps={{
              'aria-label': t(option.title),
            }}
          />
        </label>
      </li>
    );
  };

  const renderOptions = () => {
    return (
      <ul className="filters__list">
        {filters.options.map((option) => {
          return renderOptionItem(option);
        })}
      </ul>
    );
  };

  const getIconPosition = (): 'end' | 'start' => {
    if (filters.iconPosition === 'end' && window.innerWidth >= 678)
      return 'end';
    return 'start';
  };

  return (
    <div className="filters">
      <div className="filters__dropdown">
        <TextField
          type="text"
          className="filters__input"
          id="standard-basic"
          label={t(filters.label)}
          defaultValue={selectedLabel}
          onClick={toggleFilterState}
          InputProps={{
            disableUnderline: true,
            readOnly: true,
            className: 'filters__input__inner',
            value: selectedLabel,
            startAdornment: (
              <InputAdornment
                position={getIconPosition()}
                className="filters__icon"
              >
                <ExpandMoreIcon
                  className={getArrowState()}
                  fontSize={'large'}
                />
              </InputAdornment>
            ),
          }}
        />
        {isOpen && filters.options.length > 0 && renderOptions()}
      </div>
    </div>
  );
}

export default Filters;
