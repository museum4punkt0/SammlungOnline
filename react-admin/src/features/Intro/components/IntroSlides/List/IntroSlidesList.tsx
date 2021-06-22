import React from 'react';
import { ResourceComponentProps } from 'ra-core';

import {
    Datagrid,
    DeleteButton,
    EditButton,
    List,
    ReferenceManyField,
    ShowButton,
    SimpleList,
    TextField,
} from 'react-admin';
import PreviewImage from '../../../../../shared/PreviewImage/PreviewImage';

const IntroSlidesList: React.FC<ResourceComponentProps> = (props) => {
    return (
        <List {...props} title={'title.smb_intro_slides'}>
            <Datagrid>
                <TextField source={'id'} label={'field.id'} />
                <PreviewImage />
                <ReferenceManyField
                    reference={'smb_intro_slide_translations'}
                    target={'intro_slide_id'}
                    label={'field.translations'}
                >
                    <SimpleList primaryText={(record: Record<string, any>) => record.title} />
                </ReferenceManyField>
                <EditButton />
                <ShowButton />
                <DeleteButton />
            </Datagrid>
        </List>
    );
};

export default IntroSlidesList;
