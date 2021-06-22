import React from 'react';
import { ResourceComponentProps } from 'ra-core';

import { Datagrid, DeleteButton, EditButton, List, ReferenceField, SimpleShowLayout, TextField } from 'react-admin';

const ToursObjectsList: React.FC<ResourceComponentProps> = (props) => {
    return (
        <List {...props} title={'title.smb_tours_objects'}>
            <SimpleShowLayout>
                <Datagrid>
                    <TextField source={'id'} label={'field.id'} />
                    <TextField source={'object_id'} label={'field.object_id'} />
                    <TextField source={'tour_id'} label={'field.tour_id'} />
                    <TextField source={'sequence'} label={'field.sequence'} />
                    <TextField source={'room'} label={'field.room'} />
                    <ReferenceField source="object_id" reference="smb_objects" link={false} label={'field.title'}>
                        <TextField source={'attribute_translations[0].value'} />
                    </ReferenceField>
                    <EditButton />
                    <DeleteButton />
                </Datagrid>
            </SimpleShowLayout>
        </List>
    );
};

export default ToursObjectsList;
