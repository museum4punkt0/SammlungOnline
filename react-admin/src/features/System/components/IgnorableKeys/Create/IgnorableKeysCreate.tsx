import React from 'react';
import { ResourceComponentProps } from 'ra-core';

import { Create, SimpleForm, TextInput } from 'react-admin';

const IgnorableKeysCreate: React.FC<ResourceComponentProps> = (props) => {
    return (
        <Create {...props} title={'title.smb_ignoreable_keys'}>
            <SimpleForm>
                <TextInput source={'key'} label={'field.key'} />
            </SimpleForm>
        </Create>
    );
};

export default IgnorableKeysCreate;
