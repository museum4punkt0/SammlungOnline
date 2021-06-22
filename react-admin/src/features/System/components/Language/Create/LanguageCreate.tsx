import React from 'react';
import { ResourceComponentProps } from 'ra-core';

import { Create, SimpleForm, TextInput } from 'react-admin';

const LanguageCreate: React.FC<ResourceComponentProps> = (props) => {
    return (
        <Create {...props} title={'title.smb_language'}>
            <SimpleForm>
                <TextInput source={'lang'} label={'field.lang_iso'} />
            </SimpleForm>
        </Create>
    );
};

export default LanguageCreate;
