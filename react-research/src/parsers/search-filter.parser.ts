import { IQueryParameterParser, ISuggestion } from "../types/index";

export class SearchFilterQueryParameterParser implements IQueryParameterParser<string> {
  private readonly _emptyValue = '';

  public parse(value: string | ISuggestion): string {
    if (typeof value === 'string') {
      return value ?? this._emptyValue;
    }
    return value?.value ?? this._emptyValue;
  }

  public stringify(value: string | ISuggestion): string {
    if (typeof value === 'string') {
      return value;
    }
    return value?.value ?? this._emptyValue;
  }
}
