import React from 'react';
import { ResourceComponentProps } from 'ra-core';

import { Create, required, SimpleForm, TextInput } from 'react-admin';

import TranslationCreateButton from '../../../../../shared/TranslationCreateButton/TranslationCreateButton';

const ToursCreate: React.FC<ResourceComponentProps> = (props) => {
    return (
        <Create {...props} title={'title.smb_tours'}>
            <SimpleForm>
                <TextInput source={'number'} label={'field.number'} validate={required()} />
                <TextInput source={'preview_image'} label={'field.preview_image'} />
                <TextInput source={'museum'} label={'field.museum'} />
                <TextInput source={'duration'} label={'field.duration'} />
                <TextInput style={{ width: '80rem' }} multiline source={'directions'} label={'field.directions'} />
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
            </SimpleForm>
        </Create>
    );
};

export default ToursCreate;
