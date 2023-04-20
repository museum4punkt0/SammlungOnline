import { IQueryParameterParser } from '../types/index';

export class SearchFilterQueryParameterParser implements IQueryParameterParser<string> {
  private readonly _emptyValue = '';

  public parse(value: string): string {
    return value ?? this._emptyValue;
  }

  public stringify(value: string): string {
    return value;
  }
}
