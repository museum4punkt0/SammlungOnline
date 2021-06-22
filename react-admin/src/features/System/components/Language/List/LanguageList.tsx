import React from 'react';
import { ResourceComponentProps } from 'ra-core';

import { Datagrid, EditButton, List, TextField } from 'react-admin';

const LanguageList: React.FC<ResourceComponentProps> = (props) => {
    return (
        <List {...props} title={'title.smb_language'}>
            <Datagrid>
                <TextField source={'id'} label={'field.id'} />
                <TextField source={'lang'} label={'field.lang_iso'} />
                <EditButton />
            </Datagrid>
        </List>
    );
};

export default LanguageList;
