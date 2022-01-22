import { TFunctionResult } from 'i18next';

export const generateGUID = () => new Date().getTime().toString(36);
export const isValueValid = (value: string | number | TFunctionResult | undefined) =>
  value || '';
