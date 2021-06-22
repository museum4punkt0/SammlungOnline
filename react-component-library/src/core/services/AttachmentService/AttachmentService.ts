import { IConfiguration } from '../../config/configuration';
import { SmbAttachments } from '../../generated/graphql';

import { IAttachment } from '../../models/attachment/attachment.model';

import ImageUrlBuilderService from '../ImageUrlBuilderService/ImageUrlBuilderService';
import { IRepositoryResponse } from '../../repositories/repository.interface';
import AttachmentRepository from '../../repositories/attachment/attachment.repository';

function makeid(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
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
    const { loading, error, data: rawAttachments } = this._attachmentRepository.fetchExhibitAttachments(id);
    const attachments = rawAttachments?.map(this._mapToAttachment.bind(this)) ?? [];

    return { loading, error, data: attachments };
  }

  private _createRandomFileName(imageName: string): string {
    const [, imageType] = this._imageUrlBuilder.splitImageIdAndType(imageName);
    return makeid(12).concat('.').concat(imageType);
  }

  private _mapToAttachment(attachmentDto: SmbAttachments): IAttachment {
    const { attachment: filename, credits: creditsLineWithLicense, primary: isPrimary } = attachmentDto;
    const { credits, license } = this._parseCreditsAndLicense(creditsLineWithLicense || '');

    const src = this._imageUrlBuilder.buildUrl(filename, 1000, 600);
    const downloadFilename = this._createRandomFileName(filename);

    return {
      src,
      filename,
      downloadFilename,
      credits,
      primary: !!isPrimary,
      license: { ...license, target: '_blank' },
    };
  }

  private _parseCreditsAndLicense(creditsLineWithLicense: string) {
    let credits = creditsLineWithLicense ?? '';
    let license = null;

    if (!creditsLineWithLicense?.trim()) {
      return { credits, license };
    }

    const indexOfCreativeCommons = creditsLineWithLicense.indexOf('CC BY');

    if (indexOfCreativeCommons !== -1) {
      credits = creditsLineWithLicense.substring(0, indexOfCreativeCommons).trim();
      const licenseText = creditsLineWithLicense.substring(indexOfCreativeCommons);

      const licenseParts = licenseText.split(' ');
      const variant = licenseParts[licenseParts.length - 2].trim().toLowerCase();
      const version = licenseParts[licenseParts.length - 1].trim().toLowerCase();

      license = {
        text: licenseText,
        href: `https://creativecommons.org/licenses/${variant}/${version}`,
      };
    }

    return { credits, license };
  }
}

export default AttachmentService;
