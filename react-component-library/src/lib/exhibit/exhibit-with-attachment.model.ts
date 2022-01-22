import { IAttachment } from '../attachment/attachment.model';

export interface IExhibitWithAttachment {
  id: number;
  attachments: IAttachment[];
}
