import gql from 'graphql-tag';

export const FetchExhibitAttachments = gql`
  query FetchObjectAttachments($object_id: bigint!, $language: String) {
    smb_objects_by_pk(id: $object_id) {
      attachments(
        order_by: [{ primary: desc }, { attachment: asc }]
        limit: 10
      ) {
        id
        attachment
        name
        primary
        credits
        license {
          key
          link
          i18n(where: { language: { lang: { _eq: $language } } }) {
            content
          }
        }
      }
    }
  }
`;
