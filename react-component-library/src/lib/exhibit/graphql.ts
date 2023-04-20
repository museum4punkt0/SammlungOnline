import gql from 'graphql-tag';

export const FetchExhibitById = gql`
  query FetchObjectById(
    $object_id: bigint!
    $attributes: [String!]
    $lang: String!
  ) {
    smb_objects(
      where: {
        id: { _eq: $object_id }
        attributes: {
          attribute_key: { _in: $attributes }
          language: { lang: { _eq: $lang } }
        }
      }
    ) {
      id
      attachments(
        order_by: [{ primary: desc }, { attachment: asc }]
        limit: 1
      ) {
        attachment
        primary
        credits
      }
      attributes(
        where: {
          attribute_key: { _in: $attributes }
          language: { lang: { _eq: $lang } }
        }
      ) {
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
      attachments(
        order_by: [{ primary: desc }, { attachment: asc }]
        limit: 1
      ) {
        attachment
      }
    }
  }
`;
