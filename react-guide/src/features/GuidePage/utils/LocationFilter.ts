import { Location } from 'history';

class LocationFilter {
  location: Location;
  queryParams: Map<string, string>;
  pathParams: string[];

  constructor(location: Location) {
    this.location = location;
    this.queryParams = new Map<string, string>();
    this.pathParams = [];

    this._initQueryParams();
    this._initPathParams();
  }

  _initQueryParams(): void {
    let loc = this.location.search;
    if (this.location.search.match(/^\?/)) {
      loc = this.location.search.substr(1, this.location.search.length);
    }

    const parts = loc.split('&');
    parts.forEach((value) => {
      const keyValuePair = value.split('=');
      this.queryParams.set(keyValuePair[0], keyValuePair[1]);
    });
  }

  _initPathParams(): void {
    const params = this.location.pathname.split('/');
    if (params[0].length === 0) {
      params.splice(0, 1);
    }

    this.pathParams = params;
  }

  getPathParams(): string[] {
    return this.pathParams;
  }

  getPathParam(index: number): string {
    return this.pathParams[index];
  }

  getQueryParams(): Map<string, string> {
    return this.queryParams;
  }

  getQueryParam(param: string): string | undefined {
    return this.queryParams.get(param);
  }
}

export default LocationFilter;
