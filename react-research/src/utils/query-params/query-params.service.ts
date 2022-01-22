class QueryParamsService {
  private readonly _params: URLSearchParams;

  constructor(url = '') {
    this._params = new URLSearchParams(url);
  }

  public set(name: string, value: number | string): void {
    this._params.set(name, value.toString());
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
}

export default QueryParamsService;
