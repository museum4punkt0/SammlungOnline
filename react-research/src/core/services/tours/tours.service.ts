import { ApolloError } from 'apollo-boost';

import LanguageService from '../LanguageService';

import { SmbTours, SmbToursObjects } from '../../../generated/graphql';
import ImageUrlBuilderService from '../image-url-builder/image-url-builder.service';
import { CollectionContextData } from '@bit/xai_mb.smb.collection/dist/View/Components/Collection/CollectionContext';

import ToursRepository from '../../repositories/tours/tours.repository';
import { TextContainerTextElement } from '@bit/xai_mb.smb.object/dist/PlattformLinks/TextContainer';
import { IConfiguration } from '../../interfaces/config.interface';

class ToursService {
    constructor(
        private readonly _config: IConfiguration,
        private readonly _toursRepository: ToursRepository,
        private readonly _imageUrlBuilder: ImageUrlBuilderService,
    ) {}

    getGuides(): {
        loadingGuides: boolean;
        errorGuides: ApolloError | undefined;
        rawDataGuides: SmbTours[] | null;
        contextDataGuides: Array<CollectionContextData>;
    } {
        const { loading, error, data } = this._toursRepository.fetchTours(LanguageService.getCurrentLanguage());
        let contextData: Array<CollectionContextData> = [];

        if (!loading && data) {
            contextData = this.convertGuidesToCollectionsContext(data);
        }

        return { loadingGuides: loading, errorGuides: error, rawDataGuides: data, contextDataGuides: contextData };
    }

    public findToursInfoByExhibitId(exhibitId: number) {
        const language = LanguageService.getCurrentLanguage();
        const { data, loading, error } = this._toursRepository.fetchToursByExhibitId(exhibitId, language);

        let _data: TextContainerTextElement[] = [];

        if (data) {
            _data = this.convertToursAside(data);
        }

        return { loading, error, data: _data };
    }

    public convertToursAside(tours: Array<SmbToursObjects>): TextContainerTextElement[] {
        return tours.map(({ tour }) => {
            return {
                caption: tour.tours_translations[0].title,
                href: `${this._config.GUIDE_DOMAIN}/tour/${tour.id}`,
            };
        });
    }

    private convertGuidesToCollectionsContext(tours: Array<SmbTours>): CollectionContextData[] {
        const collection: Array<CollectionContextData> = [];

        for (const tour of tours) {
            const collectionData = this.convertGuideToCollectionContext(tour);

            if (collectionData != null) {
                collection.push(collectionData);
            }
        }

        return collection;
    }

    private convertGuideToCollectionContext(tour: SmbTours): CollectionContextData | null {
        if (!tour.tours_translations.length) {
            return null;
        }

        const buildImageUrl = (imageId: string, imageSize: number): string => {
            return this._imageUrlBuilder.buildUrl(imageId, imageSize, imageSize).toString();
        };

        return {
            id: tour.id,
            title: tour.tours_translations[0].title,
            subtitle: tour.tours_translations[0].abstract ? tour.tours_translations[0].abstract : '',
            previewImageSlider: buildImageUrl(tour.preview_image, 200),
            previewImageCard: buildImageUrl(tour.preview_image, 580),
            previewImageMediaPlayer: tour.tours_translations[0].subtitle ? tour.tours_translations[0].subtitle : '',
            collectionObjects: tour.tours_objects ? new Array(tour.tours_objects.length) : [],
        };
    }
}

export default ToursService;
