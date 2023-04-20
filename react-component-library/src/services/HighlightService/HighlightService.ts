import { ApolloError } from 'apollo-boost';
import { SmbObjects } from '../../generated/graphql';
import HighlightsRepository from './HighlightRepository';
import ImageUrlBuilder from '../../utils/ImageUrlBuilder';
import { LinkBuilder } from '../../utils/LinkBuilder';
import ValueExtractor from '../../utils/ValueExtractor';
import {
  ConfigLoader,
  EGraphqlTranslationAttributesFields,
  IConfiguration,
} from 'src';

interface HighlightsContextData {
  image: string;
  title: string;
  collection: string;
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
        'de',
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
    const cards: Array<HighlightsContextData> = [];
    for (const hightlight of hightlights) {
      cards.push(this.convertToCardData(hightlight, config));
    }
    return cards;
  }

  private convertToCardData(
    object: SmbObjects,
    config: IConfiguration,
  ): {
    id: number;
    title: string;
    collection: string;
    image: string;
    link: string;
  } {
    const valueExtractor = new ValueExtractor(object);
    const titleAtributeCandidates = [
      EGraphqlTranslationAttributesFields.title,
      EGraphqlTranslationAttributesFields.technicalTerm,
    ];

    const extractTitle = (): string => {
      return (
        valueExtractor.getFirstValueByKey(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          titleAtributeCandidates.shift()!,
          ...titleAtributeCandidates,
        ) || ''
      );
    };

    const extractCollection = (): string => {
      let collection =
        valueExtractor.getValueByKey(
          EGraphqlTranslationAttributesFields.collection,
        ) || '';
      if (collection.includes(',')) {
        collection = collection.split(',')[0];
      }
      return collection;
    };

    const buildImageUrl = (): string => {
      if (object.attachments[0]?.attachment) {
        const image = object.attachments[0].attachment;
        const dim = config.CAROUSEL_CONFIG.HIGHLIGHT_CAROUSEL_IMAGE_SIZE;
        return new ImageUrlBuilder(config).buildUrl(image, dim, dim);
      }
      return '';
    };
    const title = extractTitle();
    const buildTargetUri = (): string => {
      return new LinkBuilder().getDetailsLink(object.id, title, true);
    };

    return {
      id: object.id,
      title: title,
      collection: extractCollection(),
      image: buildImageUrl(),
      link: buildTargetUri(),
    };
  }
}
export default HighlightService;
