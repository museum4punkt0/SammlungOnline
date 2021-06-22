import React from 'react';
import { ResourceComponentProps } from 'ra-core';

import {
    Datagrid,
    DeleteButton,
    Edit,
    EditButton,
    ReferenceField,
    ReferenceManyField,
    required,
    SimpleForm,
    TextField,
    TextInput,
} from 'react-admin';
import TranslationCreateButton from '../../../../../shared/TranslationCreateButton/TranslationCreateButton';

const IntroSlidesEdit: React.FC<ResourceComponentProps> = (props) => {
    return (
        <Edit {...props} title={'title.smb_intro_slides'}>
            <SimpleForm>
                <TextField source={'id'} label={'field.id'} />
                <TextInput source={'image'} label={'field.preview_image'} />
                <ReferenceManyField
                    reference={'smb_intro_slide_translations'}
                    target={'intro_slide_id'}
                    label={'field.translations'}
                >
                    <Datagrid>
                        <TextField source={'title'} label={'field.title'} />
                        <ReferenceField reference={'smb_language'} source={'language_id'} label={'field.language'}>
                            <TextField source={'lang'} />
                        </ReferenceField>
                        <EditButton />
                        <DeleteButton />
                    </Datagrid>
                </ReferenceManyField>
                <TranslationCreateButton
                    translationTable={'smb_intro_slide_translations'}
                    saveInterceptor={(values, parentRecord): Record<string, any> => {
                        if (parentRecord) {
                            values.intro_slide_id = parseInt(parentRecord.id, 10);
                        }
                        return values;
                    }}
                    dialogTitle={'Erstelle Übersetzung für Slides'}
                >
                    <TextInput source={'title'} label={'field.title'} validate={required()} />
                </TranslationCreateButton>
            </SimpleForm>
        </Edit>
    );
};

export default IntroSlidesEdit;
