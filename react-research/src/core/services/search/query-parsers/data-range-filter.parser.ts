import { IQueryParameterParser } from '../interfaces/parser.interface';
import { IDateRangeFilter } from '../interfaces/filters/data-range.interface';

export class DataRangeFilterQueryParameterParser implements IQueryParameterParser<IDateRangeFilter> {
    private readonly _emptyDataRangeValue: IDateRangeFilter = { datingFrom: '', datingTo: '' };

    public parse(value: string): IDateRangeFilter {
        try {
            return JSON.parse(value);
        } catch (error) {
            return this._emptyDataRangeValue;
        }
    }

    public stringify(value: IDateRangeFilter): string {
        return JSON.stringify(value);
    }
}
