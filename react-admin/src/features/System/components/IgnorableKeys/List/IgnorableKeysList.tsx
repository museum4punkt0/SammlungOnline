import React from 'react';
import { ResourceComponentProps } from 'ra-core';

import { Datagrid, List, TextField } from 'react-admin';

const IgnorableKeysList: React.FC<ResourceComponentProps> = (props) => {
    return (
        <List {...props} title={'title.smb_ignoreable_keys'}>
            <Datagrid>
                <TextField source={'id'} label={'field.id'} />
                <TextField source={'key'} label={'field.key'} />
            </Datagrid>
        </List>
    );
};

export default IgnorableKeysList;
