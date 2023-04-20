export class ExhibitModel {
  public readonly acquisition?: string[];
  public readonly attachments?: boolean;
  public readonly collection?: string;
  public readonly collectionKey: string;
  public readonly compilation?: string;
  public readonly creditLine?: string;
  public readonly dating?: string[];
  public readonly description?: string;
  public readonly dimensionsAndWeight?: string[];
  public readonly exhibited?: boolean;
  public readonly exhibitions?: string[];
  public readonly exhibitionSpace?: string;
  public readonly geographicalReferences?:
    | string[]
    | {
        formatted: string;
        href: string;
        html?: boolean;
      }[];
  public readonly highlight?: boolean;
  public readonly findSpot?: string;
  public readonly id!: number;
  public readonly identNumber?: string;
  public readonly involvedParties?:
    | string[]
    | {
        formatted: string;
        href: string;
        html?: boolean;
      }[];
  public readonly literature?: string[];
  public readonly location?: string;
  public readonly materialAndTechnique?:
    | string[]
    | {
        formatted: string;
        href: string;
        html?: boolean;
      }[];
  public readonly provenance?: string[];
  public readonly provenanceEvaluation?: string;
  public readonly signatures?: string[];
  public readonly src: string;
  public readonly technicalTerm?: string;
  public readonly title: string;
  public readonly titles?: string[];
  public readonly exhibit?: boolean;
  public readonly iconclasses?: string[];
  public readonly inscriptions?: string[];
  public readonly iconography?: string[];
  public readonly keywords?: string[];
  public readonly longDescription?: string;

  constructor() {
    this.src = '';
    this.title = '[Ohne Titel]';
    this.collectionKey = 'default';
  }
}
