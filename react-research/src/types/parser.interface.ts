export interface IQueryParameterParser<T> {
  parse: (value: string) => T;
  stringify: (value: T) => string;
}
