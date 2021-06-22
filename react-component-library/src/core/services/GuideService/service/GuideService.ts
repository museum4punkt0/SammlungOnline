import { ApolloError } from 'apollo-boost';

// import { SmbAttachments, SmbTopics, SmbTopicsObjects } from '../generated/graphql';

// repository
import GuideRepository from '../repository/GuideRepository';

// other services
import { LanguageService } from '../../LanguageService';

import { SmbObjects, SmbTours } from '../../../generated/graphql';
import { IDirection, IRelatedStation, ISlimTourData, IStationData, ITourData, ITourObjectData } from '../interfaces/IGuideData';
import { ICollectionContextData } from '../interfaces/IGuideInterfaces';
import { GuideAtrKeys } from '../repository/GuideAttributes';
import { IImageUrlBuilder } from '../../ImageUrlBuilderService/image-url-builder-service.interaface';

class GuideService {
  private guideRepository: GuideRepository;
  private ImageUrlBuilder: IImageUrlBuilder;
  // private readonly config: Config;

  constructor(imageUrlBuilder: IImageUrlBuilder) {
    this.ImageUrlBuilder = imageUrlBuilder;
    this.guideRepository = new GuideRepository();
    // this.config = ConfigLoader.CurrentConfig;
  }

  buildImageUrl(imageId: string, imageSize: number): string {
    return this.ImageUrlBuilder.buildUrl(imageId, imageSize, imageSize).toString();
  }

  getGuide(
    id: number,
    imageCardSize: number,
    imageSliderSize: number,
  ): {
    tourLoading: boolean;
    tourError: ApolloError | undefined;
    tourData: ITourData | null;
    objectLoading: boolean;
    objectError: ApolloError | undefined;
    objectsData: { data: SmbObjects | null }[];
  } {
    const lang = LanguageService.getCurrentLanguage();
    const { loading, error, data } = this.guideRepository.fetchGuide(id, lang);

    const objectsData: { data: SmbObjects | null }[] = [];
    const objectIds: number[] = [];

    let tourData: ITourData = {
      id: 0,
      number: 0,
      title: '',
      subtitle: '',
      abstract: '',
      description: '',
      image: '',
      location: '',
      duration: '',
      objectsCount: 0,
      stations: [],
    };

    if (!loading && data) {
      tourData = this.convertGuideToTourData(data, imageCardSize, imageSliderSize);
      data.tours_objects.forEach(tour => {
        objectIds.push(tour.object_id);
      });
    }

    const { loading: objectLoading, error: objectError, data: objectData } = this.guideRepository.fetchObjects(objectIds, lang);

    if (!objectLoading && objectData && !loading && data) {
      objectData.forEach(tour => {
        objectsData.push({ data: tour });
      });

      tourData.stations.forEach(station => {
        if (station?.objects) {
          station.objects.forEach(stationObject => {
            const obj = objectData.find(value => value.id === stationObject.id);

            if (obj?.attribute_translations) {
              let geoRef;
              let material;
              let measurements;
              let inventar;
              obj.attribute_translations.forEach(translation => {
                switch (translation.attribute_key) {
                  case GuideAtrKeys.geographicalReferences:
                    geoRef = translation.value;
                    break;
                  case GuideAtrKeys.material:
                    material = translation.value;
                    break;
                  case GuideAtrKeys.measurements:
                    measurements = translation.value;
                    break;
                  case GuideAtrKeys.inventar:
                    inventar = translation.value;
                    break;
                }
              });
              // todo translations
              stationObject.identNr = (inventar ?? '-') + ' Inv. Nr.';
              stationObject.dimensionsAndWeight = measurements ?? '-';
              stationObject.geographicalReferences = geoRef ?? '-';
              stationObject.materialAndTechnique = material ?? '-';
            }
          });
        }
      });
    }
    return {
      tourLoading: loading,
      tourError: error,
      tourData: tourData,
      objectLoading: objectLoading,
      objectError,
      objectsData: objectsData,
    };
  }

  // todo translations
  private convertGuideToTourData(tour: SmbTours, imageCardSize: number, imageSliderSize: number): ITourData {
    let dirCount = 0;
    const dir: string[] = tour?.directions?.split('\n') ?? [];
    const loc = tour?.museum ?? '-';
    const dur = tour?.duration ?? '-';

    const stations: IStationData[] = [];

    const slim: ISlimTourData = { id: tour?.id ?? '', title: tour?.tours_translations[0]?.title ?? '' };

    if (tour?.tours_objects) {
      tour.tours_objects.forEach(obj => {
        if (obj) {
          let title;
          if (obj.object?.attribute_translations) {
            obj.object.attribute_translations.forEach(translation => {
              if (translation?.attribute_key) {
                switch (translation.attribute_key) {
                  case GuideAtrKeys.title:
                    title = translation.value;
                    break;
                }
              }
            });
          }

          let img_url = '';
          if (obj?.object?.attachments[0]?.attachment) {
            img_url = this.buildImageUrl(obj.object.attachments[0].attachment, imageCardSize);
          }

          // todo translations
          const object: ITourObjectData = {
            id: obj?.object_id ?? '',
            displayTitle: title ?? 'No title found',
            image: img_url,
            pictureCredits: '',
            geographicalReferences: '',
            materialAndTechnique: '',
            dimensionsAndWeight: '',
            identNr: '',
            abstract: obj?.tours_objects_translations[0]?.abstract ?? '',
            description: obj?.tours_objects_translations[0]?.description ?? '',
            link: obj?.object_id ?? '',
            relatedTours: [],
          };
          if (obj?.sequence && obj?.room) {
            if (stations.length > 0 && stations[stations.length - 1] && stations[stations.length - 1].name === obj.room) {
              stations[stations.length - 1].objects.push(object);
            } else {
              let map = '';
              let lvl = '';

              const direction: IDirection[] = [];
              if (dir[dirCount]) {
                while (dirCount < dir.length && dir[dirCount].indexOf('Weiter zu') === -1) {
                  const line = dir[dirCount];

                  const d: IDirection = {
                    name: '',
                    description: '',
                    facilities: [],
                    relatedStations: [],
                  };

                  if (line.trim().length !== 0) {
                    if (line.indexOf('[') === 0) {
                      [lvl, map] = line.slice(1, -1).split(':');
                    } else {
                      const splitted = line.split(' | ');
                      d.name = splitted[0];

                      if (splitted.length > 1) {
                        d.description = splitted[1];
                      }

                      direction.push(d);
                    }
                  }

                  dirCount++;
                }

                const relStations: IRelatedStation[] = [];
                const linkDirection = dir[dirCount].split(' | ');

                // related station format {tourID,tourTitle,stationID,linkDescription}
                if (linkDirection.length > 2) {
                  for (let i = 2; i < linkDirection.length; i++) {
                    const data = linkDirection[i].slice(1, -1).split(',');
                    relStations.push({
                      tour: { id: parseInt(data[0]), title: data[1] },
                      id: data[2],
                      description: data[3],
                    });
                  }
                }

                direction.push({
                  name: linkDirection[0],
                  description: linkDirection[1],
                  facilities: [],
                  relatedStations: relStations,
                });
                dirCount++;
              }

              const station: IStationData = {
                id: obj.sequence.toString(),
                name: obj.room ? obj.room : 'No room',
                tour: slim,
                description: '',
                map: map,
                level: lvl,
                directions: direction,
                objects: [object],
              };
              stations[stations.length] = station;
            }
          }
        }
      });
    }

    // direction to the exit
    let map = '';
    let lvl = '';

    const direction: IDirection[] = [];
    if (dir[dirCount]) {
      while (dirCount < dir.length && dir[dirCount].indexOf('Weiter zu') === -1) {
        const line = dir[dirCount];

        const d: IDirection = {
          name: '',
          description: '',
          facilities: [],
          relatedStations: [],
        };

        if (line.trim().length !== 0) {
          if (line.indexOf('[') === 0) {
            [lvl, map] = line.slice(1, -1).split(':');
          } else {
            const splitted = line.split(' | ');
            d.name = splitted[0];

            if (splitted.length > 1) {
              d.description = splitted[1];
            }

            direction.push(d);
          }
        }

        dirCount++;
      }
      direction.push({
        name: dir[dirCount].split(' | ')[0],
        description: dir[dirCount].split(' | ')[1],
        facilities: [],
        relatedStations: [],
      });
    }

    stations.push({
      id: stations.length.toString(),
      name: 'Ausgang',
      tour: slim,
      description: '',
      map: map,
      level: lvl,
      directions: direction,
      objects: [],
    });

    let tour_img = '';
    if (tour?.preview_image) {
      tour_img = this.buildImageUrl(tour?.preview_image, imageSliderSize);
    }

    return {
      id: tour?.id ?? 0,
      number: tour?.number ?? 0,
      title: tour?.tours_translations[0]?.title ?? '',
      subtitle: tour?.tours_translations[0]?.subtitle ?? '',
      abstract: tour?.tours_translations[0]?.abstract ?? '',
      description: tour?.tours_translations[0]?.description ?? '',
      image: tour_img,
      location: loc,
      duration: dur + ' min',
      objectsCount: tour?.tours_objects?.length ?? 0,
      stations: stations,
    };
  }

  getGuides(
    imageCardSize: number,
    ImageSliderSize: number,
  ): {
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

  private convertGuidesToCollectionsContext(
    tours: Array<SmbTours>,
    imageCardSize: number,
    ImageSliderSize: number,
  ): Array<ICollectionContextData> {
    const collection: Array<ICollectionContextData> = [];

    for (const tour of tours) {
      const collectionData = this.convertGuidesToCollectionContext(tour, imageCardSize, ImageSliderSize);

      if (collectionData != null) {
        collection.push(collectionData);
      }
    }

    return collection;
  }

  private convertGuidesToCollectionContext(tour: SmbTours, imageCardSize: number, imageSliderSize: number): ICollectionContextData | null {
    const imageUrlBuilder = this.ImageUrlBuilder;

    if (tour.tours_translations.length === 0) {
      return null;
    }

    const buildImageUrl = (imageId: string, imageSize: number): string => {
      return imageUrlBuilder.buildUrl(imageId, imageSize, imageSize).toString();
    };

    return {
      id: tour.id,
      title: tour.tours_translations[0].title,
      subtitle: tour.tours_translations[0].abstract ? tour.tours_translations[0].abstract : '',
      previewImageSlider: buildImageUrl(tour.preview_image, imageSliderSize),
      previewImageCard: buildImageUrl(tour.preview_image, imageCardSize),
      previewImageMediaPlayer: tour.tours_translations[0].subtitle ? tour.tours_translations[0].subtitle : '',
      collectionObjects: tour.tours_objects ? new Array(tour.tours_objects.length) : [],
    };
  }
}

export default GuideService;
