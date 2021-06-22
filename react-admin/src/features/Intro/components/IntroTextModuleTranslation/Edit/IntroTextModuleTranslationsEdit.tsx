import React from 'react';
import { ResourceComponentProps } from 'ra-core';

import { Edit, ReferenceInput, SelectInput, SimpleForm, TextField, TextInput } from 'react-admin';

const IntroTextModuleTranslationsEdit: React.FC<ResourceComponentProps> = (props) => {
    return (
        <Edit {...props} title={'title.smb_intro_text_module_translations'}>
            <SimpleForm>
                <TextField source={'id'} label={'field.id'} />
                <ReferenceInput source={'language_id'} reference={'smb_language'} label={'field.language'}>
                    <SelectInput optionText={'lang'} />
                </ReferenceInput>
                <TextInput source={'title'} label={'field.title'} />
                <TextInput source={'subtitle'} label={'field.subtitle'} />
                <TextInput style={{ width: '80rem' }} multiline source={'content'} label={'field.content'} />
                <TextInput source={'link_caption'} label={'field.link_caption'} />
            </SimpleForm>
        </Edit>
    );
};

export default IntroTextModuleTranslationsEdit;
