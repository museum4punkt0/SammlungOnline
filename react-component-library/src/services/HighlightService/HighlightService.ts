import { ApolloError } from 'apollo-boost';
import { SmbObjects } from '../../generated/graphql';
import HighlightsRepository from './HighlightRepository';
import LanguageService from '../../utils/LanguageService';
import ImageUrlBuilder from '../../utils/ImageUrlBuilder';
import ValueExtractor from '../../utils/ValueExtractor';
import { ConfigLoader, EGraphqlTranslationAttributesFields, IConfiguration } from 'src';

interface HighlightsContextData {
  img: string;
  caption: string;
  link: string;
}

class HighlightService {
  private readonly highlightsRepository: HighlightsRepository;
  private readonly config: IConfiguration;

  constructor() {
    this.highlightsRepository = new HighlightsRepository();
    this.config = ConfigLoader.CurrentConfig;
  }

  getHighlightsObjects(): {
    loading: boolean;
    error: ApolloError | undefined;
    rawData: Array<SmbObjects> | null;
    contextData: Array<HighlightsContextData>;
  } {
    const { loading, error, data } =
      this.highlightsRepository.fetchHighlightObjects(
        0,
        this.config.CAROUSEL_CONFIG.CAROUSEL_HIGHLIGHTS_COUNT,
        LanguageService.getCurrentLanguage(),
      );
    const contextData =
      !loading && data
        ? this.convertCarouselData(data, this.config)
        : new Array<HighlightsContextData>();

    return { loading, error, rawData: data, contextData };
  }

  private convertCarouselData(
    hightlights: Array<SmbObjects>,
    config: IConfiguration,
  ): Array<HighlightsContextData> {
    const collection: Array<HighlightsContextData> = [];

    for (const hightlight of hightlights) {
      collection.push(this.convertCollectionContext(hightlight, config));
    }

    return collection;
  }

  private convertCollectionContext(
    object: SmbObjects,
    config: IConfiguration,
  ): { id: number; caption: string; img: string; link: string } {
    const imageUrlBuilder = new ImageUrlBuilder(config);
    const valueExtractor = new ValueExtractor(object);
    const titleAtributeCandidates = [
      EGraphqlTranslationAttributesFields.title,
    ];

    const buildImageUrl = (imageId: string, imageSize: number): string => {
      return imageUrlBuilder.buildUrl(imageId, imageSize, imageSize).toString();
    };
    return {
      id: object.id,
      caption:
        valueExtractor.getFirstValueByKey(
          titleAtributeCandidates.shift()!,
          ...titleAtributeCandidates,
        ) || '',
      img:
        object.attachments?.length && object.attachments[0].attachment
          ? buildImageUrl(
            object.attachments[0].attachment,
            config.CAROUSEL_CONFIG.HIGHLIGHT_CAROUSEL_IMAGE_SIZE,
          )
          : '',
      link:
        this.config.RESEARCH_DOMAIN
        + '/detail/'
        + object.id,
    };
  }
}
export default HighlightService;
