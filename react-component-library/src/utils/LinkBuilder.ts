import { ConfigLoader } from '../hooks/useConfigLoader.hook';
import { IConfiguration } from '../config/configuration';

const createSlug = (text?: string): string => {
  const slug = text
    ?.replace(/[ /.+]/g, '-')
    ?.replace(/['"()?!:]/g, '')
    ?.toLowerCase();
  return slug ? encodeURIComponent(slug) : '';
};

const goTo = (link: string): void => {
  window.location.href = link;
};

export class LinkBuilder {
  private config: IConfiguration;

  constructor() {
    this.config = ConfigLoader.CurrentConfig;
  }

  getPermalinkHref(id: number, title?: string): string {
    return `https://id.smb.museum/object/${id}/${createSlug(title)}`;
  }

  getShareButtonHref(id: number): string {
    return `https://id.smb.museum/object/${id}`;
  }

  getDetailsLink(id: number, title?: string, fullUrl = false): string {
    const link = `/detail/${id}/${createSlug(title)}`;
    return fullUrl ? `${this.config.RESEARCH_DOMAIN}${link}` : link;
  }

  // TODO wrong link
  toTopics(id: number, platform?: string): void {
    const link = `${this.config.TOPICS_DOMAIN}/collections/${platform}/${id}`;
    goTo(link);
  }

  getTopicsHref(id: number, platform?: string, currentLocale?: string): string {
    const link = `${this.config.TOPICS_DOMAIN}${currentLocale}/category/${platform}/${id}`;
    return link;
  }

  toTopicsHashed(hash: string): void {
    const link = this.config.TOPICS_DOMAIN + hash;
    goTo(link);
  }

  toGuide(id: number, title: string): void {
    goTo(this.getGuideHref(id, title));
  }

  getGuideHref(id: number, title: string): string {
    const link = `${this.config.GUIDE_DOMAIN}/tour/${id}/${createSlug(title)}`;
    return link;
  }

  toResearch(): void {
    goTo(this.config.RESEARCH_DOMAIN);
  }

  goToLink(link: string): void {
    goTo(link);
  }

  getDownloadHref(id: number, format = 'csv'): string {
    const link = `${this.config.ELASTIC_API_URL}/${id}/export?format=${format}`;
    return link;
  }
}
