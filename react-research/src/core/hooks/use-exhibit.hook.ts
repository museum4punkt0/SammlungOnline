import { useEffect, useState } from 'react';
import { ExhibitModel } from 'smb-react-components-library';

import { useDependency } from '../store/dependency.context';

export type UseFetchExhibitResult = {
    exhibit: ExhibitModel | null;
    loading: boolean;
    error: boolean;
};

export const useFetchExhibit = (id: number): UseFetchExhibitResult => {
    const { exhibitService } = useDependency();

    const [loading, setLoading] = useState(true);
    const [exhibit, setExhibit] = useState<ExhibitModel | null>(null);

    useEffect(() => {
        (async () => {
            const _exhibit = await exhibitService.findOne(id);

            setExhibit(_exhibit);
            setLoading(false);
        })();
    }, [id]);

    return {
        exhibit,
        loading,
        error: false,
    };
};
