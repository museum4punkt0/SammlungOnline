import gql from 'graphql-tag';

export const FetchTours = gql`
    query FetchGuides($lang: String!) {
        smb_tours {
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

export const FetchToursByExhibitId = gql`
    query FetchObjectById($object_id: bigint!, $attributes: [String!], $lang: String!) {
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
