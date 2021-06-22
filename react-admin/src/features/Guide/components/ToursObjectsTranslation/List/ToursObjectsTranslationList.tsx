import React from 'react';
import { ResourceComponentProps } from 'ra-core';

import { Datagrid, EditButton, List, ReferenceField, TextField } from 'react-admin';

const ToursObjectsTranslationList: React.FC<ResourceComponentProps> = (props) => {
    return (
        <List {...props} title={'title.smb_tours_objects_translation'}>
            <Datagrid>
                <TextField source={'id'} label={'field.id'} />
                <TextField source={'tour_object_id'} label={'field.tour_object_id'} />
                <ReferenceField source={'language_id'} reference={'smb_language'} label={'field.language'}>
                    <TextField source={'lang'} />
                </ReferenceField>
                <TextField source={'abstract'} label={'field.abstract'} />
                <TextField source={'description'} label={'field.description'} />
                <EditButton />
            </Datagrid>
        </List>
    );
};

export default ToursObjectsTranslationList;
