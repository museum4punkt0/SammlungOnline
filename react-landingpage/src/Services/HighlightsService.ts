import { ApolloError } from 'apollo-boost';
import { SmbObjects } from '../generated/graphql';
import HighlightsRepository from '../Repositories/HighlightsRepository';
import LanguageService from './LanguageService';
import ImageUrlBuilder from '../Util/ImageUrlBuilder';
import { ConfigLoader } from '../Util/ConfigLoader';
import { Config } from '../config';
import ValueExtractor from '../Util/ValueExtractor';

interface HighlightsContextData {
    img: string;
    caption: string;
    link: string;
}

class HighlightsService {
    private readonly highlightsRepository: HighlightsRepository;
    private readonly config: Config;

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
        const { loading, error, data } = this.highlightsRepository.fetchHighlightObjects(
            0,
            this.config.DATA_CONFIG.CAROUSEL_HIGHLIGHTS_COUNT,
            LanguageService.getCurrentLanguage(),
        );
        const contextData =
            !loading && data ? this.convertCarouselData(data, this.config) : new Array<HighlightsContextData>();

        return { loading, error, rawData: data, contextData };
    }

    private convertCarouselData(hightlights: Array<SmbObjects>, config: Config): Array<HighlightsContextData> {
        const collection: Array<HighlightsContextData> = [];

        for (const hightlight of hightlights) {
            collection.push(this.convertCollectionContext(hightlight, config));
        }

        return collection;
    }

    private convertCollectionContext(
        object: SmbObjects,
        config: Config,
    ): { id: number; caption: string; img: string; link: string } {
        const imageUrlBuilder = new ImageUrlBuilder();
        const valueExtractor = new ValueExtractor(object);
        const titleAtributeCandidates = [...this.config.DATA_CONFIG.DISPLAY_TITLE_ATTRIBUTE_CANDIDATES];

        const buildImageUrl = (imageId: string, imageSize: number): string => {
            return imageUrlBuilder.buildUrl(imageId, imageSize, imageSize).toString();
        };
        return {
            id: object.id,
            caption:
                valueExtractor.getFirstValueByKey(titleAtributeCandidates.shift()!, ...titleAtributeCandidates) || '',
            img:
                object.attachments?.length && object.attachments[0].attachment
                    ? buildImageUrl(object.attachments[0].attachment, config.DATA_CONFIG.CAROUSEL_IMAGE_SIZE)
                    : '',
            link: this.config.RESEARCH_DOMAIN + '/' + this.config.RESEARCH_DETAIL_PATH + '/' + object.id,
        };
    }
}
export default HighlightsService;
