import React, { useState } from "react";
import { ReactElement } from "react";
import { Grid, Link, Typography } from "@material-ui/core";

import { Footer } from "smb-react-components-library";
import { copyright, _links } from "../../../footerLinks";
import { useTranslation } from "react-i18next";

import useStyles from "./accessibility.jss";
import { accessibilityText } from "./htmlTexts";


function Accessibility(): ReactElement {

    const classes = useStyles();
    const { t } = useTranslation();
    const [content, setContent] = useState(accessibilityText);

    // fetch("/data/legalNotes/AccessibilityText.html")
    //     .then(response => response.text())
    //     .then(
    //         (result) => {
    //             setContent(result);
    //         },
    //         (error) => {
    //         }
    //     ).catch();

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
                            dangerouslySetInnerHTML={createMarkup()}
                            style={{ color: 'black' }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Accessibility;