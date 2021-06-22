import React, { ReactElement } from 'react';
import useStyles from './loadingSpinner.jss';
import clsx from 'clsx';

function LoadingSpinner({ styleClasses = '' }: { styleClasses?: string }): ReactElement {
    const classes = useStyles();

    return (
        <div className={clsx(classes.spinner, styleClasses)}>
            <div className={classes.bounce1} />
            <div className={classes.bounce2} />
            <div className={classes.bounce3} />
        </div>
    );
}

export default LoadingSpinner;
