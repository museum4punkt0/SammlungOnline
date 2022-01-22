import { IAttachment } from '../../../../../lib/attachment/attachment.model';

export interface IExhibitPreviewProps {
  attachments: IAttachment[];
  creditsLabel: string;
  currentAttachment: IAttachment;
  onChange?: (attachment: IAttachment) => void;
}
