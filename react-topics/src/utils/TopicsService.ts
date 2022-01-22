import { ApolloError } from 'apollo-boost';
import {
  SmbAttachments,
  SmbTopics,
  SmbTopicsObjects,
} from '../generated/graphql';
import TopicsRepository from './TopicsRepository';
import LanguageService from './LanguageService';
import { CollectionContextData } from '../components/Collection';
import { CollectionObject } from '../components/Collection';
import ImageUrlBuilder from './ImageUrlBuilder';
import ValueExtractor from './ValueExtractor';
import { ConfigLoader, EGraphqlTranslationAttributesFields, IConfiguration } from '@smb/smb-react-components-library';

class TopicsService {
  private topicsRepository: TopicsRepository;
  private readonly config: IConfiguration;

  constructor() {
    this.topicsRepository = new TopicsRepository();
    this.config = ConfigLoader.CurrentConfig;
  }

  getTopics(): {
    loading: boolean;
    error: ApolloError | undefined;
    rawData: Array<SmbTopics> | null;
    contextData: Array<CollectionContextData>;
  } {
    const { loading, error, data } = this.topicsRepository.fetchTopics(
      LanguageService.getCurrentLanguage(),
    );
    let contextData: Array<CollectionContextData> = [];

    if (!loading && data) {
      contextData = this.convertCollectionsContext(data, this.config);
    }

    return { loading, error, rawData: data, contextData };
  }

  getTopic(id: number): {
    loading: boolean;
    error: ApolloError | undefined;
    rawData: SmbTopics | null;
    contextData: CollectionContextData | null;
  } {
    const { loading, error, data } = this.topicsRepository.fetchTopic(
      id,
      LanguageService.getCurrentLanguage(),
    );
    let contextData = null;

    if (!loading && data) {
      contextData = this.convertCollectionContext(data, this.config);
    }

    return { loading, error, rawData: data, contextData };
  }

  private convertCollectionsContext(
    topics: Array<SmbTopics>,
    config: IConfiguration,
  ): Array<CollectionContextData> {
    const collection: Array<CollectionContextData> = [];

    for (const topic of topics) {
      collection.push(this.convertCollectionContext(topic, config));
    }

    return collection;
  }

  private convertCollectionContext(
    topic: SmbTopics,
    config: IConfiguration,
  ): CollectionContextData {
    const imageUrlBuilder = new ImageUrlBuilder();

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
        config.CAROUSEL_CONFIG.SLIDER_IMAGE_SIZE,
      ),
      previewImageCard: buildImageUrl(
        topic.preview_image,
        config.CAROUSEL_CONFIG.COLLECTION_CARD_IMAGE_SIZE,
      ),
      previewImageMediaPlayer: buildImageUrl(
        topic.preview_image,
        config.CAROUSEL_CONFIG.MEDIA_PLAYER_PREVIEW_IMAGE_SIZE,
      ),
      collectionObjects: topic.objects ? this.convertObject(topic.objects) : [],
    };
  }

  private convertObject(
    objects: Array<SmbTopicsObjects>,
  ): Array<CollectionObject> {
    const collection: Array<CollectionObject> = [];
    const imageUrlBuilder = new ImageUrlBuilder();

    for (const object of objects) {
      const valueExtractor = new ValueExtractor(object.object);
      const title = valueExtractor.getValueByKey(
        EGraphqlTranslationAttributesFields.title
      );
      const technicaTerm = valueExtractor.getValueByKey(
        EGraphqlTranslationAttributesFields.technicalTerm
      );
      const identNr = valueExtractor.getValueByKey(
        EGraphqlTranslationAttributesFields.identNumber
      );
      const primaryAttachment = TopicsService.getPrimary(
        object.object.attachments,
      );

      collection.push({
        objectId: object.object.id,
        title: title ? title : '',
        displayTitle: title || technicaTerm || identNr || '[Ohne Titel]',
        imageId: primaryAttachment ? primaryAttachment?.attachment : '',
        imageUrlBuilder: imageUrlBuilder,
      });
    }

    return collection;
  }

  private static getPrimary(
    attachments: Array<SmbAttachments>,
  ): SmbAttachments | null {
    if (!attachments) {
      return null;
    }

    for (const attachment of attachments) {
      if (attachment.primary) {
        return attachment;
      }
    }
    return null;
  }
}

export default TopicsService;
