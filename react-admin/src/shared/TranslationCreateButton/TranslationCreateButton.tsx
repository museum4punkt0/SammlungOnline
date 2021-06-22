import React, { Fragment, ReactElement, useState } from 'react';
import { Button, ReferenceInput, SelectInput, SimpleForm, useCreate, useNotify, useRefresh } from 'react-admin';
import IconContentAdd from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TranslationCreateToolbar from '../TranslationCreateToolbar/TranslationCreateToolbar';

function TranslationCreateButton({
    record,
    translationTable,
    saveInterceptor,
    dialogTitle,
    children,
}: {
    record?: Record<string, any>;
    translationTable: string;
    saveInterceptor: (values: Record<string, any>, parentRecord?: Record<string, any>) => Record<string, any>;
    dialogTitle: string;
    children: ReactElement | Array<ReactElement>;
}): ReactElement {
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [create] = useCreate(translationTable);
    const notify = useNotify();
    const refresh = useRefresh();

    const handleSubmit = async (values: Record<string, any>) => {
        const modifiedValues = saveInterceptor(values, record);
        return create(
            { payload: { data: modifiedValues } },
            {
                onSuccess: () => {
                    setShowDialog(false);
                    refresh();
                },
                onFailure: ({ error }: { error: any }) => {
                    notify(error.message, 'error');
                },
            },
        );
    };

    return (
        <Fragment>
            <Button
                onClick={() => {
                    setShowDialog(true);
                }}
                label="ra.action.create"
            >
                <IconContentAdd />
            </Button>
            <Dialog fullWidth={true} open={showDialog} onClose={() => setShowDialog(false)}>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <SimpleForm
                        resource={translationTable}
                        toolbar={
                            <TranslationCreateToolbar
                                onCancel={() => {
                                    setShowDialog(false);
                                }}
                            />
                        }
                        save={handleSubmit}
                    >
                        <ReferenceInput source={'language_id'} reference={'smb_language'} label={'field.translation'}>
                            <SelectInput optionText={'lang'} />
                        </ReferenceInput>
                        {children}
                    </SimpleForm>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
}

export default TranslationCreateButton;
