import { ApolloError } from 'apollo-boost';
import { SmbAssortments } from '../../generated/graphql';
import AssortmentsRepository from './AssortmentsRepository';
import LanguageService from '../../utils/LanguageService';
import ImageUrlBuilder from '../../utils/ImageUrlBuilder';
import { ConfigLoader, IConfiguration } from 'src';

export interface AssortmentsContextData {
  id: string;
  title: string | undefined;
  subtitle: string | undefined | null;
  img: string;
  link: string;
}

class AssortmentsService {
  private readonly assortmentsRepository: AssortmentsRepository;
  private readonly config: IConfiguration;

  constructor() {
    this.assortmentsRepository = new AssortmentsRepository();
    this.config = ConfigLoader.CurrentConfig;
  }

  getAssortmentObjects(): {
    assortmentsLoading: boolean;
    error: ApolloError | undefined;
    rawData: Array<SmbAssortments> | null;
    assortmentsContextData: Array<AssortmentsContextData>;
  } {
    const { loading, error, data } =
      this.assortmentsRepository.fetchAssortmentObjects(
        LanguageService.getCurrentLanguage(),
      );
    const contextData =
      !loading && data
        ? this.convertToCards(data, this.config)
        : new Array<AssortmentsContextData>();
    const assortmentsLoading = loading;
    const assortmentsContextData = contextData;
    return { assortmentsLoading, error, rawData: data, assortmentsContextData };
  }

  private convertToCards(
    assortments: Array<SmbAssortments>,
    config: IConfiguration,
  ): Array<AssortmentsContextData> {
    const cards: Array<AssortmentsContextData> = [];
    for (const assortment of assortments) {
      cards.push(this.convertToCardData(assortment, config));
    }
    return cards;
  }

  private convertToCardData(
    assortment: SmbAssortments,
    config: IConfiguration,
  ): {
    id: string;
    title: string | undefined;
    subtitle: string | undefined | null;
    img: string;
    link: string;
  } {
    const buildImageUrl = (): string => {
      if (assortment.preview_image) {
        const dim = config.CAROUSEL_CONFIG.COLLECTION_CARD_IMAGE_SIZE;
        return new ImageUrlBuilder(config).buildUrl(
          assortment.preview_image,
          dim,
          dim,
        );
      }
      return '';
    };

    const buildTargetUri = (): string => {
      return `${this.config.RESEARCH_DOMAIN}/?assortments=${assortment.key}`;
    };

    return {
      id: assortment.key,
      title: assortment?.i18n[0]?.title || '',
      subtitle: assortment?.i18n[0]?.subtitle || '',
      img: buildImageUrl(),
      link: buildTargetUri(),
    };
  }
}
export default AssortmentsService;
