import { ApolloError } from 'apollo-boost';

// import { SmbAttachments, SmbTopics, SmbTopicsObjects } from '../generated/graphql';

// repository
import GuideRepository from '../Repositories/GuideRepository';

// other services
import LanguageService from './LanguageService';


import { SmbTours } from '../generated/graphql';
import { IImageUrlBuilder } from './Interfaces/ImageUrlBuilder';
import { ITourData } from './Interfaces/IGuideData';
import { ICollectionContextData } from './Interfaces/IGuideCollectionContextData';

//todo use component linrary version

class GuideService {
    private guideRepository: GuideRepository;
    private ImageUrlBuilder: IImageUrlBuilder;
    // private readonly config: Config;

    constructor(imageUrlBuilder: IImageUrlBuilder) {
        this.ImageUrlBuilder = imageUrlBuilder;
        this.guideRepository = new GuideRepository();
        // this.config = ConfigLoader.CurrentConfig;
    }

    // getGuides(
    //     setIsLoading: (value: boolean) => void,
    //     setData: (value: guideOverview[] | undefined) => void,
    //     setguideCollectionData: (value: CollectionContextData[] | undefined) => void,
    //     setError: (value: undefined) => void
    // ) {
    //     this.guideRepository.fetchGuides(LanguageService.getCurrentLanguage(), setIsLoading, setData, setguideCollectionData, setError);
    // }

    // getGuide(
    //     id: number,
    //     setIsLoading: (value: boolean) => void,
    //     setData: (value: ITourData | undefined) => void,
    //     setError: (value: undefined) => void
    // ) {
    //     this.guideRepository.fetchGuide(id, setIsLoading, setData, setError)
    // }
    
    // getGuide(id: number): {
    //     tourLoading: boolean;
    //     tourError: ApolloError | undefined;
    //     tourData: TourData | null;
    //     // contextData: Array<CollectionContextData>;
    // } {
    //     const { loading, error, data } = this.guideRepository.fetchGuide(id, LanguageService.getCurrentLanguage());
    //     let tourData: TourData = {
    //         id: 0,
    //         number: 0,
    //         title: "",
    //         subtitle: "",
    //         abstract: "",
    //         description: "",
    //         image: "",
    //         location: "",
    //         duration: 0,
    //         objectsCount: 0,
    //         stations: []};
        
    //     if (!loading && data) {
    //         tourData = this.convertGuideToTourData(data, this.config);
    //     }
        
    //     return { tourLoading: loading, tourError: error, tourData: tourData};
    // }
    
    // private convertGuideToTourData(tour: SmbTours, config: Config): TourData {

    
    //     // const stationData: StationData[] = [];
    //     // tour.tours_objects.forEach((obj) => {
    //     //     if(!stationData[obj.sequence]){
    //     //         stationData[obj.sequence] =      
    //     //     } 
    //     //     stationData[obj.sequence].objects.
    //     // });
        
        
    //     return {
    //         id: tour.id,
    //         number: tour.number,
    //         title: tour.tours_translations[0].title,
    //         subtitle: tour.tours_translations[0].subtitle,
    //         abstract: tour.tours_translations[0].abstract,
    //         description: tour.tours_translations[0].description,
    //         image: tour.preview_image,
    //         location: "",
    //         duration: 0,
    //         objectsCount: tour.tours_objects.length,
    //         stations: []
    //     };
    // }

    getGuides(imageCardSize: number, ImageSliderSize: number): {
        loading: boolean;
        error: ApolloError | undefined;
        rawData: SmbTours[] | null;
        contextData: Array<ICollectionContextData>;
    } {
        const { loading, error, data } = this.guideRepository.fetchGuides(LanguageService.getCurrentLanguage());
        let contextData: Array<ICollectionContextData> = [];

        if (!loading && data) {
            contextData = this.convertGuidesToCollectionsContext(data, imageCardSize, ImageSliderSize);
        }

        return { loading, error, rawData: data, contextData };
    }

    private convertGuidesToCollectionsContext(tours: Array<SmbTours>, imageCardSize: number, ImageSliderSize: number): Array<ICollectionContextData> {
        const collection: Array<ICollectionContextData> = [];

        for (const tour of tours) {
            let collectionData = this.convertGuideToCollectionContext(tour, imageCardSize, ImageSliderSize)
            
            if(collectionData != null){
                collection.push(collectionData);    
            }
        }

        return collection;
    }

    private convertGuideToCollectionContext(tour: SmbTours, imageCardSize: number, ImageSliderSize: number): ICollectionContextData | null {
        const imageUrlBuilder = this.ImageUrlBuilder;

        if(tour.tours_translations.length === 0){
            return null;
        }
        
        const buildImageUrl = (imageId: string, imageSize: number): string => {
            return imageUrlBuilder.buildUrlLocal(imageId, imageSize, imageSize).toString();
        };

        return {
            id: tour.id,
            title: tour.tours_translations[0].title,
            subtitle: tour.tours_translations[0].abstract ? tour.tours_translations[0].abstract : '',
            previewImageSlider: buildImageUrl(tour.preview_image, ImageSliderSize),
            previewImageCard: buildImageUrl(tour.preview_image, imageCardSize),
            previewImageMediaPlayer: tour.tours_translations[0].subtitle ? tour.tours_translations[0].subtitle : '',
            collectionObjects: tour.tours_objects ? new Array(tour.tours_objects.length) : [],
        };
    }
}

export default GuideService;
