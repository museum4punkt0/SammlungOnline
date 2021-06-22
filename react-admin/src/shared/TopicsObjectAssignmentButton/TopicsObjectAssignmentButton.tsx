import {
    Button,
    SaveButton,
    Toolbar,
    SimpleForm,
    AutocompleteInput,
    useCreate,
    useNotify,
    useRefresh,
    useDataProvider,
} from 'react-admin';

import React, { ReactElement, useState, Fragment, useCallback } from 'react';
import IconContentAdd from '@material-ui/icons/Add';
import IconCancel from '@material-ui/icons/Cancel';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

// TODO: Möglicherweise kann das hier auch generischer implementiert werden
const TopicsObjectAssignmentToolbar = ({
    onCancel,
    ...props
}: {
    onCancel: () => void;
    props?: Record<string, any>;
}) => {
    return (
        <Toolbar {...props}>
            <SaveButton submitOnEnter={true} />
            <Button label={'ra.action.cancel'} onClick={onCancel}>
                <IconCancel />
            </Button>
        </Toolbar>
    );
};

const getSelectOptions = async (
    searchText: string,
    dataProvider: any,
): Promise<Array<{ id: number; value: string }>> => {
    return new Promise<Array<{ id: number; value: string }>>((resolve) => {
        dataProvider
            .getList('smb_objects', {
                pagination: {
                    page: 1,
                    perPage: 10,
                },
                filter: {
                    attribute_translations: {
                        format: 'hasura-raw-query',
                        value: {
                            _and: {
                                attribute_key: {
                                    _eq: 'ObjObjectTitleGrp.TitleTxt',
                                },
                                language: {
                                    lang: {
                                        // TODO: Config
                                        _eq: 'de',
                                    },
                                },
                                value: { _ilike: '%'.concat(searchText).concat('%') },
                            },
                        },
                    },
                },
            })
            .then(({ data }: { data: Array<Record<string, any>> }): void => {
                const selectOptions: Array<{ id: number; value: string }> = [];
                for (const obj of data) {
                    selectOptions.push({
                        id: obj.id,
                        value: obj.attribute_translations[0]?.value,
                    });
                }

                resolve(selectOptions);
            });
    });
};

const ObjectSelectInput = (): ReactElement => {
    const dataProvider = useDataProvider();
    const [selectOptions, setSelectOptions] = useState<Array<{ id: number; value: string }>>([]);
    const [shouldRenderSuggestions, setShouldRenderSuggestions] = useState<boolean>(true);
    const [inputText, setInputText] = useState<string>('');

    const filter = (searchText: string): void => {
        if (searchText.length < 3) {
            return;
        }
        setShouldRenderSuggestions(false);

        getSelectOptions(searchText, dataProvider).then((value) => {
            setInputText(searchText);
            setSelectOptions(value);
            if (value.length !== 0) {
                setShouldRenderSuggestions(true);
            }

            // This is a bad hack, but as along as the AutocompleteInput of ra is not able to keep the filter-value if
            // the choices change or receive a default value for filter, this seems to be the only way to update the
            // choices and keep the filter value. It is important to update the value after all updates of the
            // autocomplete component have been set.
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            document.getElementById('objects_id').value = searchText;
        });
    };
    const debouncedFilter = useCallback(filter, [inputText]);

    return (
        <AutocompleteInput
            setFilter={debouncedFilter}
            choices={selectOptions}
            source={'objects_id'}
            optionText={'value'}
            optionValue={'id'}
            fullWidth={true}
            shouldRenderSuggestions={() => shouldRenderSuggestions}
        />
    );
};

function TopicsObjectAssignmentButton(record: Record<string, any>): ReactElement {
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [create] = useCreate('smb_topics_objects');
    const notify = useNotify();
    const refresh = useRefresh();
    const topicsId: number = parseInt(record.record.id, 10);

    const handleSubmit = async (values: Record<string, any>) => {
        values.topics_id = topicsId;
        return create(
            { payload: { data: values } },
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
                label="ra.action.add"
            >
                <IconContentAdd />
            </Button>
            <Dialog fullWidth={true} open={showDialog} onClose={() => setShowDialog(false)}>
                <DialogTitle>Füge weitere Objekte dem Topic hinzu</DialogTitle>
                <DialogContent>
                    <SimpleForm
                        resource={'smb_topics_objects'}
                        toolbar={<TopicsObjectAssignmentToolbar onCancel={() => setShowDialog(false)} />}
                        save={handleSubmit}
                    >
                        <ObjectSelectInput />
                    </SimpleForm>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
}

export default TopicsObjectAssignmentButton;
