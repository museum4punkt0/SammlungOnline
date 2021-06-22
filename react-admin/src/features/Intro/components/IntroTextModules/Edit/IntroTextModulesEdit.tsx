import React from 'react';

import { ResourceComponentProps } from 'ra-core';

import {
    Datagrid,
    DeleteButton,
    Edit,
    EditButton,
    ReferenceManyField,
    SelectInput,
    SimpleForm,
    TextField,
    TextInput,
} from 'react-admin';
import TranslationCreateButton from '../../../../../shared/TranslationCreateButton/TranslationCreateButton';

// TODO smb_intro_text_module_type instead
const options = [
    { id: 'TEXT', value: 'TEXT' },
    { id: 'RESEARCH', value: 'RESEARCH' },
    { id: 'TOPIC', value: 'TOPIC' },
    { id: 'GUIDE', value: 'GUIDE' },
];

const IntroTextModulesEdit: React.FC<ResourceComponentProps> = (props) => {
    return (
        <Edit {...props} title={'title.smb_intro_text_modules'}>
            <SimpleForm>
                <TextField source={'id'} label={'field.id'} />
                <TextInput style={{ width: '80rem' }} source={'link'} label={'field.link'} />
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
                <ReferenceManyField
                    reference={'smb_intro_text_module_translations'}
                    target={'intro_text_module_id'}
                    label={'field.translations'}
                >
                    <Datagrid>
                        <TextField source={'title'} label={'field.title'} />
                        <TextField source={'subtitle'} label={'field.subtitle'} />
                        <TextField source={'content'} label={'field.content'} />
                        <TextField source={'link_caption'} label={'field.link_caption'} />
                        <EditButton />
                        <DeleteButton />
                    </Datagrid>
                </ReferenceManyField>
                <TranslationCreateButton
                    translationTable={'smb_intro_text_module_translations'}
                    saveInterceptor={(values, parentRecord) => {
                        if (parentRecord) {
                            values.intro_text_module_id = parseInt(parentRecord.id, 10);
                        }
                        return values;
                    }}
                    dialogTitle={'field.create_translations_for_text_module'}
                >
                    <TextInput source={'title'} label={'field.title'} />
                    <TextInput source={'subtitle'} label={'field.subtitle'} />
                    <TextInput source={'content'} label={'field.content'} />
                    <TextInput source={'link_caption'} label={'field.link_caption'} />
                </TranslationCreateButton>
            </SimpleForm>
        </Edit>
    );
};

export default IntroTextModulesEdit;
