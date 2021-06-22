import { ApolloError } from 'apollo-boost';

// repository
import GuideRepository from '../Repositories/GuideRepository';

// other services
import LanguageService from './LanguageService';

// todo remove and move interface to services
import { CollectionContextData } from '../View/Components/Collection/CollectionContext';

// util
import { ConfigLoader } from '../Util/ConfigLoader';

import { Config } from '../config';
import { Direction, slimTourData, StationData, TourData, TourObjectData } from './Interfaces/GuideData';
import { SmbTours } from '../generated/graphql';
import ImageUrlBuilder from '../Util/ImageUrlBuilder';
import { GuideAtrKeys } from '../Repositories/Util/GuideAttributes';


class GuideService {
    private guideRepository: GuideRepository;
    private readonly config: Config;

    // from Attachment Service
    private readonly _imageUrlBuilder: ImageUrlBuilder;
    
    constructor() {
        this.guideRepository = new GuideRepository();
        this.config = ConfigLoader.CurrentConfig;
        this._imageUrlBuilder = new ImageUrlBuilder();
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
    //     setData: (value: TourData | undefined) => void,
    //     setError: (value: undefined) => void
    // ) {
    //     this.guideRepository.fetchGuide(id, LanguageService.getCurrentLanguage(), setIsLoading, setData, setError)
    // }
    
    getGuide(id: number): {
        tourLoading: boolean;
        tourError: ApolloError | undefined;
        tourData: TourData | null;
    } {
        const { loading, error, data } = this.guideRepository.fetchGuide(id, LanguageService.getCurrentLanguage());
        let tourData: TourData = {
            id: 0,
            number: 0,
            title: "",
            subtitle: "",
            abstract: "",
            description: "",
            image: "",
            location: "",
            duration: "",
            objectsCount: 0,
            stations: []
        };
        
        
        if (!loading && data) {
            tourData = this.convertGuideToTourData(data, this.config);
        }
        
        return { tourLoading: loading, tourError: error, tourData: tourData};
    }
    
    private convertGuideToTourData(tour: SmbTours, config: Config): TourData {
        
        let dirCount = 0;
        const dir : string[] = tour?.directions.split("\n");
        const loc = dir[dirCount++];
        const dur = dir[dirCount++];
        
        
        const stations: StationData[] = [];
        
        const slim: slimTourData = {id: tour.id, title: tour.tours_translations[0].title}
        
        const buildImageUrl = (imageId: string, imageSize: number): string => {
            return this._imageUrlBuilder.buildUrl(imageId, imageSize, imageSize).toString();
        };
        
        tour.tours_objects.forEach((obj)=>{
            
            let title;
            let geoRef;
            let material;
            let width;
            let height;
            let depth;
            let unit;
            let inventar;
            obj.object.attribute_translations.forEach((translation) => {
                switch (translation.attribute_key){
                    case GuideAtrKeys.title:
                        title = translation.value;
                        break;
                    case GuideAtrKeys.geographicalReferences:
                        geoRef = translation.value;
                        break;
                    case GuideAtrKeys.material:
                        material = translation.value;
                        break;
                    case GuideAtrKeys.width:
                        width = translation.value;
                        break;
                    case GuideAtrKeys.width:
                        width = translation.value;
                        break;
                    case GuideAtrKeys.height:
                        height = translation.value;
                        break;
                    case GuideAtrKeys.heightUnit:
                        unit = translation.value;
                        break;
                    case GuideAtrKeys.inventar:
                        inventar = translation.value;
                        break;
                }
                if(translation.attribute_key === GuideAtrKeys.title){
                    title = translation.value;
                }
            })
            
            const dimensions: string = (height ? height : "NA") + ":" + (unit ? unit : "NA") + " (h/w/d)";
            
            const img_url = buildImageUrl(obj.object.attachments[0].attachment, this.config.DATA_CONFIG.COLLECTION_CARD_IMAGE_SIZE);
            
            // console.log(img_url)
            
            // todo translations
            const object: TourObjectData = {
                "id": obj.object_id,
                "displayTitle": title ? title : "no title found",//title ? title : "no title found",//obj.object.attribute_translations[0],
                "image": img_url,//obj.object.attachments[0].attachment,
                "pictureCredits": '',
                "geographicalReferences": geoRef ? geoRef : "no identNr found",
                "materialAndTechnique": material ? material : "no identNr found",
                "dimensionsAndWeight": dimensions,
                "identNr": inventar ? "Inv. Nr. " + inventar : "no identNr found",
                "abstract": obj.tours_objects_translations[0].abstract,
                "description": obj.tours_objects_translations[0].description,
                "link": obj.object_id,
                "relatedTours": []
            }
            
            if(stations[obj.sequence -1] !== undefined){
                stations[obj.sequence -1].objects.push(object);
            } else {
                
                const map = dir[dirCount++];
                const lvl = dir[dirCount++];
                
                const direction: Direction[] = [];
                if(dir[dirCount]){
                    while(dirCount < dir.length && !(dir[dirCount].indexOf("Weiter zu") !== -1)){
                    
                        const d: Direction = {
                            name:'',
                            description: '',
                            facilities: [],
                            relatedStations: []
                        }
                        
                        const splitted = dir[dirCount].split(" | ");
                        
                        d.name = splitted[0];
                        
                        if(splitted.length > 1){
                            d.description = splitted[1];
                        }
                        
                        direction.push(d);
                        dirCount++;
                    }
                    direction.push({
                        name: dir[dirCount].split(" | ")[0],
                        description: dir[dirCount].split(" | ")[1],
                        facilities: [],
                        relatedStations: []
                    });
                    dirCount++;
                }
                
                const station: StationData = {
                    "id": obj.sequence.toString(),
                    "name": obj.room ? obj.room : "No room",
                    "tour": slim,
                    "description": '',
                    "map": map,
                    "level": lvl,
                    "directions": direction,
                    "objects": [object]
                }
                
                // todo no room ???? 
                stations[obj.sequence -1] = station
            }
        })
        
        // direction to the exit
        const map = dir[dirCount++];
        const lvl = dir[dirCount++];
        
        const direction: Direction[] = [];
        if(dir[dirCount]){
            while(dirCount < dir.length && !(dir[dirCount].indexOf("Weiter zu") !== -1)){
            
                const d: Direction = {
                    name:'',
                    description: '',
                    facilities: [],
                    relatedStations: []
                }
                
                const splitted = dir[dirCount].split(" | ");
                
                
                d.name = splitted[0];
                
                if(splitted.length > 1){
                    d.description = splitted[1];
                }
                
                direction.push(d);
                dirCount++;
            }
            direction.push({
                name: dir[dirCount++].split(" | ")[0],
                description: '',
                facilities: [],
                relatedStations: []
            });
        }
        
        stations.push({
            "id": stations.length.toString(),
            "name": "Ausgang",
            "tour": slim,
            "description": '',
            "map": map,
            "level": lvl,
            "directions": direction,
            "objects": []
        })
               
        const tour_img = buildImageUrl(tour?.preview_image, this.config.DATA_CONFIG.COLLECTION_CARD_IMAGE_SIZE);
        
        return {
            id: tour?.id,
            number: tour?.number,
            title: tour?.tours_translations[0].title,
            subtitle: tour?.tours_translations[0].subtitle,
            abstract: tour?.tours_translations[0].abstract,
            description: tour?.tours_translations[0].description,
            image: tour_img ? tour_img : "",
            location: loc,
            duration: dur,
            objectsCount: tour?.tours_objects.length,
            stations: stations
        };
    }

    getGuides(): {
        loading: boolean;
        error: ApolloError | undefined;
        rawData: SmbTours[] | null;
        contextData: Array<CollectionContextData>;
    } {
        const { loading, error, data } = this.guideRepository.fetchGuides(LanguageService.getCurrentLanguage());
        let contextData: Array<CollectionContextData> = [];

        if (!loading && data) {
            contextData = this.convertGuidesToCollectionsContext(data, this.config);
        }

        return { loading, error, rawData: data, contextData };
    }

    private convertGuidesToCollectionsContext(tours: Array<SmbTours>, config: Config): Array<CollectionContextData> {
        const collection: Array<CollectionContextData> = [];

        for (const tour of tours) {
            let collectionData = this.convertGuidesToCollectionContext(tour, config)
            
            if(collectionData != null){
                collection.push(collectionData);    
            }
        }

        return collection;
    }

    private convertGuidesToCollectionContext(tour: SmbTours, config: Config): CollectionContextData | null {
        const imageUrlBuilder = new ImageUrlBuilder();

        if(tour.tours_translations.length === 0){
            return null;
        }
        
        const buildImageUrl = (imageId: string, imageSize: number): string => {
            return this._imageUrlBuilder.buildUrl(imageId, imageSize, imageSize).toString();
        };

        return {
            id: tour.id,
            title: tour.tours_translations[0].title,
            subtitle: tour.tours_translations[0].abstract ? tour.tours_translations[0].abstract : '',
            previewImageSlider: buildImageUrl(tour.preview_image, config.DATA_CONFIG.TOPIC_SLIDER_IMAGE_SIZE),
            previewImageCard: buildImageUrl(tour.preview_image, config.DATA_CONFIG.COLLECTION_CARD_IMAGE_SIZE),
            previewImageMediaPlayer: tour.tours_translations[0].subtitle ? tour.tours_translations[0].subtitle : '',
            collectionObjects: tour.tours_objects ? new Array(tour.tours_objects.length) : [],
        };
    }
}

export default GuideService;
