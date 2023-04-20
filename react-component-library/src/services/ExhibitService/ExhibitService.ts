/* eslint-disable no-console */
import axios from 'axios';
import { QueryRoot, SmbObjects } from '../../generated/graphql';
import {
  FetchExhibitById,
  FetchManyExhibitsById,
} from '../../lib/exhibit/graphql';
import { GraphqlExhibitModel } from '../../lib/exhibit/graphql-exhibit.model';
import { ExhibitModel } from '../../lib/exhibit/exhibit.model';
import {
  IConfiguration,
  GraphqlService,
  IImageUrlBuilder,
  EGraphqlTranslationAttributesFields,
} from 'src';
import { LanguageService } from '../LanguageService';

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

  public async findOne(id: number): Promise<ExhibitModel | Error> {
    try {
      const { data } = await axios.get(
        `${this._config.ELASTIC_API_URL}/${id}/?projection=full`,
        // `${this._config.ELASTIC_API_URL}/${id}`,
      );

      if (!data) {
        const language = LanguageService.getCurrentLanguage();
        const { smb_objects: exhibitFromGraphql } =
          await this._graphqlService.query<QueryRoot>(FetchExhibitById, {
            lang: language,
            id,
          });
        return this.mapTranslatesToExhibit(exhibitFromGraphql[0]);
      } else {
        return this.mapToExhibitModel(data);
      }
    } catch (error) {
      return new Error(error as any);
    }
  }

  public async findMany(ids: number[]): Promise<IExhibitWithAttachmentOnly[]> {
    const exhibitsWithAttachmentOnly =
      await this._graphqlService.query<QueryRoot>(FetchManyExhibitsById, {
        object_ids: ids,
      });

    return (
      exhibitsWithAttachmentOnly.smb_objects?.map(({ id, attachments }) => {
        const attachment = attachments.length
          ? attachments[0].attachment
          : null;

        return {
          id: id,
          src: attachment
            ? this._imageUrlBuilderService.buildUrl(attachment, 300, 300)
            : '',
        };
      }) ?? []
    );
  }

  public mapTranslatesToExhibit(object: SmbObjects): ExhibitModel {
    const dto = { id: object.id } as any;

    for (const { value, attribute_key, attribute } of object.attributes) {
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
      findSpot: dto[EGraphqlTranslationAttributesFields.findSpot],
      involvedParties: dto[EGraphqlTranslationAttributesFields.involvedParties],
      longDescription: dto[EGraphqlTranslationAttributesFields.description],
      geographicalReferences:
        dto[EGraphqlTranslationAttributesFields.geographicalReferences],
      materialAndTechnique:
        dto[EGraphqlTranslationAttributesFields.materialAndTechnique],
      dimensionsAndWeight:
        dto[EGraphqlTranslationAttributesFields.dimensionsAndWeight],
    };
  }

  public mapToExhibitModel(dto: GraphqlExhibitModel | any): ExhibitModel {
    const getTitle = (): string => {
      if (dto?.titles?.length) {
        return dto.titles[0];
      }
      return dto?.technicalTerm || dto?.identNumber || '[Ohne Titel]';
    };

    const getKeywords = () => {
      if (dto.keywords) {
        return dto.keywords;
      } else if (dto.iconography || dto.iconclasses) return [];
    };

    const getSearchIndexerObject = (attribute: string, arr: any) => {
      if (!arr || !arr.length) return '';
      return arr.map((item: any) => {
        if (typeof item !== 'string') {
          if (attribute === 'involvedParties') {
            return {
              formatted: item.formatted,
              href: item.formatted.replace(
                `${item.name}`,
                `<a href=${this._config.RESEARCH_DOMAIN}/?controls=none&conditions=AND%2B${attribute}.id%2B${item.id}>${item.name}</a>`,
              ),
              html: true,
            };
          } else {
            return {
              formatted: item.formatted,
              href: `${this._config.RESEARCH_DOMAIN}/?controls=none&conditions=AND%2B${attribute}.id%2B${item.id}`,
              html: false,
            };
          }
        }
        return item;
      });
    };

    return {
      acquisition: dto.acquisition,
      attachments: dto.attachments,
      collection: dto.collection,
      collectionKey: dto.collectionKey ?? 'default',
      compilation: dto.compilation,
      creditLine: dto.creditLine,
      dating: dto.dating,
      description: dto.longDescription,
      dimensionsAndWeight: dto.dimensionsAndWeight,
      exhibited: dto.exhibit,
      exhibitions: dto.exhibitions,
      exhibitionSpace: dto.exhibitionSpace,
      geographicalReferences: getSearchIndexerObject(
        'geographicalReferences',
        dto.geographicalReferences,
      ),
      highlight: dto.highlight,
      id: dto.id,
      identNumber: dto.identNumber,
      involvedParties: getSearchIndexerObject(
        'involvedParties',
        dto.involvedParties,
      ),
      literature: dto?.literature,
      location: dto.location,
      materialAndTechnique: getSearchIndexerObject(
        'materialAndTechnique',
        dto.materialAndTechnique,
      ),
      provenance: dto.provenance,
      provenanceEvaluation: dto.provenanceEvaluation,
      signatures: dto?.signatures,
      src: dto.src,
      technicalTerm: dto.technicalTerm,
      inscriptions: dto.inscriptions,
      keywords: getKeywords(),
      iconography: dto.iconography,
      iconclasses: dto.iconclasses,
      title: getTitle(),
      titles: dto.titles,
    };
  }
}

export default ExhibitService;
