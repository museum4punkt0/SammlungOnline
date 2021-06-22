import React from 'react';
import { ResourceComponentProps } from 'ra-core';

import { Datagrid, EditButton, List, ReferenceField, TextField } from 'react-admin';

const IntroSlidesTranslationList: React.FC<ResourceComponentProps> = (props) => {
    return (
        <List {...props} title={'title.smb_intro_slide_translations'}>
            <Datagrid>
                <TextField source={'id'} label={'field.id'} />
                <ReferenceField source={'language_id'} reference={'smb_language'} label={'field.language'}>
                    <TextField source={'lang'} />
                </ReferenceField>
                <TextField source={'title'} label={'field.title'} />
                <EditButton />
            </Datagrid>
        </List>
    );
};

export default IntroSlidesTranslationList;
