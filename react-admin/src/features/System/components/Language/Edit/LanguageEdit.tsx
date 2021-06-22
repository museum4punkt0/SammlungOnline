import React from 'react';
import { ResourceComponentProps } from 'ra-core';

import { Edit, SimpleForm, TextField, TextInput } from 'react-admin';

const LanguageEdit: React.FC<ResourceComponentProps> = (props) => {
    return (
        <Edit {...props} title={'title.smb_language'}>
            <SimpleForm>
                <TextField source={'id'} label={'field.id'} />
                <TextInput source={'lang'} label={'field.lang_iso'} />
            </SimpleForm>
        </Edit>
    );
};

export default LanguageEdit;
