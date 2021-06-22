import { ApolloError } from 'apollo-boost';
import { SmbAttachments, SmbTopics, SmbTopicsObjects } from '../generated/graphql';
import TopicsRepository from '../Repositories/TopicsRepository';
import LanguageService from './LanguageService';
import { CollectionContextData } from '../View/Components/Collection/CollectionContext';
import { CollectionObject } from '../View/Components/Collection';
import ImageUrlBuilder from '../Util/ImageUrlBuilder';
import { ConfigLoader } from '../Util/ConfigLoader';
import { Config } from '../config';
import ValueExtractor from '../Util/ValueExtractor';

class TopicsService {
    private topicsRepository: TopicsRepository;
    private readonly config: Config;

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
        const { loading, error, data } = this.topicsRepository.fetchTopics(LanguageService.getCurrentLanguage());
        let contextData: Array<CollectionContextData> = [];

        if (!loading && data) {
            contextData = this.convertCollectionsContext(data, this.config);
        }

        return { loading, error, rawData: data, contextData };
    }

    getTopic(
        id: number,
    ): {
        loading: boolean;
        error: ApolloError | undefined;
        rawData: SmbTopics | null;
        contextData: CollectionContextData | null;
    } {
        const { loading, error, data } = this.topicsRepository.fetchTopic(id, LanguageService.getCurrentLanguage());
        let contextData = null;

        if (!loading && data) {
            contextData = this.convertCollectionContext(data, this.config);
        }

        return { loading, error, rawData: data, contextData };
    }

    private convertCollectionsContext(topics: Array<SmbTopics>, config: Config): Array<CollectionContextData> {
        const collection: Array<CollectionContextData> = [];

        for (const topic of topics) {
            collection.push(this.convertCollectionContext(topic, config));
        }

        return collection;
    }

    private convertCollectionContext(topic: SmbTopics, config: Config): CollectionContextData {
        const imageUrlBuilder = new ImageUrlBuilder();

        const buildImageUrl = (imageId: string, imageSize: number): string => {
            return imageUrlBuilder.buildUrl(imageId, imageSize, imageSize);
        };

        return {
            id: topic.id,
            title: topic.topics_translations[0].title,
            subtitle: topic.topics_translations[0].description ? topic.topics_translations[0].description : '',
            previewImageSlider: buildImageUrl(topic.preview_image, config.DATA_CONFIG.TOPIC_SLIDER_IMAGE_SIZE),
            previewImageCard: buildImageUrl(topic.preview_image, config.DATA_CONFIG.COLLECTION_CARD_IMAGE_SIZE),
            previewImageMediaPlayer: buildImageUrl(
                topic.preview_image,
                config.DATA_CONFIG.MEDIA_PLAYER_PREVIEW_IMAGE_SIZE,
            ),
            collectionObjects: topic.objects ? this.convertObject(topic.objects) : [],
        };
    }

    private convertObject(objects: Array<SmbTopicsObjects>): Array<CollectionObject> {
        const collection: Array<CollectionObject> = [];
        const imageUrlBuilder = new ImageUrlBuilder();

        for (const object of objects) {
            const valueExtractor = new ValueExtractor(object.object);
            const title = valueExtractor.getValueByKey(this.config.DATA_CONFIG.OBJECT_ATTRIBUTE_KEY_TITLE);
            const technicaTerm = valueExtractor.getValueByKey(
                this.config.DATA_CONFIG.OBJECT_ATTRIBUTE_KEY_TECHNICAL_TERM,
            );
            const identNr = valueExtractor.getValueByKey(this.config.DATA_CONFIG.OBJECT_ATTRIBUTE_KEY_IDENT_NR);
            const primaryAttachment = TopicsService.getPrimary(object.object.attachments);

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

    private static getPrimary(attachments: Array<SmbAttachments>): SmbAttachments | null {
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
