import React from 'react';
import { ResourceComponentProps } from 'ra-core';

import { Datagrid, EditButton, List, ReferenceField, TextField } from 'react-admin';

const TopicsTranslationsList: React.FC<ResourceComponentProps> = (props) => {
    return (
        <List {...props} title={'title.smb_topics_translations'}>
            <Datagrid>
                <TextField source={'id'} label={'field.id'} />
                <ReferenceField source={'language_id'} reference={'smb_language'} label={'field.language'}>
                    <TextField source={'lang'} />
                </ReferenceField>
                <TextField source={'title'} label={'field.title'} />
                <TextField source={'description'} label={'field.description'} />
                <EditButton />
            </Datagrid>
        </List>
    );
};

export default TopicsTranslationsList;
