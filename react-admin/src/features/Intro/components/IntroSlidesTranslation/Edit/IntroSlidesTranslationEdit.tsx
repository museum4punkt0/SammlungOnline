import React from 'react';
import { ResourceComponentProps } from 'ra-core';

import { Edit, ReferenceInput, SelectInput, SimpleForm, TextField, TextInput } from 'react-admin';

const IntroSlidesTranslationEdit: React.FC<ResourceComponentProps> = (props) => {
    return (
        <Edit {...props} title={'title.smb_intro_slide_translations'}>
            <SimpleForm>
                <TextField source={'id'} label={'field.id'} />
                <ReferenceInput source={'language_id'} reference={'smb_language'} label={'field.language'}>
                    <SelectInput optionText={'lang'} />
                </ReferenceInput>
                <TextInput style={{ width: '80rem' }} source={'title'} label={'field.title'} />
            </SimpleForm>
        </Edit>
    );
};

export default IntroSlidesTranslationEdit;
