import React from 'react';
import { ResourceComponentProps } from 'ra-core';

import { Edit, ReferenceInput, SelectInput, SimpleForm, TextField, TextInput } from 'react-admin';

const TopicsTranslationsEdit: React.FC<ResourceComponentProps> = (props) => {
    return (
        <Edit {...props} title={'title.smb_topics_translations'}>
            <SimpleForm>
                <TextField source={'id'} label={'field.id'} />
                <ReferenceInput source={'language_id'} reference={'smb_language'} label={'field.language'}>
                    <SelectInput optionText={'lang'} />
                </ReferenceInput>
                <TextInput source={'title'} label={'field.title'} />
                <TextInput style={{ width: '80rem' }} multiline source={'description'} label={'field.description'} />
            </SimpleForm>
        </Edit>
    );
};

export default TopicsTranslationsEdit;
