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
  public readonly geographicalReferences?: string[];
  public readonly highlight?: boolean;
  public readonly id!: number;
  public readonly identNumber?: string;
  public readonly involvedParties?: string[];
  public readonly literature?: string[];
  public readonly location?: string;
  public readonly materialAndTechnique?: string[];
  public readonly provenance?: string[];
  public readonly provenanceEvaluation?: string;
  public readonly signatures?: string[];
  public readonly src: string;
  public readonly technicalTerm?: string;
  public readonly title: string;
  public readonly titles?: string[];
  constructor() {
    this.src = '';
    this.title = '[Ohne Titel]';
    this.collectionKey = 'default';
  }
}
