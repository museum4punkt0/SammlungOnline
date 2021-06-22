import { useDependency } from '../store/dependency.context';

export const useFetchExhibitAttachments = (id: number) => {
    const { attachmentService } = useDependency();

    return attachmentService.findOneByExhibitId(id);
};
