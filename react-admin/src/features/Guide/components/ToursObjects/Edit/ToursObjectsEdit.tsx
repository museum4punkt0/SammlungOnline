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

const ToursObjectsEdit: React.FC<ResourceComponentProps> = (props) => {
    return (
        <Edit {...props} title={'title.smb_tours_objects'}>
            <SimpleForm>
                <ReferenceField source="object_id" reference="smb_objects" link={false} label={'field.title'}>
                    <TextField source={'attribute_translations[0].value'} />
                </ReferenceField>
                <TextInput source={'tour_id'} label={'field.tour_id'} />
                <TextInput source={'object_id'} label={'field.object_id'} />
                <TextInput source={'room'} label={'field.room'} />
                <TextInput source={'sequence'} label={'field.sequence'} />
                <ReferenceManyField
                    reference={'smb_tours_objects_translation'}
                    target={'tour_object_id'}
                    label={'field.translation'}
                >
                    <Datagrid>
                        <ReferenceField source={'language_id'} reference={'smb_language'} label={'field.language'}>
                            <TextField source={'lang'} />
                        </ReferenceField>
                        <TextField source={'abstract'} label={'field.abstract'} />
                        <TextField source={'description'} label={'field.description'} />
                        <EditButton />
                        <DeleteButton />
                    </Datagrid>
                </ReferenceManyField>
                <TranslationCreateButton
                    translationTable={'smb_tours_objects_translation'}
                    saveInterceptor={(values, parentRecord) => {
                        if (parentRecord) {
                            values.tour_id = parseInt(parentRecord.id, 10);
                        }
                        return values;
                    }}
                    dialogTitle={'Erstelle Übersetzung für Tour'}
                >
                    <TextInput
                        style={{ width: '80rem' }}
                        multiline
                        source={'abstract'}
                        label={'field.abstract'}
                        validate={required()}
                    />
                    <TextInput
                        style={{ width: '80rem' }}
                        multiline
                        source={'description'}
                        label={'field.description'}
                        validate={required()}
                    />
                </TranslationCreateButton>
            </SimpleForm>
        </Edit>
    );
};

export default ToursObjectsEdit;
