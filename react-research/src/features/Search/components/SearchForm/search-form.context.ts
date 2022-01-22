import { createContext, useContext } from 'react';

export interface ISearchFormContext {
  onSearchFormChange: () => void;
}

const initialContextValue: ISearchFormContext = {
  onSearchFormChange: () => {
    throw new Error('should define onSearchFormChange');
  },
};

export const SearchFormContext = createContext<ISearchFormContext>(initialContextValue);

export const useCreateSearchFormChangeEvent = (): (() => void) => {
  return useContext(SearchFormContext).onSearchFormChange;
};
