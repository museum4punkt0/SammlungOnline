import { useDependency } from '../context/dependency.context';

export const useFetchExhibitAttachments = (id: number) => {
  const { attachmentService } = useDependency();

  return attachmentService.findOneByExhibitId(id);
};
