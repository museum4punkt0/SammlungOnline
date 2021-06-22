import React from 'react';
import { ResourceComponentProps } from 'ra-core';

import {
    BooleanField,
    Datagrid,
    DeleteButton,
    EditButton,
    ReferenceField,
    ReferenceManyField,
    Show,
    SimpleShowLayout,
    TextField,
} from 'react-admin';
import PreviewImage from '../../../../../shared/PreviewImage/PreviewImage';

const TopicsShow: React.FC<ResourceComponentProps> = (props) => {
    return (
        <Show {...props} title={'title.smb_topics'}>
            <SimpleShowLayout>
                <TextField source={'id'} label={'field.is'} />
                <BooleanField source={'has_slide'} label={'field.has_slide'} />
                <PreviewImage />
                <ReferenceManyField
                    reference={'smb_topics_translations'}
                    target={'topics_id'}
                    label={'field.translations'}
                >
                    <Datagrid>
                        <TextField source={'title'} label={'field.title'} />
                        <TextField source={'description'} label={'field.description'} />
                        <ReferenceField reference={'smb_language'} source={'language_id'} label={'field.language'}>
                            <TextField source={'lang'} />
                        </ReferenceField>
                        <EditButton />
                        <DeleteButton />
                    </Datagrid>
                </ReferenceManyField>
                <ReferenceManyField
                    reference={'smb_topics_objects'}
                    target={'topics_id'}
                    label={'field.linked_objects'}
                >
                    <Datagrid>
                        <TextField source={'object.id'} label={'field.mds_id'} />
                        <TextField source={'object.attribute_translations[0].value'} label={'field.title'} />
                    </Datagrid>
                </ReferenceManyField>
            </SimpleShowLayout>
        </Show>
    );
};

export default TopicsShow;
