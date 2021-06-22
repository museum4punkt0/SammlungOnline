import React from 'react';
import { ResourceComponentProps } from 'ra-core';

import { Edit, ReferenceInput, SelectInput, SimpleForm, TextField, TextInput } from 'react-admin';

const ToursObjectsTranslationEdit: React.FC<ResourceComponentProps> = (props) => {
    return (
        <Edit {...props} title={'title.smb_tours_objects_translation'}>
            <SimpleForm>
                <TextField source={'id'} label={'field.id'} />
                <ReferenceInput source={'language_id'} reference={'smb_language'} label={'field.language'}>
                    <SelectInput optionText={'lang'} />
                </ReferenceInput>
                <TextInput style={{ width: '80rem' }} multiline source={'abstract'} label={'field.abstract'} />
                <TextInput style={{ width: '80rem' }} multiline source={'description'} label={'field.description'} />
            </SimpleForm>
        </Edit>
    );
};

export default ToursObjectsTranslationEdit;
