import { useQuery } from '@apollo/react-hooks';

import { SmbObjects, QueryRoot } from '../../generated/graphql';

import { EGraphqlTranslationAttributesFields } from '../../enums/graphql-translations/graphql-translation-attributes-fields.enum';

import { IRepositoryResponse } from '../repository.interface';

import { FetchExhibitById } from './graphql';

export class ExhibitRepository {
  private readonly _attributesToBeFetched = Object.values(EGraphqlTranslationAttributesFields);

  public fetchById(exhibitId: number, lang: string, skip = false): IRepositoryResponse<SmbObjects | null> {
    const { loading, error, data: response } = useQuery<QueryRoot>(FetchExhibitById, {
      variables: {
        object_id: exhibitId,
        attributes: this._attributesToBeFetched,
        lang: lang,
      },
      skip,
    });
    const data = response?.smb_objects && response.smb_objects[0];

    return { loading, error, data: data || null };
  }
}
