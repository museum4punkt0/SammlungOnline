import { createContext, useContext } from 'react';
import { UseFieldArrayMethods } from "react-hook-form";

export interface ISearchFormContext {
  onSearchFormChange: () => void;
  conditionsController: UseFieldArrayMethods<Record<string, any>, 'id'> | null;
}

const initialContextValue: ISearchFormContext = {
  onSearchFormChange: () => {
    throw new Error('should define onSearchFormChange');
  },
  conditionsController: null,
};

export const SearchFormContext = createContext<ISearchFormContext>(initialContextValue);

export const useCreateSearchFormChangeEvent = (): (() => void) => {
  return useContext(SearchFormContext).onSearchFormChange;
};

export const useFormConditionsController = (): UseFieldArrayMethods<Record<string, any>, 'id'> | null => {
  return useContext(SearchFormContext).conditionsController;
};
