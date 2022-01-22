import { IConfiguration } from '@smb/smb-react-components-library';

export class LinkBuilder {
  constructor(private readonly _config: IConfiguration) {}

  getDetailsLink(id: number, title: string): string {
    const link = `/detail/${id}/${encodeURIComponent(title)}`;
    return link;
  }
  getTopicsLink(id: number, title: string): string {
    const link = `${this._config.TOPICS_DOMAIN}/collections/${id}/${encodeURIComponent(
      title,
    )}`;
    return link;
  }
  getGuideLink(id: number, title: string): string {
    const link = `${this._config.GUIDE_DOMAIN}/tour/${id}/${encodeURIComponent(title)}`;
    return link;
  }
  toTopics(id: number, title: string): void {
    const link = `${this._config.TOPICS_DOMAIN}/collections/${id}/${encodeURIComponent(
      title,
    )}`;
    return goTo(link);
  }
  toGuide(id: number, title: string): void {
    const link = `${this._config.GUIDE_DOMAIN}/tour/${id}/${encodeURIComponent(title)}`;
    return goTo(link);
  }
}

function goTo(link: string): void {
  window.location.href = link;
}
