import React, { useState } from 'react';
import { ReactElement } from 'react';
import { Grid } from '@material-ui/core';
import useStyles from './privacy.jss';
import { privacyText } from './htmlTexts';

function Privacy(): ReactElement {
    const classes = useStyles();
    const [content] = useState(privacyText);

    function createMarkup() {
        return { __html: content };
    }

    return (
        <Grid className={classes.content}>
            <Grid container justify="center">
                <Grid item container justify="space-between" className={classes.text}>
                    <Grid item>
                        <div dangerouslySetInnerHTML={createMarkup()} style={{ color: 'black' }} />
                    </Grid>
                    <iframe
                        className={classes.iframe}
                        src="https://admin.smb.museum/matomo/index.php?module=CoreAdminHome&action=optOut&language=de&backgroundColor=&fontColor=&fontSize=16px&fontFamily=Arial"
                    ></iframe>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Privacy;
