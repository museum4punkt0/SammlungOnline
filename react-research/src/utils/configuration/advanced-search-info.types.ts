export interface ISearchOption {
  name: string;
  value: string;
}

export interface ISearchFilter<T = ISearchOption[]> {
  name: string;
  level?: string;
  value?: string;
  label?: string;
  optionsKey?: string;
  options?: T;
}

export interface ISearchFilterGroup<T = ISearchFilter[]> {
  name: string;
  filtersKey: string;
  label: string;
  sublevel?: Array<{
    title?: string;
    text?: string;
  }>;
  filters: T;
}
