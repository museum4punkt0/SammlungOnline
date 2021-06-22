export class ExhibitModel {
  public readonly id!: number;

  public readonly titles?: string[];

  public readonly title: string;

  public readonly description?: string;

  public readonly identNumber?: string;

  public readonly involvedParties?: string[];

  public readonly geographicalReferences?: string[];

  public readonly dating?: string[];

  public readonly collection?: string;

  public readonly attachments?: boolean;

  public readonly highlight?: boolean;

  public readonly exhibitionSpace?: string;

  public readonly exhibited?: boolean;

  public readonly dimensionsAndWeight?: string[];

  public readonly technicalTerm?: string;

  public readonly literature?: string[];

  public readonly signatures?: string[];

  public readonly materialAndTechnique?: string[];

  public readonly provenance?: string[];

  public readonly src: string;

  public readonly collectionKey: string;

  public readonly location?: string;

  public readonly compilation?: string;

  public readonly creditLine?: string;

  constructor() {
    this.src = '';
    this.title = '[Ohne Titel]';
    this.collectionKey = 'default';
  }
}
