import React from 'react';
import { ResourceComponentProps } from 'ra-core';

import {
    BooleanField,
    Datagrid,
    EditButton,
    List,
    ReferenceManyField,
    ShowButton,
    SimpleList,
    TextField,
} from 'react-admin';
import PreviewImage from '../../../../../shared/PreviewImage/PreviewImage';

const TopicsList: React.FC<ResourceComponentProps> = (props) => {
    return (
        <List {...props} title={'title.smb_topics'}>
            <Datagrid>
                <TextField source={'id'} label={'field.id'} />
                <BooleanField source={'has_slide'} label={'field.has_slide'} />
                <PreviewImage />
                <ReferenceManyField
                    reference={'smb_topics_translations'}
                    target={'topics_id'}
                    label={'field.translations'}
                >
                    <SimpleList
                        primaryText={(record: Record<string, any>) => record.title}
                        secondaryText={(record: Record<string, any>) => record.description}
                    />
                </ReferenceManyField>
                <EditButton />
                <ShowButton />
            </Datagrid>
        </List>
    );
};

export default TopicsList;
