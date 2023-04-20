import { IConfiguration } from '../../config/configuration';
import { SmbAttachments } from '../../generated/graphql';

import { IAttachment } from '../../lib/attachment/attachment.model';

import ImageUrlBuilderService from '../ImageUrlBuilderService/ImageUrlBuilderService';
import LanguageService from '../LanguageService/service/LanguageService';
import { IRepositoryResponse } from '../../lib/repository.interface';
import AttachmentRepository from '../../lib/attachment/attachment.repository';

function makeid(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

class AttachmentService {
  private readonly _imageUrlBuilder: ImageUrlBuilderService;
  private readonly _attachmentRepository: AttachmentRepository;

  constructor(_config: IConfiguration) {
    this._imageUrlBuilder = new ImageUrlBuilderService(_config);
    this._attachmentRepository = new AttachmentRepository();
  }

  public findOneByExhibitId(id: number): IRepositoryResponse<IAttachment[]> {
    const language = LanguageService.getCurrentLanguage();
    const {
      loading,
      error,
      data: rawAttachments,
    } = this._attachmentRepository.fetchExhibitAttachments(id, language);
    const attachments =
      rawAttachments?.map(this._mapToAttachment.bind(this)) ?? [];

    return { loading, error, data: attachments };
  }

  private _createRandomFileName(imageName: string): string {
    const [, imageType] = this._imageUrlBuilder.splitImageIdAndType(imageName);
    return makeid(12).concat('.').concat(imageType);
  }

  private _mapToAttachment(attachmentDto: SmbAttachments): IAttachment {
    const {
      attachment: filename,
      credits,
      license,
      primary: isPrimary,
    } = attachmentDto;

    const src = this._imageUrlBuilder.buildUrl(filename, 300, 300);
    const downloadFilename = this._createRandomFileName(filename);

    return {
      src,
      filename,
      downloadFilename,
      credits: credits || '',
      primary: !!isPrimary,
      license: {
        text: license?.i18n[0]?.content || license?.key,
        href: license?.link ?? undefined,
        target: '_blank',
      },
    };
  }
}

export default AttachmentService;
