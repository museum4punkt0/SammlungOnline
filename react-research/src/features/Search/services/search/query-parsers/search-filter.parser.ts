import { IQueryParameterParser } from '../interfaces/parser.interface';

export class SearchFilterQueryParameterParser implements IQueryParameterParser<string> {
  private readonly _emptyValue = '';

  public parse(value: string): string {
    return value ?? this._emptyValue;
  }

  public stringify(value: string): string {
    return value;
  }
}
