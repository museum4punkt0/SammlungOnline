import React, { ReactElement } from 'react';
import clsx from 'clsx';

import useStyles from './slide.jss';

function Slide({
    image,
    children,
    slideClasses = '',
    onClick,
    onMouseMove,
}: {
    image: string;
    children?: React.ReactNode;
    slideClasses?: string;
    onClick?: (event: React.MouseEvent) => void;
    onMouseMove?: (event: React.MouseEvent) => void;
}): ReactElement {
    const classes = useStyles();

    return (
        <div
            className={clsx(classes.slide, slideClasses)}
            style={{ backgroundImage: `url(${image})` }}
            onClick={(event): void => onClick && onClick(event)}
            onMouseMove={(event): void => onMouseMove && onMouseMove(event)}
        >
            {children}
        </div>
    );
}

export default Slide;
