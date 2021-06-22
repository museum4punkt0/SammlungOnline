import React, { ReactElement } from 'react';
import clsx from 'clsx';

import useStyles from './dots.jss';

function Dots({ activeIndex, length }: { activeIndex: number; length: number }): ReactElement {
    const classes = useStyles();

    const dots = [];
    for (let i = 0; i < length; i++) {
        if (i === activeIndex) {
            dots.push(<span key={i} className={clsx(classes.dot, classes.dotActive)} />);
        } else {
            dots.push(<span key={i} className={classes.dot} />);
        }
    }

    return <div className={classes.dots}>{dots}</div>;
}

export default Dots;
