import React from 'react';
import { ResourceComponentProps } from 'ra-core';

import { Datagrid, DeleteButton, EditButton, ReferenceManyField, Show, SimpleShowLayout, TextField } from 'react-admin';

const IntroTextModulesShow: React.FC<ResourceComponentProps> = (props) => {
    return (
        <Show {...props} title={'title.smb_intro_text_modules'}>
            <SimpleShowLayout>
                <TextField source={'id'} label={'field.id'} />
                <TextField source={'link'} label={'field.link'} />
                <TextField source={'module_background_color'} label={'field.module_background_color'} />
                <TextField source={'title_color'} label={'field.title_color'} />
                <TextField source={'text_color'} label={'field.text_color'} />
                <TextField source={'text_area_color'} label={'field.text_area_color'} />
                <TextField source={'module_type'} label={'field.module_type'} />
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
            </SimpleShowLayout>
        </Show>
    );
};

export default IntroTextModulesShow;
