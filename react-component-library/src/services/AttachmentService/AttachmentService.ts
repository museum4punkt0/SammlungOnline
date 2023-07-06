import { IConfiguration } from '../../config/configuration';
import { SmbAttachments } from '../../generated/graphql';

import { IAttachment } from '../../lib/attachment/attachment.model';

import ImageUrlBuilderService from '../ImageUrlBuilderService/ImageUrlBuilderService';
import LanguageService from '../LanguageService/service/LanguageService';
import { IRepositoryResponse } from '../../lib/repository.interface';
import AttachmentRepository from '../../lib/attachment/attachment.repository';

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

  private _mapToAttachment(attachmentDto: SmbAttachments): IAttachment {
    const {
      attachment: filename,
      name: downloadFilename,
      credits,
      license,
      primary: isPrimary,
    } = attachmentDto;

    const src = this._imageUrlBuilder.buildUrl(filename, 300, 300);

    return {
      id: attachmentDto.id,
      src,
      filename,
      downloadFilename:
        downloadFilename || filename.substring(filename.lastIndexOf('/') + 1),
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
