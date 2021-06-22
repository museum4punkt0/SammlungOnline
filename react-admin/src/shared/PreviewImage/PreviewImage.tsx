import React, { ReactElement } from 'react';
import { ImageField } from 'react-admin';

import { useDependency } from '../../core/contexts/dependencies/hooks/use-dependency.hook';

const PreviewImage = (record: Record<string, any>): ReactElement => {
    const { imageUrlBuilderService } = useDependency();

    console.log(record)

    if (!record?.record?.preview_image) {
        return <></>;
    }

    const url = imageUrlBuilderService.buildUrl(record?.record?.preview_image, 150, 150);
    return <ImageField record={{ url } as any} source={'url'} label={'field.preview_image'} />;
};

export default PreviewImage;
