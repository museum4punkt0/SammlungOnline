import { ApolloError } from 'apollo-boost';
import { Config } from '../config';
import { SmbTopics, SmbTopicsObjects } from '../generated/graphql';
import TopicsRepository from '../Repositories/TopicsRepository';
import { ConfigLoader } from '../Util/ConfigLoader';
import ImageUrlBuilder from '../Util/ImageUrlBuilder';
import LanguageService from './LanguageService';
import ValueExtractor from '../Util/ValueExtractor';
// import { CollectionObject } from '@bit/xai_mb.smb.collection';


interface CollectionObject {
    objectId: string;
    imageId: string;
    title: string;
    displayTitle: string;
    imageUrlBuilder: ImageUrlBuilder;
}

export interface TopicsCollectionContextData {
    id: number;
    previewImageCard: string;
    title: string;
    subtitle: string;
    collectionObjects: CollectionObject[];
    interval?: number;
    selectedObjectIndex?: number;
    tintColor?: string;
    elementCount?: number;
}

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
        contextData: TopicsCollectionContextData[];
    } {
        const { loading, error, data } = this.topicsRepository.fetchTopics(LanguageService.getCurrentLanguage());
        let contextData: Array<TopicsCollectionContextData> = [];

        if (!loading && data) {
            contextData = this.convertCollectionContext(data, this.config);
        }

        return { loading, error, rawData: data, contextData };
    }

    private convertCollectionContext(topics: Array<SmbTopics>, config: Config): Array<TopicsCollectionContextData> {
        const imageUrlBuilder = new ImageUrlBuilder();

        const buildImageUrl = (imageId: string, imageSize: number): string => {
            return imageUrlBuilder.buildUrl(imageId, imageSize, imageSize).toString();
        };

        return topics.map((topic: SmbTopics) => {
            return {
                id: topic.id,
                title: topic.topics_translations[0].title,
                subtitle: topic.topics_translations[0].description ? topic.topics_translations[0].description : '',
                previewImageCard: buildImageUrl(topic.preview_image, config.DATA_CONFIG.COLLECTION_CARD_IMAGE_SIZE),
                collectionObjects: topic.objects ? this.convertObject(topic.objects) : [],
                // elementCount: 0,
            };
        });
    }

    // TODO: this is not really required. We only need the amount of objects, so it's enough to just use the ids and then count them
    private convertObject(objects: Array<SmbTopicsObjects>): Array<CollectionObject> {
        const collection: Array<CollectionObject> = [];
        const imageUrlBuilder = new ImageUrlBuilder();

        for (const object of objects) {
            const valueExtractor = new ValueExtractor(object.object);
            const title = valueExtractor.getValueByKey(this.config.DATA_CONFIG.DISPLAY_TITLE_ATTRIBUTE_CANDIDATES[0]);
            const technicaTerm = valueExtractor.getValueByKey(
                this.config.DATA_CONFIG.DISPLAY_TITLE_ATTRIBUTE_CANDIDATES[1],
            );
            const identNr = valueExtractor.getValueByKey(this.config.DATA_CONFIG.DISPLAY_TITLE_ATTRIBUTE_CANDIDATES[2]);

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
export default TopicsService;
