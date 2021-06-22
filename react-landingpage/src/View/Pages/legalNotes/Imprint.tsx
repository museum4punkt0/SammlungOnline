import React, { useState } from "react";
import { ReactElement } from "react";
import { Grid, Link, Typography } from "@material-ui/core";

import { Footer } from "smb-react-components-library";
import { copyright, _links } from "../../../footerLinks";
import { useTranslation } from "react-i18next";

import { imprintText } from "./htmlTexts";

import useStyles from "./imprint.jss";

function Imprint(): ReactElement {

    const classes = useStyles();
    const { t } = useTranslation();
    const [content, setContent] = useState(imprintText);
    const [key, setKey] = useState(0);

    // if(content === ""){
    //     fetch("/data/legalNotes/ImprintText.html")
    //     .then(response => response.text())
    //     .then(
    //         (result) => {
    //             console.log(result);
    //             setContent(result);
    //             setKey(key+1);
    //         },
    //         (error) => {
    //             console.log(error);
    //         }
    //     ).catch();
    // }

    function createMarkup() {
        return { __html: content };
    }

    return (
        <Grid className={classes.content}>
            <Grid container justify="center">
                <Grid
                    item
                    container
                    justify="space-between"
                    className={classes.text}
                >
                    <Grid item>
                        <div
                            key={Date()}
                            dangerouslySetInnerHTML={createMarkup()}
                            style={{ color: 'black' }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Imprint;