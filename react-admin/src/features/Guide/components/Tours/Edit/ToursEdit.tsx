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
import PreviewImage from '../../../../../shared/PreviewImage/PreviewImage';
import TranslationCreateButton from '../../../../../shared/TranslationCreateButton/TranslationCreateButton';
import ToursObjectAssignmentButton from '../../../../../shared/ToursObjectAssignmentButton/ToursObjectAssignmentButton';

const ToursEdit: React.FC<ResourceComponentProps> = (props) => {
    return (
        <Edit {...props} title={'title.smb_tours'}>
            <SimpleForm>
                <TextField source={'id'} label={'field.id'} />
                <TextInput source={'number'} label={'field.number'} />
                <PreviewImage />
                <TextInput source={'preview_image'} label={'field.preview_image'} />
                <TextInput source={'museum'} label={'field.museum'} />
                <TextInput source={'duration'} label={'field.duration'} />
                <TextInput style={{ width: '80rem' }} multiline source={'directions'} label={'field.directions'} />
                <ReferenceManyField reference={'smb_tours_translation'} target={'tour_id'} label={'field.translations'}>
                    <Datagrid>
                        <ReferenceField reference={'smb_language'} source={'language_id'} label={'field.language'}>
                            <TextField source={'lang'} />
                        </ReferenceField>
                        <TextField source={'title'} label={'field.title'} />
                        <TextField source={'subtitle'} label={'field.subtitle'} />
                        <TextField source={'abstract'} label={'field.abstract'} />
                        <TextField source={'description'} label={'field.description'} />
                        <EditButton />
                        <DeleteButton />
                    </Datagrid>
                </ReferenceManyField>
                <TranslationCreateButton
                    translationTable={'smb_tours_translation'}
                    saveInterceptor={(values, parentRecord) => {
                        if (parentRecord) {
                            values.tour_id = parseInt(parentRecord.id, 10);
                        }
                        return values;
                    }}
                    dialogTitle={'Erstelle Übersetzung für Tour'}
                >
                    <TextInput source={'title'} label={'field.title'} validate={required()} />
                    <TextInput multiline source={'subtitle'} label={'field.subtitle'} validate={required()} />
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
                <ReferenceManyField reference={'smb_tours_objects'} target={'tour_id'} label={'field.linked_objects'}>
                    <Datagrid>
                        <ReferenceField source="object_id" reference="smb_objects" link={false} label={'field.title'}>
                            <TextField source={'attribute_translations[0].value'} />
                        </ReferenceField>
                        <TextField source={'id'} label={'field.id'} />
                        <TextField source={'sequence'} label={'field.sequence'} />
                        <TextField source={'tour_id'} label={'field.tour_id'} />
                        <TextField source={'object_id'} label={'field.object_id'} />
                        <TextField source={'room'} label={'field.room'} />
                        <EditButton />
                        <DeleteButton />
                    </Datagrid>
                </ReferenceManyField>
                <ToursObjectAssignmentButton />
            </SimpleForm>
        </Edit>
    );
};

export default ToursEdit;
