export interface IAsset {
  id: number;
  filename: string;
  linkTemplate: string;
}

/**
 * Data structure of a culturalReference
 */
export interface ICulturalReference {
  markup: string;
  denominationId: number;
  formatted: string;
  name: string;
  typeId: number;
  id: number;
}

/**
 * Data structure of a geographical reference
 */
export interface IGeographicalReference {
  markup: string;
  denominationId: number;
  formatted: string;
  location: string;
  id: number;
  typeId: number;
  details: string;
}

/**
 * data structure of an involved party
 */
export interface IInvolvedParty {
  markup: string;
  denominationId: number;
  formatted: string;
  dateRange: string;
  name: string;
  id: number;
}

/**
 * data structure of a technical term
 */
export interface ITechnicalTerm {
  markup: string;
  formatted: string;
}

/**
 * data structure of a materialAndTechnique array item
 */
export interface IMaterialAndTechnique {
  markup: string;
  formatted: string;
  name: string;
  typeId: number;
  id: number;
}

export interface IIconClass {
  id: number;
  key: string;
  formatted: string;
  markup: string;
}

export interface IDateRange {
  gte: string;
  lte: string;
  formatted: string;
}

export interface IDescription {
  formatted: string;
  markup: string;
}

export interface IExhibition {
  id: number;
  title: string;
  formatted: string;
  markup: string;
}

export interface IMarkupWithId {
  id: number;
  formatted: string;
  markup: string;
}

export interface ITitle {
  formatted: string;
  markup: string;
}

/**
 * Database model of an exhibit - presents the structure of a Graphql request
 *
 * ----------
 * This varies from endpoint to endpoint (flat | full | id) and therefore should
 * be parsed to it's corresponding ExhibitModel (ExhibitModelFull | ExhibitModelFlat)
 *
 * @docs: https://gitlab-smb.xaidev.net/smb/search-indexer/-/tree/dev/
 */
export class GraphqlExhibitModel {
  public readonly id!: number;
  public readonly archiveContent?: string;
  public readonly acquisition?: string[];
  public readonly assets?: number[] | IAsset[];
  public readonly attachments?: boolean;
  // might become object[]
  public readonly assortments?: string[];
  public readonly collection?: string;
  public readonly collectionKey?: string;
  public readonly compilation?: string;
  public readonly creditLine?: string;
  public readonly culturalReferences?: string[] | ICulturalReference[];
  public readonly dateRange?: IDateRange | string;
  public readonly dating?: string[];
  public readonly description?: string | IDescription;
  public readonly dimensionsAndWeight?: string[];
  public readonly exhibit?: boolean;
  public readonly exhibitionSpace?: string[];
  public readonly exhibitions?: string[] | IExhibition[];
  public readonly findSpot?: string;
  public readonly geographicalReferences?: string[] | IGeographicalReference[];
  public readonly highlight?: boolean;
  public readonly iconclasses?: string[] | IIconClass[];
  public readonly iconography?: string[] | IMarkupWithId[];
  public readonly identNumber?: string;
  // might become object[]
  public readonly inscriptions?: string[];
  public readonly involvedParties?: string[] | IInvolvedParty[];
  public readonly keywords?: string[] | IMarkupWithId[];
  // might become object[]
  public readonly literature?: string[];
  // might become object
  public readonly location?: string;
  public readonly materialAndTechnique?: string[] | IMaterialAndTechnique[];
  public readonly permalink?: string;
  public readonly provenance?: string[];
  public readonly provenanceEvaluation?: string;
  // might become object[]
  public readonly signatures?: string[];
  public readonly technicalTerm?: string | ITechnicalTerm;
  public readonly title?: string;
  public readonly titles?: string[] | ITitle[];
}
