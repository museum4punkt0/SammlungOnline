import { useQuery } from '@apollo/react-hooks';

import { QueryRoot, SmbAttachments } from '../../generated/graphql';

import { IRepositoryResponse } from '../repository.interface';

import { FetchExhibitAttachments } from './graphql';

class AttachmentRepository {
  public fetchExhibitAttachments(id: number): IRepositoryResponse<SmbAttachments[]> {
    const { loading, error, data } = useQuery<QueryRoot>(FetchExhibitAttachments, {
      variables: { object_id: id },
    });
    const attachments = data?.smb_objects_by_pk?.attachments || data?.smb_attachments;

    return { loading, error, data: attachments ?? [] };
  }
}

export default AttachmentRepository;
