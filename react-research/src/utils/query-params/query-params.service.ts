import { ESearchQueryParams } from '../../enums';

class QueryParamsService {
  private readonly _params: URLSearchParams;

  constructor(url = '') {
    this._params = new URLSearchParams(url);
  }

  public set(name: string, value: number | string): void {
    if (!value) return;
    this._params.set(name, value?.toString());
  }

  public get(name: string): string | null {
    return this._params.get(name);
  }

  public getAll(name: string): string[] {
    return this._params.getAll(name);
  }

  public append(name: string, value: string): void {
    this._params.append(name, value);
  }

  public getQueryString(): string {
    return this._params.toString();
  }

  public getSearchQueryParamsString(): string {
    const lang = `${ESearchQueryParams.language}=${this._params.get(
      ESearchQueryParams.language,
    )}`;
    const limit = `${ESearchQueryParams.limit}=${this._params.get(
      ESearchQueryParams.limit,
    )}`;
    const sort = `${ESearchQueryParams.sort}=${this._params.get(
      ESearchQueryParams.sort,
    )}`;
    const controls = `${ESearchQueryParams.controls}=${this._params.get(
      ESearchQueryParams.controls,
    )}`;
    return [lang, limit, sort, controls].join('&');
  }
}

export default QueryParamsService;
