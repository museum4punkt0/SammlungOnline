import {mockConfig} from "../index";

export type IMockTourStationTour = {
  id: number;
  title: string;
};
export type IMockTourStationObject = {
  abstract: string;
  description: string;
  dimensionsAndWeight: string;
  displayTitle: string;
  geographicalReferences: string;
  id: number;
  identNr: string;
  image: string;
  link: number;
  materialAndTechnique: string;
  pictureCredits: string;
  relatedTours: [];
};
export type IMockTourStationDirection = {
  description: string;
  facilities: [];
  name: string;
  relatedStations: [];
};
export type IMockTourStation = {
  description: string;
  directions: IMockTourStationDirection[];
  id: string;
  level: string;
  map: string;
  name: string;
  objects: [IMockTourStationObject];
  tour: IMockTourStationTour;
};
export interface IMockCollection {
  elementCount: number;
  id: number;
  image: string;
  onClick: () => void;
  subtitle: string;
  tintColor: any;
  title: string;
}

export interface IMockTourData {
  abstract: string;
  description: string;
  duration: string;
  id: number;
  image: string;
  location: string;
  number: number;
  objectsCount: number;
  stations: [];
  subtitle: string;
  title: string;
}

export interface IMockConfig {
  GUIDE_DOMAIN:string
}
