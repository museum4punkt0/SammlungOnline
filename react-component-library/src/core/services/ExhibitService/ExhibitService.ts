import axios from 'axios';

import { IConfiguration } from '../../config/configuration';

import { QueryRoot, SmbObjects } from '../../generated/graphql';
import { FetchExhibitById, FetchManyExhibitsById } from '../../repositories/exhibit/graphql';

import LanguageService from '../LanguageService/service/LanguageService';
import GraphqlService from '../GraphqlService/graphql.service';

import { GraphqlExhibitModel } from '../../models/exhibit/graphql-exhibit.model';
import { ExhibitModel } from '../../models/exhibit/exhibit.model';

import { EGraphqlTranslationAttributesFields } from '../../enums/graphql-translations/graphql-translation-attributes-fields.enum';
import { IImageUrlBuilder } from '../ImageUrlBuilderService/image-url-builder-service.interaface';

export interface IExhibitWithAttachmentOnly {
  id: number;
  src: string | null;
}

class ExhibitService {
  constructor(
    private readonly _config: IConfiguration,
    private readonly _graphqlService: GraphqlService,
    private readonly _imageUrlBuilderService: IImageUrlBuilder,
  ) {}

  public async findOne(id: number): Promise<ExhibitModel> {
    const { data } = await axios.get(`${this._config.ELASTIC_API_URL}/${id}`);

    if (!data) {
      const language = LanguageService.getCurrentLanguage();
      const { smb_objects: exhibitFromGraphql } = await this._graphqlService.query<QueryRoot>(FetchExhibitById, {
        lang: language,
        id,
      });

      return this.mapTranslatesToExhibit(exhibitFromGraphql[0]);
    } else {
      return this.mapToExhibitModel(data);
    }
  }

  public async findMany(ids: number[]): Promise<IExhibitWithAttachmentOnly[]> {
    const exhibitsWithAttachmentOnly = await this._graphqlService.query<QueryRoot>(FetchManyExhibitsById, { object_ids: ids });

    return (
      exhibitsWithAttachmentOnly.smb_objects?.map(({ id, attachments }) => {
        const attachment = attachments.length ? attachments[0].attachment : null;

        return {
          id: id,
          src: attachment ? this._imageUrlBuilderService.buildUrl(attachment, 300, 300) : '',
        };
      }) ?? []
    );
  }

  public mapTranslatesToExhibit(object: SmbObjects): ExhibitModel {
    const dto = { id: object.id } as any;

    for (const { value, attribute_key, attribute } of object.attribute_translations) {
      const key = attribute_key || attribute.key;

      if (Array.isArray(dto[key])) {
        dto[key].push(value);
      } else if (dto[key]) {
        dto[key] = [dto[key], value];
      } else {
        dto[key] = value;
      }
    }

    const graphqlExhibitModel = this.mapToGraphqlExhibitModel(dto);
    return this.mapToExhibitModel(graphqlExhibitModel);
  }

  public mapToGraphqlExhibitModel(dto: any): GraphqlExhibitModel {
    return {
      id: dto.id,
      title: dto[EGraphqlTranslationAttributesFields.title],
      technicalTerm: dto[EGraphqlTranslationAttributesFields.technicalTerm],
      dating: dto[EGraphqlTranslationAttributesFields.dating],
      identNumber: dto[EGraphqlTranslationAttributesFields.identNumber],
      collectionKey: dto[EGraphqlTranslationAttributesFields.collectionKey],
      location: dto[EGraphqlTranslationAttributesFields.location],
      involvedParties: dto[EGraphqlTranslationAttributesFields.involvedParties],
      longDescription: dto[EGraphqlTranslationAttributesFields.description],
      geographicalReferences: dto[EGraphqlTranslationAttributesFields.geographicalReferences],
      materialAndTechnique: dto[EGraphqlTranslationAttributesFields.materialAndTechnique],
      dimensionsAndWeight: dto[EGraphqlTranslationAttributesFields.dimensionsAndWeight],
    };
  }

  public mapToExhibitModel(dto: GraphqlExhibitModel | any): ExhibitModel {
    const getTitle = (): string => {
      if (dto?.titles?.length) {
        return dto.titles[0];
      }

      return dto?.technicalTerm || dto?.identNumber || '[Ohne Titel]';
    };

    return {
      id: dto.id,
      title: getTitle(),
      titles: dto.titles,
      description: dto.longDescription,
      identNumber: dto.identNumber,
      involvedParties: dto.involvedParties,
      geographicalReferences: dto.geographicalReferences,
      dating: dto.dating,
      collection: dto.collection,
      attachments: dto.attachments,
      highlight: dto.highlight,
      exhibitionSpace: dto.exhibitionSpace,
      exhibited: dto.exhibit,
      dimensionsAndWeight: dto.dimensionsAndWeight,
      literature: dto?.literature,
      src: dto.src,
      signatures: dto?.signatures,
      technicalTerm: dto.technicalTerm,
      materialAndTechnique: dto.materialAndTechnique,
      provenance: dto.provenance,
      collectionKey: dto.collectionKey ?? 'default',
      compilation: dto.compilation,
      location: dto.location,
      creditLine: dto.creditLine,
    };
  }
}

export default ExhibitService;
