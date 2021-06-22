import { ApolloError } from 'apollo-boost';

import { IConfiguration } from '../../interfaces/config.interface';
import { SmbTopics, SmbTopicsObjects } from '../../../generated/graphql';
import { CollectionObject } from '@bit/xai_mb.smb.collection/';
import { TextContainerTextElement } from '@bit/xai_mb.smb.object/dist/PlattformLinks/TextContainer';

import TopicsRepository from '../../repositories/topics/topics.repository';

import LanguageService from '../LanguageService';
import ImageUrlBuilderService from '../image-url-builder/image-url-builder.service';

export interface TopicsCollectionContextData {
    id?: number;
    previewImageCard: any;
    title: string;
    subtitle: string;
    collectionObjects: CollectionObject[];
    interval?: number;
    selectedObjectIndex?: number;
}
class TopicsService {
    constructor(
        private readonly _config: IConfiguration,
        private readonly _topicsRepository: TopicsRepository,
        private readonly _imageUrlBuilder: ImageUrlBuilderService,
    ) {}

    public getTopics(): {
        loading: boolean;
        error: ApolloError | undefined;
        contextData: Array<TopicsCollectionContextData> | null;
    } {
        const { loading, error, data } = this._topicsRepository.fetchTopics(LanguageService.getCurrentLanguage());
        let contextData: Array<TopicsCollectionContextData> = [];

        if (!loading && data) {
            contextData = this._convertCollectionContext(data);
        }

        return { loading, error, contextData };
    }

    public findTopicsInfoByExhibitId(exhibitId: number) {
        const language = LanguageService.getCurrentLanguage();
        const { loading, error, data } = this._topicsRepository.fetchTopicsByExhibitId(exhibitId, language);

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
                href: `${this._config.TOPICS_DOMAIN}/collections/${topic.id}`,
            };
        });
    }

    private _convertCollectionContext(topics: SmbTopics[]): any {
        const imageSize = 580;

        return topics.map((topic) => {
            return {
                id: topic.id,
                title: topic.topics_translations[0].title,
                subtitle: topic.topics_translations[0].description ? topic.topics_translations[0].description : '',
                previewImageCard: this._imageUrlBuilder.buildUrl(topic.preview_image, imageSize, imageSize),
                collectionObjects: topic.objects,
            };
        });
    }
}
export default TopicsService;
