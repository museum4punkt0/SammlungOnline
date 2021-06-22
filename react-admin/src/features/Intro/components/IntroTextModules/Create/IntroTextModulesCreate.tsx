import React from 'react';
import { ResourceComponentProps } from 'ra-core';

import { Create, SelectInput, SimpleForm, TextInput } from 'react-admin';
import UnreferencedHint from '../../../../../shared/UnreferencedHint/UnreferencedHint';

// TODO smb_intro_text_module_type instead
const options = [
    { id: 'TEXT', value: 'TEXT' },
    { id: 'RESEARCH', value: 'RESEARCH' },
    { id: 'TOPIC', value: 'TOPIC' },
    { id: 'GUIDE', value: 'GUIDE' },
];

const IntroTextModulesCreate: React.FC<ResourceComponentProps> = (props) => {
    return (
        <Create {...props} title={'title.smb_intro_text_modules'}>
            <SimpleForm>
                <TextInput source={'link'} label={'field.link'} />
                <TextInput source={'module_background_color'} label={'field.module_background_color'} />
                <TextInput source={'title_color'} label={'field.title_color'} />
                <TextInput source={'text_color'} label={'field.text_color'} />
                <TextInput source={'text_area_color'} label={'field.text_area_color'} />
                <SelectInput
                    source={'module_type'}
                    choices={options}
                    optionText={'value'}
                    label={'field.module_type'}
                />
                <UnreferencedHint />
            </SimpleForm>
        </Create>
    );
};

export default IntroTextModulesCreate;
