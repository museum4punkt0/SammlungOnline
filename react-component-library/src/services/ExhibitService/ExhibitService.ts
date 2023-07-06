/* eslint-disable no-console */
import axios from 'axios';
import { QueryRoot, SmbObjects } from '../../generated/graphql';
import {
  FetchExhibitById,
  FetchManyExhibitsById,
} from '../../lib/exhibit/graphql';
import {
  GraphqlExhibitModel,
  IAsset,
  ICulturalReference,
  IDateRange,
  IDescription,
  IExhibition,
  IGeographicalReference,
  IIconClass,
  IInvolvedParty,
  IMarkupWithId,
  IMaterialAndTechnique,
  ITechnicalTerm,
  ITitle,
} from '../../lib/exhibit/graphql-exhibit.model';
import {
  ExhibitModel,
  ExhibitModelFlat,
  ExhibitModelFull,
} from '../../lib/exhibit/exhibit.model';
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

/**
 * Service used to get Exhibits from the search API
 * todo: too much use of the any keyword - makes typing useless
 */
class ExhibitService {
  constructor(
    private readonly _config: IConfiguration,
    private readonly _graphqlService: GraphqlService,
    private readonly _imageUrlBuilderService: IImageUrlBuilder,
  ) { }

  /**
   * Gets one exhibit from the search API by ID and converts it to corresponding model. Uses `?projection=full`.
   *
   * -----
   * TODO: model conversion should be based on projection (full|flat|id)
   *    currently there is only full projection (hardcoded in url bellow)
   *    used but it should be provided as param
   * @param id object id
   * @returns error or ExhibitModelFull
   */
  public async findOne(id: number): Promise<ExhibitModel | Error> {
    try {
      const { data } = await axios.get(
        `${this._config.ELASTIC_API_URL}/${id}/?projection=full`,
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
      //fixme: should let error bubble up on a higher level in a try-catch
      // bad design to have multiple possible types in same variable
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
        const filename = attachments[0]?.attachment
        const src = filename && this._imageUrlBuilderService.buildUrl(filename, 300, 300);
        return {
          id: id,
          src: src ?? '',
        };
      }) ?? []
    );
  }

  // todo: needs documenting - difficult to understand o
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
      description: dto[EGraphqlTranslationAttributesFields.description],
      geographicalReferences:
        dto[EGraphqlTranslationAttributesFields.geographicalReferences],
      culturalReferences: dto[EGraphqlTranslationAttributesFields.culturalReferences],
      materialAndTechnique:
        dto[EGraphqlTranslationAttributesFields.materialAndTechnique],
      dimensionsAndWeight:
        dto[EGraphqlTranslationAttributesFields.dimensionsAndWeight],
    };
  }

  /**
   * Converts a GraphqlExhibitModel to ExhibitModel
   * @param dto
   */
  public mapToExhibitModel(dto: GraphqlExhibitModel | any): ExhibitModel {
    const getTitle = (): string => {
      // Prio1: title
      if (dto.title) {
        return dto.title;
      }
      // Prio2: first of titles
      if (dto.titles?.length) {
        return (typeof dto.titles[0] === 'string') ? dto.titles[0] : (dto.titles[0] as any).formatted;
      }
      // Prio3: technical term
      if (dto.technicalTerm) {
        return (typeof dto.technicalTerm === 'string') ? dto.technicalTerm : dto.technicalTerm.formatted;
      }
      // Prio4: ident number
      // else: [Ohne Titel]
      return dto.identNumber || '[Ohne Titel]';
    };

    return {
      acquisition: dto.acquisition,
      archiveContent: dto.archiveContent,
      attachments: dto.attachments,
      collection: dto.collection,
      collectionKey: dto.collectionKey ?? 'default',
      compilation: dto.compilation,
      creditLine: dto.creditLine,
      culturalReferences: dto.culturalReferences,
      dating: dto.dating,
      description: dto.description,
      dimensionsAndWeight: dto.dimensionsAndWeight,
      exhibit: dto.exhibit || dto.exhibited,
      exhibited: dto.exhibit || dto.exhibited,
      exhibitions: dto.exhibitions,
      exhibitionSpace: dto.exhibitionSpace,
      geographicalReferences: dto.geographicalReferences,
      highlight: dto.highlight,
      iconclasses: dto.iconclasses,
      iconography: dto.iconography,
      id: dto.id,
      identNumber: dto.identNumber,
      inscriptions: dto.inscriptions,
      involvedParties: dto.involvedParties,
      keywords: dto.keywords ?? [],
      literature: dto.literature,
      location: dto.location,
      materialAndTechnique: dto.materialAndTechnique,
      provenance: dto.provenance,
      provenanceEvaluation: dto.provenanceEvaluation,
      signatures: dto.signatures,
      src: dto.src,
      technicalTerm: dto.technicalTerm,
      title: getTitle(),
      titles: dto.titles,
    };
  }

  /**
   * Converts GraphqlExhibitModel to ExhibitModelFlat.
   * Should only be used on data fetched from a flat projection endpoint
   * @param dto
   */
  public mapFlat(dto: GraphqlExhibitModel): ExhibitModelFlat {
    return {
      id: dto.id,
      assets: dto.assets as number[],
      archiveContent: dto.archiveContent,
      attachments: dto.attachments,
      assortments: dto.assortments,
      collection: dto.collection,
      collectionKey: dto.collectionKey,
      compilation: dto.compilation,
      creditLine: dto.creditLine,
      culturalReferences: dto.culturalReferences as string[],
      dateRange: dto.dateRange as string,
      dating: dto.dating,
      description: dto.description as IDescription,
      dimensionsAndWeight: dto.dimensionsAndWeight,
      exhibit: dto.exhibit,
      exhibitionSpace: dto.exhibitionSpace,
      exhibitions: dto.exhibitions as string[],
      findSpot: dto.findSpot,
      geographicalReferences: dto.geographicalReferences as string[],
      highlight: dto.highlight,
      iconclasses: dto.iconclasses as string[],
      iconography: dto.iconography as string[],
      identNumber: dto.identNumber,
      inscriptions: dto.inscriptions,
      involvedParties: dto.involvedParties as string[],
      keywords: dto.keywords as string[],
      literature: dto.literature,
      location: dto.location,
      materialAndTechnique: dto.materialAndTechnique as string[],
      permalink: dto.permalink,
      provenance: dto.provenance,
      provenanceEvaluation: dto.provenanceEvaluation,
      signatures: dto.signatures,
      technicalTerm: dto.technicalTerm as string,
      title: dto.title,
      titles: dto.titles as string[],
    };
  }

  /**
   * Converts GraphqlExhibitModel to ExhibitModelFull.
   * Should only be used on data fetched from a full projection endpoint
   * @param dto
   */
  public mapFull(dto: GraphqlExhibitModel): ExhibitModelFull {
    return {
      id: dto.id,
      acquisition: dto.acquisition,
      archiveContent: dto.archiveContent,
      assets: dto.assets as IAsset[],
      attachments: dto.attachments,
      assortments: dto.assortments,
      collection: dto.collection,
      collectionKey: dto.collectionKey,
      compilation: dto.compilation,
      creditLine: dto.creditLine,
      culturalReferences: dto.culturalReferences as ICulturalReference[],
      dateRange: dto.dateRange as IDateRange,
      dating: dto.dating,
      description: dto.description as IDescription,
      dimensionsAndWeight: dto.dimensionsAndWeight,
      exhibit: dto.exhibit,
      exhibitionSpace: dto.exhibitionSpace,
      exhibitions: dto.exhibitions as IExhibition[],
      findSpot: dto.findSpot,
      geographicalReferences: dto.geographicalReferences as IGeographicalReference[],
      highlight: dto.highlight,
      iconclasses: dto.iconclasses as IIconClass[],
      iconography: dto.iconography as IMarkupWithId[],
      identNumber: dto.identNumber,
      inscriptions: dto.inscriptions,
      involvedParties: dto.involvedParties as IInvolvedParty[],
      keywords: dto.keywords as IMarkupWithId[],
      literature: dto.literature,
      location: dto.location,
      materialAndTechnique: dto.materialAndTechnique as IMaterialAndTechnique[],
      permalink: dto.permalink,
      provenance: dto.provenance,
      provenanceEvaluation: dto.provenanceEvaluation,
      signatures: dto.signatures,
      technicalTerm: dto.technicalTerm as ITechnicalTerm,
      title: dto.title,
      titles: dto.titles as ITitle[],
    };
  }
}

export default ExhibitService;
