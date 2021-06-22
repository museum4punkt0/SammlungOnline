import React from 'react';
import { ResourceComponentProps } from 'ra-core';

import {
    Datagrid,
    DeleteButton,
    EditButton,
    ReferenceField,
    ReferenceManyField,
    Show,
    SimpleShowLayout,
    TextField,
} from 'react-admin';
import PreviewImage from '../../../../../shared/PreviewImage/PreviewImage';

const IntroSlidesShow: React.FC<ResourceComponentProps> = (props) => {
    return (
        <Show {...props} title={'title.smb_intro_slides'}>
            <SimpleShowLayout>
                <TextField source={'id'} label={'field.id'} />
                <PreviewImage />
                <ReferenceManyField
                    reference={'smb_intro_slide_translations'}
                    target={'intro_slide_id'}
                    label={'field.translations'}
                >
                    <Datagrid>
                        <TextField source={'title'} label={'field.titel'} />
                        <ReferenceField reference={'smb_language'} source={'language_id'} label={'field.language'}>
                            <TextField source={'lang'} />
                        </ReferenceField>
                        <EditButton />
                        <DeleteButton />
                    </Datagrid>
                </ReferenceManyField>
            </SimpleShowLayout>
        </Show>
    );
};

export default IntroSlidesShow;
