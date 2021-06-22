import React from 'react';
import { ResourceComponentProps } from 'ra-core';

import {
    Datagrid,
    DeleteButton,
    EditButton,
    List,
    ReferenceManyField,
    RichTextField,
    SimpleList,
    TextField,
} from 'react-admin';
import PreviewImage from '../../../../../shared/PreviewImage/PreviewImage';

const ToursList: React.FC<ResourceComponentProps> = (props) => {
    return (
        <List {...props} title={'title.smb_tours'}>
            <Datagrid>
                <TextField source={'id'} label={'field.id'} />
                <TextField source={'number'} label={'field.number'} />
                <ReferenceManyField reference={'smb_tours_translation'} target={'tour_id'} label={'field.translations'}>
                    <SimpleList
                        primaryText={(record: Record<string, any>) => record.title}
                        secondaryText={(record: Record<string, any>) => record.subtitle}
                    />
                </ReferenceManyField>
                <PreviewImage />
                <TextField source={'preview_image'} label={'field.preview_image'} />
                <TextField source={'museum'} label={'field.museum'} />
                <TextField source={'duration'} label={'field.duration'} />
                <RichTextField source={'directions'} label={'field.directions'} />
                <EditButton />
                <DeleteButton />
            </Datagrid>
        </List>
    );
};

export default ToursList;
