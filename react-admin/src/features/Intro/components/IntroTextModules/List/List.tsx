import React from 'react';
import { ResourceComponentProps } from 'ra-core';

import { Datagrid, EditButton, List, ReferenceManyField, ShowButton, SimpleList, TextField } from 'react-admin';

const IntroTextModulesList: React.FC<ResourceComponentProps> = (props) => {
    return (
        <List {...props} title={'title.smb_intro_text_modules'}>
            <Datagrid>
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
                    <SimpleList
                        primaryText={(record: Record<string, any>) => record.title}
                        secondaryText={(record: Record<string, any>) => record.subtitle}
                    />
                </ReferenceManyField>
                <EditButton />
                <ShowButton />
            </Datagrid>
        </List>
    );
};

export default IntroTextModulesList;
