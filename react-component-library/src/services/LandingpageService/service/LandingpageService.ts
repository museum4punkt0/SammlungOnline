/* eslint no-console: ["error", { allow: ["log"] }] */
import LandingpageRepository from '../repository/LandingpageRepository';
import { IHeroSwiperProps } from '../../../features/HeroSwiper/HeroSwiper';
import {
  Maybe,
  ComponentConfigHeroSwiperItem,
  SmbLandingpageModuleDynamicZone,
  ComponentComponentsSmbSearchButtonBlock,
  ComponentComponentsSmbVideoBlock,
  ComponentComponentsSmbCollectionsBlock,
  ComponentComponentsSmbHighlightsBlock,
  ComponentComponentsSmbSection,
} from '../../../generated/graphql';
import { ConfigLoader } from '../../../hooks';
import { IConfiguration } from '../../../config';

import { TextModuleType, LanguageService } from 'src';

class LandingpageService {
  private config: IConfiguration;
  constructor() {
    this.config = ConfigLoader.CurrentConfig;
  }

  getHeroSwiperData() {
    const lang = LanguageService.getCurrentStrapiLanguage();
    const landingpageRepository = new LandingpageRepository();
    const { loading, error, data } =
      landingpageRepository.fetchLandingpageData(lang);
    let convertedData;
    if (!loading && data?.heroSwiperItems?.length) {
      convertedData = this.convertSwiperData(data.heroSwiperItems);
    }
    return { loading, error, data: convertedData };
  }

  getLandingpageSections() {
    const lang = LanguageService.getCurrentStrapiLanguage();
    const landingpageRepository = new LandingpageRepository();
    const { loading, error, data } =
      landingpageRepository.fetchLandingpageSections(lang);
    let convertedSectionsData;

    if (!loading && data && data?.length) {
      convertedSectionsData = this.convertSectionsData(data, lang);
    }

    return { loading, error, data: convertedSectionsData };
  }

  convertSwiperData(
    items: Maybe<Array<Maybe<ComponentConfigHeroSwiperItem>>>,
  ): IHeroSwiperProps {
    return <IHeroSwiperProps>{
      section: 'test',
      data: items?.map((item) => {
        return {
          title: item?.title,
          image:
            this.config.STRAPI_CONFIG.backend.smb +
            item?.image.data?.attributes?.url,
          caption: item?.caption,
          href: item?.href,
          id: item?.id,
        };
      }),
    };
  }

  convertSectionsData(
    items: Maybe<Array<Maybe<SmbLandingpageModuleDynamicZone>>>,
    lang: string,
  ): Array<any> | undefined {
    //module is passed as param
    return items
      ?.map((item: Maybe<SmbLandingpageModuleDynamicZone>) => {
        if (item?.__typename) {
          item = item as ComponentComponentsSmbSection;
          const {
            TextBlock,
            SearchButtonBlock,
            HighlightsBlock,
            CollectionsBlock,
            VideoBlock,
          } = item;
          const hasSwiperBlock =
            HighlightsBlock || CollectionsBlock ? true : false;

          const sections = [];

          const getBlockAssets = (
            block:
              | ComponentComponentsSmbSearchButtonBlock
              | ComponentComponentsSmbVideoBlock
              | ComponentComponentsSmbCollectionsBlock
              | ComponentComponentsSmbHighlightsBlock,
          ) => {
            if (lang === 'de-DGS' && block && block.assets?.data.length) {
              return block.assets?.data.map((asset: any) => {
                return {
                  url: `${this.config.STRAPI_CONFIG.backend.smb}${asset?.attributes?.url}`,
                };
              });
            }
            return [];
          };

          if (TextBlock) {
            sections.push({
              type: 'TextBlock', // so you can use it later for the component
              link: {
                caption: TextBlock.linkText,
                href: TextBlock.linkUrl,
              },
              title: TextBlock.headline,
              subtitle: TextBlock.subHeadline,
              text: TextBlock.text,

              // not needed or used props
              moduleBackgroundColor: '',
              textAreaColor: '',
              textColor: '',
              titleColor: '',
              moduleType: 4,
            });
          }

          if (SearchButtonBlock) {
            sections.push({
              type: 'SearchButtonBlock', // so you can use it later for the component
              title: SearchButtonBlock.headline,
              text: SearchButtonBlock.text,
              assets: getBlockAssets(SearchButtonBlock),
              searchButtonGroupHeadline: {
                '0': {
                  title: SearchButtonBlock.searchButtonGroupHeadline1,
                },
                '1': {
                  title: SearchButtonBlock.searchButtonGroupHeadline2,
                },
                '2': {
                  title: SearchButtonBlock.searchButtonGroupHeadline3,
                },
              },
            });
          }
          if (HighlightsBlock) {
            sections.push({
              type: 'HighlightsBlock', // so you can use it later for the component
              title: HighlightsBlock.headline,
              text: HighlightsBlock.text,
              slug: HighlightsBlock.type,
              assets: getBlockAssets(HighlightsBlock),
            });
          }
          if (CollectionsBlock) {
            sections.push({
              type: 'CollectionsBlock', // so you can use it later for the component
              title: CollectionsBlock.headline,
              text: CollectionsBlock.text,
              slug: CollectionsBlock.type,
              cta: CollectionsBlock.cardCtaText?.trim(),
              assets: getBlockAssets(CollectionsBlock),
            });
          }
          if (VideoBlock && lang === 'de-DGS') {
            const videoData = {
              type: 'VideoBlock', // so you can use it later for the component
              title: VideoBlock.headline,
              subtitle: VideoBlock.subHeadline,
              assets: getBlockAssets(VideoBlock),
              link: {
                caption: VideoBlock.linkText,
                href: VideoBlock.linkUrl,
              },
            };
            if (TextBlock) {
              sections.splice(0, 1, videoData as any);
            } else {
              sections.unshift(videoData);
            }
          }

          return {
            id: item.id,
            moduleType: item.Type ? TextModuleType[item.Type] : '',
            hasSwiperBlock: hasSwiperBlock,
            sections,
          };
        }
      })
      .filter((item) => item !== undefined);
  }
}

export default LandingpageService;
