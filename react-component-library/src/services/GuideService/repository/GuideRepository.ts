import { ApolloError, gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { QueryRoot, SmbObjects, SmbTours } from '../../../generated/graphql';
import { GuideAtrKeys, GuideAttributeKeysList } from './GuideAttributes';

// fetch all tours
const FetchGuides = gql`
  query FetchGuides($lang: String!) {
    smb_tours(order_by: { number: asc }) {
      id
      number
      preview_image
      tours_translations(where: { language: { lang: { _eq: $lang } } }) {
        title
        subtitle
        abstract
      }
      tours_objects {
        object {
          id
        }
      }
    }
  }
`;

// Query for data of a single guide.
const FetchGuide = gql`
  query FetchGuide($id: bigint!, $attribute: String!, $lang: String!) {
    smb_tours(where: { id: { _eq: $id } }) {
      id
      number
      preview_image
      directions
      museum
      duration
      tours_translations(where: { language: { lang: { _eq: $lang } } }) {
        title
        subtitle
        abstract
        description
      }
      tours_objects(order_by: { sequence: asc }) {
        object_id
        sequence
        room
        object {
          attribute_translations(
            where: {
              attribute_key: { _eq: $attribute }
              language: { lang: { _eq: "de" } }
            }
          ) {
            attribute_key
            value
          }
          attachments(order_by: [{ primary: desc }, { attachment: asc }], limit: 1) {
            attachment
          }
        }
        tours_objects_translations {
          abstract
          description
        }
      }
    }
  }
`;

const FetchObjects = gql`
  query FetchGuideObject($ids: [bigint!], $attributes: [String!], $lang: String!) {
    smb_objects(where: { id: { _in: $ids } }) {
      id
      attribute_translations(
        where: { attribute_key: { _in: $attributes }, language: { lang: { _eq: $lang } } }
      ) {
        attribute_key
        value
      }
    }
  }
`;

class GuideRepository {
  fetchGuides(lang: string): {
    loading: boolean;
    error: ApolloError | undefined;
    data: Array<SmbTours> | null;
  } {
    const { loading, error, data } = useQuery<QueryRoot>(FetchGuides, {
      variables: { lang: lang },
    });
    let resultData = null;

    if (!loading && data) {
      resultData = data.smb_tours;
    }

    return { loading, error, data: resultData };
  }

  // fetchGuide(
  //             id: number,
  //             lang: string,
  //             setIsLoading: (value: boolean) => void,
  //             setData: (value: TourData | undefined) => void,
  //             setError: (value: undefined) => void) {
  //             setIsLoading(false);

  //             fetch("/data/guideData/guide_" + id + ".json")
  //                 .then(response => response.json())
  //                 .then(
  //                     (result) => {
  //                         setIsLoading(true);
  //                         setData(result ? result : undefined);
  //                     },
  //                     (error) => {
  //                         setIsLoading(true);
  //                         setError(error);
  //                     }
  //                 ).catch();
  //         }

  fetchGuide(
    id: number,
    lang: string,
  ): { loading: boolean; error: ApolloError | undefined; data: SmbTours | null } {
    const { loading, error, data } = useQuery<QueryRoot>(FetchGuide, {
      variables: {
        id: id,
        attribute: GuideAtrKeys.title ?? 'ObjObjectTitleVrt',
        lang: lang,
      },
    });
    let resultData = null;

    if (!loading && data) {
      resultData = data.smb_tours[0];
    }

    return { loading, error, data: resultData };
  }

  fetchObjects(
    ids: number[],
    lang: string,
  ): { loading: boolean; error: ApolloError | undefined; data: SmbObjects[] | null } {
    const { loading, error, data } = useQuery<QueryRoot>(FetchObjects, {
      variables: {
        ids: ids,
        attributes: GuideAttributeKeysList,
        lang: lang,
      },
    });
    let resultData = null;

    if (!loading && data) {
      resultData = data.smb_objects;
    }

    return { loading, error, data: resultData };
  }

  // TODO move and improve, use SearchResultModel as type
  // resolveObject(id: number): any {
  //     const request = new XMLHttpRequest();
  //     request.open('GET', ConfigLoader.CurrentConfig.ELASTIC_API_URL.concat(`/${id}`), false); // `false` makes the request synchronous
  //     request.send();
  //     return request.status === 200 ? JSON.parse(request.responseText) : {};
  // }
}

export default GuideRepository;
