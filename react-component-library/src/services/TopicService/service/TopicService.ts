import { ApolloError } from 'apollo-boost';
import { SmbTopics, SmbTopicsObjects } from '../../../generated/graphql';
import ImageUrlBuilder from '../../../utils/ImageUrlBuilder';
import LanguageService from '../../../utils/LanguageService';
import ValueExtractor from '../../../utils/ValueExtractor';
import { ConfigLoader, EGraphqlTranslationAttributesFields, IConfiguration, TextContainerTextElement, TopicRepository } from 'src';

export interface CollectionObject {
  objectId: string;
  imageId: string;
  title: string;
  displayTitle: string;
  imageUrlBuilder: any;
}

export interface TopicCollectionContextData {
  id: number;
  previewImageCard: string;
  title: string;
  subtitle: string;
  collectionObjects: CollectionObject[];
  interval?: number;
  selectedObjectIndex?: number;
  tintColor?: string;
  elementCount?: number;
  previewImageSlider?: string;
  previewImageMediaPlayer?: string;
}

class TopicService {
  private topicRepository: TopicRepository;
  private readonly config: IConfiguration;

  constructor() {
    this.topicRepository = new TopicRepository();
    this.config = ConfigLoader.CurrentConfig;

  }

  getTopics(): {
    loading: boolean;
    error: ApolloError | undefined;
    rawData: Array<SmbTopics> | null;
    contextData: TopicCollectionContextData[];
  } {
    const { loading, error, data } = this.topicRepository.fetchTopics(
      LanguageService.getCurrentLanguage(),
    );
    let contextData: Array<TopicCollectionContextData> = [];

    if (!loading && data) {
      contextData = this.convertCollectionsContext(data, this.config);
    }

    return { loading, error, rawData: data, contextData };
  }
  getTopic(id: number): {
    loading: boolean;
    error: ApolloError | undefined;
    rawData: SmbTopics | null;
    contextData: TopicCollectionContextData | null;
  } {
    const { loading, error, data } = this.topicRepository.fetchTopic(
      id,
      LanguageService.getCurrentLanguage(),
    );
    let contextData = null;

    if (!loading && data) {
      contextData = this.convertCollectionContext(data, this.config);
    }

    return { loading, error, rawData: data, contextData };
  }
  public findTopicsInfoByExhibitId(exhibitId: number) {
    const language = LanguageService.getCurrentLanguage();
    const { loading, error, data } = this.topicRepository.fetchTopicsByExhibitId(
      exhibitId,
      language,
    );

    let _data: TextContainerTextElement[] = [];

    if (data) {
      _data = this.convertTopicsAside(data);
    }

    return { loading, error, data: _data };
  }
  public convertTopicsAside(topics: Array<SmbTopicsObjects>): TextContainerTextElement[] {
    return topics.map(({ topic }) => {
      return {
        caption: topic.topics_translations[0].title,
        href: `${this.config.TOPICS_DOMAIN}/collections/${topic.id}`,
      };
    });
  }

  private convertCollectionsContext(
    topics: Array<SmbTopics>,
    config: IConfiguration,
  ): Array<TopicCollectionContextData> {
    const collection: Array<TopicCollectionContextData> = [];

    for (const topic of topics) {
      collection.push(this.convertCollectionContext(topic, config));
    }

    return collection;
  }

  private convertCollectionContext(
    topic: SmbTopics,
    _config: IConfiguration,
  ): TopicCollectionContextData {
    const imageUrlBuilder = new ImageUrlBuilder(_config);

    const buildImageUrl = (imageId: string, imageSize: number): string => {
      return imageUrlBuilder.buildUrl(imageId, imageSize, imageSize);
    };

    return {
      id: topic.id,
      title: topic.topics_translations[0].title,
      subtitle: topic.topics_translations[0].description
        ? topic.topics_translations[0].description
        : '',
      previewImageSlider: buildImageUrl(
        topic.preview_image,
        this.config.CAROUSEL_CONFIG.COLLECTION_CARD_IMAGE_SIZE,
        ),
      previewImageCard: buildImageUrl(
        topic.preview_image,
        this.config.CAROUSEL_CONFIG.COLLECTION_CARD_IMAGE_SIZE,
      ),
      previewImageMediaPlayer: buildImageUrl(
        topic.preview_image,
        this.config.CAROUSEL_CONFIG.MEDIA_PLAYER_PREVIEW_IMAGE_SIZE,
      ),
      collectionObjects: topic.objects ? this.convertObject(topic.objects) : [],
    };
  }
/*

  id: number;
  previewImageCard: string;
  title: string;
  subtitle: string;
  collectionObjects: CollectionObject[];
  interval?: number;
  selectedObjectIndex?: number;
  tintColor?: string;
  elementCount?: number;

*/
  // TODO: this is not really required. We only need the amount of objects, so it's enough to just use the ids and then count them
  private convertObject(
    objects: Array<SmbTopicsObjects>,
  ): Array<CollectionObject> {

    const collection: Array<CollectionObject> = [];
    const imageUrlBuilder = new ImageUrlBuilder('');

    for (const object of objects) {
      const valueExtractor = new ValueExtractor(object.object);
      const title = valueExtractor.getValueByKey(
        EGraphqlTranslationAttributesFields.title,
      );
      const technicaTerm = valueExtractor.getValueByKey(
        EGraphqlTranslationAttributesFields.technicalTerm,
      );
      const identNr = valueExtractor.getValueByKey(
        EGraphqlTranslationAttributesFields.identNumber,
      );

      collection.push({
        objectId: object.object.id,
        title: title || technicaTerm || identNr || '[Ohne Titel]',
        imageId: '',
        displayTitle: '',
        imageUrlBuilder: imageUrlBuilder,
      });
    }
    return collection;
  }
}
export default TopicService;
