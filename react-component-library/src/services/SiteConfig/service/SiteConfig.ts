/* eslint-disable @typescript-eslint/no-unused-vars */
import SiteConfigRepository from '../repository/SiteConfig';
import { ApolloError } from 'apollo-boost';

import {
  Maybe,
  SmbSiteConfig,
  ComponentComponentsSmbHeaderMenuItems,
  ComponentComponentsLegalPages,
  SmbGuidepageEntity,
  ComponentComponentsSmbVideoBlock,
  SmbSiteConfigEntity,
} from '../../../generated/graphql';
import { IConfiguration } from '../../../config';
import { ConfigLoader } from '../../../hooks';
import { LanguageService } from 'src';
import HeaderPlatformColors from '../../../utils/HeaderPlatformColors';
import {
  getLanguageIndex,
  getLanguageMap,
  getLegalPagesMap,
  getLanguageIcon,
  getLanguageValue,
} from '../../../utils/language-helper';

class SiteConfigService {
  private config: IConfiguration;
  private lang: string;
  private currentLang: string;
  constructor() {
    // this.lang = LanguageService.getCurrentStrapiLanguage();
    this.lang = LanguageService.getCurrentStrapiLanguage();
    this.currentLang = LanguageService.getCurrentLanguage();
    this.config = ConfigLoader.CurrentConfig;
  }

  private getApiData = (lang?: string) => {
    const apiLang = lang ? lang : this.lang;
    const siteConfigRepository = new SiteConfigRepository();
    return siteConfigRepository.fetchSiteConfig(apiLang);
  };

  getGuidePage(): {
    loading: boolean;
    error: ApolloError | undefined;
    contextData: Maybe<SmbGuidepageEntity>;
  } {
    this.lang = LanguageService.getCurrentStrapiLanguage();
    const siteConfigRepository = new SiteConfigRepository();
    const { loading, error, data } = siteConfigRepository.fetchGuidePage(
      this.lang,
    );
    let contextData: Maybe<SmbGuidepageEntity> = null;

    if (!loading && data) {
      contextData = data;
    }

    return { loading, error, contextData };
  }

  getTopicPage(): {
    loading: boolean;
    error: ApolloError | undefined;
    contextData: Maybe<any[]> | undefined;
  } {
    this.lang = LanguageService.getCurrentStrapiLanguage();
    const siteConfigRepository = new SiteConfigRepository();
    const { loading, error, data } = siteConfigRepository.fetchTopicPage(
      this.lang,
    );

    let contextData: Maybe<any[]> | undefined = null;

    if (!loading && data) {
      contextData = [
        {
          title: data?.attributes?.heroFallbackHeader,
          text: data?.attributes?.heroFallbackText,
          image:
            this.config.STRAPI_CONFIG.backend.smb +
            data.attributes?.heroFallbackAsset?.data?.attributes?.url,
          actionText: '',
          actionHref: '',
          caption: null,
          target: '',
          href: '#',
        },
      ];
    }

    return { loading, error, contextData };
  }

  getSiteConfigData() {
    const { loading, data } = this.getApiData();
    let headerData, footerData, localizations;

    if (!loading && data) {
      headerData = this.convertHeaderData(data?.headerMenuItems as any);

      localizations = this.convertLocalizationsData(
        data?.localizations?.data as any,
        data?.legalPages as any,
        this.lang,
        this.currentLang,
      );
      footerData = this.convertFooterData(data, this.lang);
    }
    return {
      loading,
      data: { headerData, footerData, localizations },
    };
  }

  getStaticPages() {
    const { loading, data, error } = this.getApiData();
    let staticPages;

    if (!loading && !error && data) {
      staticPages = this.convertStaticPagesData(data?.legalPages as any);
    }

    return {
      loading,
      data: staticPages,
      error,
    };
  }

  convertStaticPagesData(
    items: Maybe<Array<Maybe<ComponentComponentsLegalPages>>>,
  ): Array<any> | undefined {
    return items
      ?.map((item: Maybe<ComponentComponentsLegalPages>) => {
        if (item) {
          const { header, block, slug, footerLink, id, matomo } = item;
          return {
            id: id,
            title: header,
            name: footerLink,
            path: slug,
            matomo: matomo,
            block: block
              ? block.map((item) => {
                  return {
                    text: item?.text,
                    assets: item?.assets?.data,
                    videoAssets: item?.videoAssets?.data,
                    assetBaseUrl: this.config.STRAPI_CONFIG.backend.smb,
                  };
                })
              : [],
          };
        }
      })
      .filter((item) => item !== undefined);
  }

  private getStaticPagesRoutes(
    items: Maybe<Array<Maybe<ComponentComponentsLegalPages>>>,
  ): Array<any> | undefined {
    return items
      ?.map((item: Maybe<ComponentComponentsLegalPages>) => {
        if (item) {
          const { slug, footerLink, id } = item;
          return {
            id: id,
            name: footerLink,
            path: slug,
          };
        }
      })
      .filter((item) => item !== undefined);
  }

  convertHeaderData(
    items: Maybe<Array<Maybe<ComponentComponentsSmbHeaderMenuItems>>>,
  ): Array<any> | undefined {
    return items
      ?.map((item: Maybe<ComponentComponentsSmbHeaderMenuItems>) => {
        if (item) {
          const { headline, subHeadline, href, type, id } = item;
          return {
            id: id,
            title: headline,
            subTitle: subHeadline,
            color: HeaderPlatformColors[type].color,
            drawerColor: HeaderPlatformColors[type].drawerColor,
            href: href,
            type: type,
          };
        }
      })
      .filter((item) => item !== undefined);
  }

  convertLocalizationsData(
    items: Maybe<Array<Maybe<SmbSiteConfigEntity>>>,
    currentLegalPages: SmbSiteConfig,
    lang: string,
    currentLang: string,
  ): {
    main: any[];
    options: any[];
    availableLanguages: any[];
  } {
    const locales: {
      main: any[];
      options: any[];
      availableLanguages: any[];
    } = {
      main: [],
      options: [],
      availableLanguages: [],
    };
    let obj;

    items &&
      items.map((item: Maybe<SmbSiteConfigEntity>) => {
        if (item) {
          const { locale, legalPages } = item?.attributes as any;
          if (locale === 'de' || locale === 'en') {
            obj = this.getLanguageObjcet(
              locale,
              currentLegalPages,
              legalPages,
              true,
            );
            locales.main.push(obj);
          }
          obj = this.getLanguageObjcet(locale, currentLegalPages, legalPages);
          if (locale.includes(currentLang)) {
            locales.options.push(obj);
          }
          locales.availableLanguages.push(obj.value);
        }
      });

    if (lang === 'de' || lang === 'en') {
      obj = this.getLanguageObjcet(
        lang,
        currentLegalPages,
        currentLegalPages,
        true,
      );
      locales.main.push(obj);
    }

    obj = this.getLanguageObjcet(lang, currentLegalPages, currentLegalPages);
    locales.options.push(obj);
    locales.main.sort((a, b) => a.index - b.index);
    locales.options.sort((a, b) => a.index - b.index);

    return locales;
  }

  getLanguageObjcet(
    lang: string,
    currentLegalPages: any,
    localeLegalPages: any,
    main?: boolean,
  ) {
    const locale = lang.toLocaleLowerCase();
    if (main)
      return {
        value: lang,
        map: getLanguageMap(),
        legalPages: getLegalPagesMap(currentLegalPages, localeLegalPages),
        index: getLanguageIndex(locale),
      };
    else
      return {
        value: getLanguageValue(lang),
        icon: getLanguageIcon(locale),
        legalPages: getLegalPagesMap(currentLegalPages, localeLegalPages),
        index: getLanguageIndex(locale),
      };
  }

  convertFooterData(items: SmbSiteConfig, lang: string) {
    const section = [];
    const getBlockAssets = (block: ComponentComponentsSmbVideoBlock) => {
      if (lang === 'de-DGS' && block && block.assets?.data.length) {
        return block.assets?.data.map((asset: any) => {
          return {
            url: `${this.config.STRAPI_CONFIG.backend.smb}${asset?.attributes?.url}`,
          };
        });
      }
      return [];
    };

    const {
      headerMenuItems,
      contactTextBlock,
      contactVideoBlock,
      copyright,
      legalPages,
    } = items;

    if (contactTextBlock) {
      section.push({
        type: 'TextBlock', // so you can use it later for the component
        link: {
          caption: contactTextBlock.linkText,
          href: contactTextBlock.linkUrl,
        },
        title: contactTextBlock.headline,
        subtitle: contactTextBlock.subHeadline,
        text: contactTextBlock.text,
        moduleBackgroundColor: '',
        textAreaColor: '',
        textColor: '',
        titleColor: '',
        moduleType: 4,
      });
    }

    if (contactVideoBlock && lang === 'de-DGS') {
      const videoData = {
        type: 'VideoBlock', // so you can use it later for the component
        title: contactVideoBlock.headline,
        subtitle: contactVideoBlock.subHeadline,
        assets: getBlockAssets(contactVideoBlock),
        link: {
          caption: contactVideoBlock.linkText,
          href: contactVideoBlock.linkUrl,
        },
      };
      if (contactTextBlock) {
        section.splice(0, 1, videoData as any);
      } else {
        section.push(videoData);
      }
    }

    const menuItems =
      headerMenuItems &&
      headerMenuItems
        .map((item: Maybe<ComponentComponentsSmbHeaderMenuItems>) => {
          if (item) {
            const { headline, href } = item;
            return {
              text: headline,
              href: href,
            };
          }
        })
        .filter((item) => item !== undefined);

    const staticRoutes = legalPages
      ? this.getStaticPagesRoutes([...legalPages] as any)
      : [];

    return {
      links: menuItems,
      staticRoutes: staticRoutes,
      section: {
        id: '10',
        moduleType: 4,
        hasSwiperBlock: false,
        sections: section,
      },
      copyright: copyright,
    };
  }
}

export default SiteConfigService;
