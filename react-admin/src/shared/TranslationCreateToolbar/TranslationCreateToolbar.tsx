import { Button, SaveButton, Toolbar } from 'react-admin';
import IconCancel from '@material-ui/icons/Cancel';
import React from 'react';

const TranslationCreateToolbar = ({ onCancel, ...props }: { onCancel: () => void; props?: Record<string, any> }) => {
    return (
        <Toolbar {...props}>
            <SaveButton submitOnEnter={true} />
            <Button label={'ra.action.cancel'} onClick={onCancel}>
                <IconCancel />
            </Button>
        </Toolbar>
    );
};

export default TranslationCreateToolbar;
