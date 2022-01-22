import { ConfigLoader, IConfiguration } from '@smb/smb-react-components-library';

export class LinkBuilder {
  private config: IConfiguration;

  constructor() {
    this.config = ConfigLoader.CurrentConfig;
  }
  toTopics(id: number, title: string): void {
    const link = `${
      this.config.TOPICS_DOMAIN
    }/collections/${id}/${encodeURIComponent(title)}`;
    return goTo(link);
  }
  toTopicsHashed(hash: string): void {
    const link = this.config.TOPICS_DOMAIN + hash;
    goTo(link);
  }
  toGuide(id: number, title: string): void {
    const link = `${this.config.GUIDE_DOMAIN}/tour/${id}/${encodeURIComponent(
      title,
    )}`;
    return goTo(link);
  }
  toResearch(): void {
    const link = this.config.RESEARCH_DOMAIN;
    return goTo(link);
  }
}

function goTo(link: string): void {
  window.location.href = link;
}
