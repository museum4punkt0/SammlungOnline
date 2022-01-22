import gql from 'graphql-tag';

export const FetchExhibitAttachments = gql`
  query FetchObjectAttachments($object_id: bigint!, $language: String) {
    smb_objects_by_pk(id: $object_id) {
      attachments(order_by: { primary: desc, attachment: asc }) {
        attachment
        primary
        credits
        license {
          key
          link
          licenses_translations(where: { language: { lang: { _eq: $language } } }) {
            content
          }
        }
      }
    }
  }
`;
