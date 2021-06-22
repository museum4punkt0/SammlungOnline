import gql from 'graphql-tag';

export const FetchExhibitById = gql`
  query FetchObjectById($object_id: bigint!, $attributes: [String!], $lang: String!) {
    smb_objects(
      where: {
        id: { _eq: $object_id }
        attribute_translations: { attribute_key: { _in: $attributes }, language: { lang: { _eq: $lang } } }
      }
    ) {
      id
      attachments(where: { primary: { _eq: true } }, limit: 1) {
          attachment
          primary
          credits
      }
      attribute_translations(where: { attribute_key: { _in: $attributes }, language: { lang: { _eq: $lang } } }) {
        attribute_key
        value
      }
    }
  }
`;

export const FetchManyExhibitsById = gql`
  query FetchPrimaryAttachmentsForObjects($object_ids: [bigint!]!) {
    smb_objects(where: { id: { _in: $object_ids } }) {
      id
      attachments(where: { primary: { _eq: true } }, limit: 1) {
        attachment
      }
    }
  }
`;
