import { useQuery } from '@apollo/react-hooks';
import { ApolloError, gql } from 'apollo-boost';
import { QueryRoot, SmbObjects, SmbTopicsObjects, SmbToursObjects } from '../generated/graphql';
import { ConfigLoader } from '../Util/ConfigLoader';
import ObjectAttributes from './Util/ObjectAttributes';

const FetchObjectById = gql`
    query FetchObjectById($object_id: bigint!, $attributes: [String!], $lang: String!) {
        smb_objects(
            where: {
                id: { _eq: $object_id }
                attribute_translations: { attribute_key: { _in: $attributes }, language: { lang: { _eq: $lang } } }
            }
        ) {
            id
            attribute_translations(where: { attribute_key: { _in: $attributes }, language: { lang: { _eq: $lang } } }) {
                attribute_key
                value
            }
            attachments(order_by: [{ primary: desc }]) {
                attachment
                primary
                credits
            }
        }
        smb_topics_objects(where: { objects_id: { _eq: $object_id } }) {
            topic {
                id
                topics_translations(where: { language: { lang: { _eq: $lang } } }) {
                    title
                }
            }
        }
        smb_tours_objects(where: { object_id: { _eq: $object_id } }) {
            tour {
                id
                tours_translations(where: { language: { lang: { _eq: $lang } } }) {
                    title
                }
            }
        }
    }
`;

class ObjectRepository {
    private readonly relevantAttributes: string[];

    constructor() {
        this.relevantAttributes = ObjectAttributes.getObjectAttributeKeys();
    }

    fetchObjectById(
        objectId: number,
        lang: string,
    ): {
        loading: boolean;
        error?: ApolloError;
        data?: SmbObjects;
        topics?: SmbTopicsObjects[];
        tours?: SmbToursObjects[];
    } {
        const { loading, error, data: resultData } = useQuery<QueryRoot>(FetchObjectById, {
            variables: {
                object_id: objectId,
                attributes: this.relevantAttributes,
                lang: lang,
            },
        });
        const data = resultData && resultData.smb_objects && resultData.smb_objects[0];
        const topics = resultData && resultData.smb_topics_objects;
        const tours = resultData && resultData.smb_tours_objects;
        return { loading, error, data, topics, tours };
    }

    // TODO move and improve, use SearchResultModel as type
    resolveObject(id: number): any {
        // const request = new XMLHttpRequest();
        // request.open('GET', ConfigLoader.CurrentConfig.ELASTIC_API_URL.concat(`/${id}`), false); // `false` makes the request synchronous
        // request.send();
        // return request.status === 200 ? JSON.parse(request.responseText) : {};

        return {};
    }
}

export default ObjectRepository;
