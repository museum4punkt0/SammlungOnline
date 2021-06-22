import React from 'react';
import { ResourceComponentProps } from 'ra-core';

import { Datagrid, EditButton, List, ReferenceField, TextField } from 'react-admin';

const IntroTextModuleTranslationsList: React.FC<ResourceComponentProps> = (props) => {
    return (
        <List {...props} title={'title.smb_intro_text_module_translations'}>
            <Datagrid>
                <TextField source={'id'} label={'field.id'} />
                <ReferenceField source={'language_id'} reference={'smb_language'} label={'field.language'}>
                    <TextField source={'lang'} />
                </ReferenceField>
                <TextField source={'title'} label={'field.title'} />
                <TextField source={'subtitle'} label={'field.subtitle'} />
                <TextField source={'content'} label={'field.content'} />
                <TextField source={'link_caption'} label={'field.link_caption'} />
                <EditButton />
            </Datagrid>
        </List>
    );
};

export default IntroTextModuleTranslationsList;
