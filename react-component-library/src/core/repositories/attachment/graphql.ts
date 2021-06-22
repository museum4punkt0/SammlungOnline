import gql from 'graphql-tag';

export const FetchExhibitAttachments = gql`
  query FetchObjectAttachments($object_id: bigint!) {
    smb_objects_by_pk(id: $object_id) {
      attachments(order_by: [{ primary: desc }]) {
        attachment
        primary
        credits
      }
    }
  }
`;
