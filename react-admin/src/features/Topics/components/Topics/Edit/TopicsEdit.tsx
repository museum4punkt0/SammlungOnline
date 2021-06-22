import React from 'react';
import { ResourceComponentProps } from 'ra-core';

import {
    BooleanInput,
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
import TopicsObjectAssignmentButton from '../../../../../shared/TopicsObjectAssignmentButton/TopicsObjectAssignmentButton';

const TopicsEdit: React.FC<ResourceComponentProps> = (props) => {
    return (
        <Edit {...props} title={'title.smb_topics'}>
            <SimpleForm>
                <TextField source={'id'} label={'field.id'} />
                <BooleanInput source={'has_slide'} label={'field.has_slide'} />
                <TextInput source={'preview_image'} label={'field.preview_image'} />
                <ReferenceManyField
                    reference={'smb_topics_translations'}
                    target={'topics_id'}
                    label={'field.translations'}
                >
                    <Datagrid>
                        <TextField source={'title'} label={'field.title'} />
                        <TextField source={'description'} label={'field.description'} />
                        <ReferenceField reference={'smb_language'} source={'language_id'} label={'field.language'}>
                            <TextField source={'lang'} />
                        </ReferenceField>
                        <EditButton />
                        <DeleteButton />
                    </Datagrid>
                </ReferenceManyField>
                <TranslationCreateButton
                    translationTable={'smb_topics_translations'}
                    saveInterceptor={(values, parentRecord) => {
                        if (parentRecord) {
                            values.topics_id = parseInt(parentRecord.id, 10);
                        }
                        return values;
                    }}
                    dialogTitle={'Erstelle Übersetzung für Topic'}
                >
                    <TextInput source={'title'} label={'field.title'} validate={required()} />
                    <TextInput source={'description'} label={'field.description'} validate={required()} />
                </TranslationCreateButton>
                <ReferenceManyField
                    reference={'smb_topics_objects'}
                    target={'topics_id'}
                    label={'field.linked_objects'}
                >
                    <Datagrid>
                        <TextField source={'object.id'} label={'field.mds_id'} />
                        <TextField source={'object.attribute_translations[0].value'} label={'field.title'} />
                        <DeleteButton />
                    </Datagrid>
                </ReferenceManyField>
                <TopicsObjectAssignmentButton />
            </SimpleForm>
        </Edit>
    );
};

export default TopicsEdit;
