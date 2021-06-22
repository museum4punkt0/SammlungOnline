import React, { ReactElement } from 'react';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';

import useStyles from './objectDescriptionGridRow.jss';

function ObjectDescriptionGridRow({
    title,
    content,
    colored = true,
}: {
    title: string;
    content: string;
    colored: boolean;
}): ReactElement {
    const classes = useStyles();

    return (
        <Grid item={true} xs={12} sm={12} md={12} className={clsx({ [classes.rowColored]: colored })}>
            <Grid container={true}>
                <Grid item={true} xs={12} sm={4} md={5} className={clsx(classes.cell)}>
                    <Typography variant={'h6'} className={clsx(classes.boldText, classes.contrastText)}>
                        {title}
                    </Typography>
                </Grid>
                <Grid item={true} xs={12} sm={8} md={7} className={clsx(classes.cell)}>
                    {content.split('\n').map((line: string, index: number) => (
                        <Typography key={index} className={clsx(classes.contrastText)}>
                            {line.trim()}
                        </Typography>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ObjectDescriptionGridRow;
