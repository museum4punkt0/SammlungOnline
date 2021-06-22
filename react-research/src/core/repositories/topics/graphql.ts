import gql from 'graphql-tag';

import { EGraphqlTranslationAttributesFields } from '../../enums/graphql-translations/graphql-translation-attributes-fields.enum';

export const FetchTopics = gql`
    query FetchTopics($lang: String!) {
        smb_topics(order_by: { id: asc }) {
            id
            has_slide
            preview_image
            topics_translations(where: { language: { lang: { _eq: $lang } } }) {
                description
                title
            }
            objects {
                object {
                    id
                }
            }
        }
    }
`;

export const FetchTopic = gql`
    query FetchTopic($id: bigint!, $lang: String!) {
        smb_topics_by_pk(id: $id) {
            preview_image
            objects {
                object {
                    id
                    attachments(where: {primary: {_eq: true}}) {
                        attachment
                        primary
                    }
                    attribute_translations(where: { 
                        attribute_key: { _eq: "${EGraphqlTranslationAttributesFields.title}" }, 
                        language: {lang: {_eq: $lang}}
                    }) {
                        value
                        attribute_key
                    }
                }
        }
        topics_translations(where: { language: { lang: { _eq: $lang } } }) {
            title
            description
        }
    }
}
`;

export const FetchTopicsByExhibitId = gql`
    query FetchObjectById($object_id: bigint!, $attributes: [String!], $lang: String!) {
        smb_topics_objects(where: { objects_id: { _eq: $object_id } }) {
            topic {
                id
                topics_translations(where: { language: { lang: { _eq: $lang } } }) {
                    title
                }
            }
        }
    }
`;
