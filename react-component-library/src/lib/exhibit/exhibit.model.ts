import {
  ICulturalReference,
  IAsset,
  IDateRange,
  IGeographicalReference,
  IExhibition,
  IIconClass,
  IInvolvedParty,
  IMaterialAndTechnique,
  ITechnicalTerm,
  IMarkupWithId,
  ITitle,
  IDescription,
} from './graphql-exhibit.model';

export class ExhibitModel {
  public readonly archiveContent?: string;
  public readonly acquisition?: string[];
  public readonly attachments?: boolean;
  public readonly assets?: number[] | IAsset[];
  public readonly collection?: string;
  public readonly collectionKey: string;
  public readonly compilation?: string;
  public readonly creditLine?: string;
  public readonly culturalReferences?: string[] | ICulturalReference[];
  public readonly dating?: string[];
  public readonly description?: string | IDescription;
  public readonly dimensionsAndWeight?: string[];
  public readonly exhibit?: boolean; // duplicate of exhibited?
  public readonly exhibited?: boolean; // duplicate of exhibit?
  public readonly exhibitions?: string[] | IExhibition[];
  public readonly exhibitionSpace?: string;
  public readonly findSpot?: string;
  public readonly geographicalReferences?: string[] | IGeographicalReference[];
  public readonly highlight?: boolean;
  public readonly id!: number;
  public readonly iconclasses?: string[] | IIconClass[];
  public readonly iconography?: string[] | IMarkupWithId[];
  public readonly identNumber?: string;
  public readonly inscriptions?: string[];
  public readonly involvedParties?: string[] | IInvolvedParty[];
  public readonly keywords?: string[] | IMarkupWithId[];
  public readonly literature?: string[];
  public readonly location?: string;
  public readonly materialAndTechnique?: string[] | IMaterialAndTechnique[];
  public readonly provenance?: string[];
  public readonly provenanceEvaluation?: string;
  public readonly signatures?: string[];
  public readonly src: string; // why?
  public readonly technicalTerm?: string | ITechnicalTerm;
  public readonly title: string; // not optional, falls back to '[Ohne Titel]'
  public readonly titles?: string[] | ITitle[];

  constructor() {
    this.src = '';
    this.title = '[Ohne Titel]';
    this.collectionKey = 'default';
  }
}

/**
 * ExhibitModel used to encapsulate data from a flat projection
 */
export class ExhibitModelFlat {
  public readonly id!: number;
  public readonly archiveContent?: string;
  public readonly acquisition?: string[];
  public readonly assets?: number[];
  public readonly attachments?: boolean;
  public readonly assortments?: string[];
  public readonly collection?: string;
  public readonly collectionKey?: string;
  public readonly compilation?: string;
  public readonly creditLine?: string;
  public readonly culturalReferences?: string[];
  public readonly dateRange?: string;
  public readonly dating?: string[];
  public readonly description?: IDescription;
  public readonly dimensionsAndWeight?: string[];
  public readonly exhibit?: boolean;
  public readonly exhibitionSpace?: string[];
  public readonly exhibitions?: string[];
  public readonly findSpot?: string;
  public readonly geographicalReferences?: string[];
  public readonly highlight?: boolean;
  public readonly iconclasses?: string[];
  public readonly iconography?: string[];
  public readonly identNumber?: string;
  public readonly inscriptions?: string[];
  public readonly involvedParties?: string[];
  public readonly keywords?: string[];
  public readonly literature?: string[];
  public readonly location?: string;
  public readonly materialAndTechnique?: string[];
  public readonly permalink?: string;
  public readonly provenance?: string[];
  public readonly provenanceEvaluation?: string;
  public readonly signatures?: string[];
  public readonly technicalTerm?: string;
  public readonly title?: string;
  public readonly titles?: string[];
}

/**
 * Model class used to encapsulate data from a full projection endpoint
 */
export class ExhibitModelFull {
  public readonly id!: number;
  public readonly archiveContent?: string;
  public readonly acquisition?: string[];
  public readonly assets?: IAsset[];
  public readonly attachments?: boolean;
  // candidate for BREAKING CHANGE, may become object[]
  public readonly assortments?: string[];
  public readonly collection?: string;
  public readonly collectionKey?: string;
  public readonly compilation?: string;
  public readonly creditLine?: string;
  public readonly culturalReferences?: ICulturalReference[];
  public readonly dateRange?: IDateRange;
  public readonly dating?: string[];
  public readonly description?: IDescription;
  public readonly dimensionsAndWeight?: string[];
  public readonly exhibit?: boolean;
  public readonly exhibitionSpace?: string[];
  public readonly exhibitions?: IExhibition[];
  public readonly findSpot?: string;
  public readonly geographicalReferences?: IGeographicalReference[];
  public readonly highlight?: boolean;
  public readonly iconclasses?: IIconClass[];
  public readonly iconography?: IMarkupWithId[];
  public readonly identNumber?: string;
  // candidate for BREAKING CHANGE, may become object[]
  public readonly inscriptions?: string[];
  public readonly involvedParties?: IInvolvedParty[];
  public readonly keywords?: IMarkupWithId[];
  // candidate for BREAKING CHANGE, may become object[]
  public readonly literature?: string[];
  // candidate for BREAKING CHANGE, may become object
  public readonly location?: string;
  public readonly materialAndTechnique?: IMaterialAndTechnique[];
  public readonly permalink?: string;
  public readonly provenance?: string[];
  public readonly provenanceEvaluation?: string;
  // candidate for BREAKING CHANGE, may become object[]
  public readonly signatures?: string[];
  public readonly technicalTerm?: ITechnicalTerm;
  public readonly title?: string;
  public readonly titles?: ITitle[];
}
