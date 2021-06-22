import React from 'react';
import { ResourceComponentProps } from 'ra-core';

import { Create, SimpleForm, TextInput } from 'react-admin';
import UnreferencedHint from '../../../../../shared/UnreferencedHint/UnreferencedHint';

const IntroSlidesCreate: React.FC<ResourceComponentProps> = (props) => {
    return (
        <Create {...props} title={'title.smb_intro_slides'}>
            <SimpleForm>
                <TextInput source={'image'} label={'field.preview_image'} />
                <UnreferencedHint />
            </SimpleForm>
        </Create>
    );
};

export default IntroSlidesCreate;
