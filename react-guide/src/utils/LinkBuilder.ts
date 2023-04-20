// const config = ConfigLoader.CurrentConfig;

import {
  ConfigLoader,
  IConfiguration,
} from '@smb/smb-react-components-library';

const createSlug = (text?: string): string => {
  const slug = text
    ?.replace(/[ /.+]/g, '-')
    ?.replace(/['"()?!:]/g, '')
    ?.toLowerCase();
  return (slug && encodeURIComponent(slug)) || '';
};

const goTo = (link: string): void => {
  window.location.href = link;
};

export class LinkBuilder {
  private readonly config: IConfiguration;

  constructor() {
    this.config = ConfigLoader.CurrentConfig;
  }

  toTopics(id?: number, title?: string, hash?: string): void {
    let link = this.config.TOPICS_DOMAIN;
    if (id && title) {
      link = `${link}${hash}`;
    }
    if (id && title) {
      link = `${link}/collections/${id}/${createSlug(title)}`;
    }
    goTo(link);
  }

  toTopicsHashed(hash: string): void {
    const link = this.config.TOPICS_DOMAIN + hash;
    goTo(link);
  }

  getObjectUrl(id?: string): string {
    let link = this.config.RESEARCH_DOMAIN;
    if (id) {
      link = `${link}/detail/${id}`;
    }
    return link;
  }

  toGuide(id?: number, title?: string): void {
    let link = this.config.GUIDE_DOMAIN;
    if (id && title) {
      link = `${link}/tour/${id}/${createSlug(title)}`;
    }
    goTo(link);
  }

  getGuideHref(id?: number, title?: string): string {
    let link = this.config.GUIDE_DOMAIN;
    if (id && title) {
      link = `${link}/tour/${id}/${createSlug(title)}`;
    }
    return link;
  }

  createLinkToGuideStation(id: number, title: string, station: string): string {
    const link = this.config.GUIDE_DOMAIN;
    return `${link}/tour/${id}/${createSlug(title)}#${station}`;
  }

  toGuideStation(id?: number, title?: string, station?: string): void {
    let link = this.config.GUIDE_DOMAIN;
    if (id && title) {
      link = `${link}/tour/${id}/${createSlug(title)}#${station}`;
    }
    return goTo(link);
  }

  toResearch(): void {
    goTo(this.config.RESEARCH_DOMAIN);
  }
}
