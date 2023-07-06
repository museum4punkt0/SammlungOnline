/* eslint-disable no-console */
import { ConfigLoader, IConfiguration } from '@smb/smb-react-components-library';

const createSlug = (text?: string): string => {
  const slug = text
    ?.replace(/[ /.+]/g, '-')
    ?.replace(/['"()?!:,]/g, '')
    ?.toLowerCase();
  return slug ? encodeURIComponent(slug) : '';
};

const goTo = (link: string): void => {
  window.location.href = link;
};

export class LinkBuilder {
  constructor(private readonly _config: IConfiguration = ConfigLoader.CurrentConfig) {}

  getPermalinkHref(id: number, title?: string): string {
    return `https://id.smb.museum/object/${id}/${createSlug(title)}`;
  }

  getDetailsLink(id: number, title: string): string {
    return `/detail/${id}/${createSlug(title)}`; // Note: does not work with RESEARCH_DOMAIN here because it is used in history.push({pathname})
  }

  getTopicsLink(id: number, title: string): string {
    return `${this._config.TOPICS_DOMAIN}/collections/${id}/${createSlug(title)}`;
  }

  getGuideLink(id: number, title: string): string {
    return `${this._config.GUIDE_DOMAIN}/tour/${id}/${createSlug(title)}`;
  }

  toTopics(id: number, title: string): void {
    const link = `${this._config.TOPICS_DOMAIN}/collections/${id}/${createSlug(title)}`;
    return goTo(link);
  }

  toGuide(id: number, title: string): void {
    const link = `${this._config.GUIDE_DOMAIN}/tour/${id}/${createSlug(title)}`;
    return goTo(link);
  }

  getIconClassLink(id: string): string {
    return `${this._config.KEYWORDS_ICONCLASSES_LINK}${id}`;
  }

  getSearchConditionLink(key: string, value: string, queryParamsString?: string): string {
    if (!value) {
      console.error('undefined key/value specified', key, value);
      return '';
    }
    const queryParams = queryParamsString ? `?${queryParamsString}&` : '?';
    const link =
      value.includes(' ') && !value.startsWith('"')
        ? `${queryParams}conditions=AND%2B${key}%2B"${encodeURIComponent(value)}"`
        : `${queryParams}conditions=AND%2B${key}%2B${encodeURIComponent(value)}`;
    return `${this._config.RESEARCH_DOMAIN}${link}`;
  }
}
