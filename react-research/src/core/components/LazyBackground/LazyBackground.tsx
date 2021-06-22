import React, { ReactElement, useEffect, useState } from 'react';

import useStyles from './lazyBackground.jss';
import { LoadingSpinner } from 'smb-react-components-library';

export interface ILazyBackgroundProps {
    src: string;
    width: number;
    height: number;
    Fallback: ReactElement;
}

const LazyBackground: React.FC<ILazyBackgroundProps> = ({ src, width, height, Fallback }) => {
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [source, setSource] = useState('');

    const handleLoad = () => {
        setSource(src);
        setLoading(false);
    };

    const handleError = () => {
        setIsError(true);
    };

    const classes = useStyles();

    useEffect(() => {
        setIsError(false);
        setLoading(true);

        const img = new Image();
        img.src = src;

        img.addEventListener('load', handleLoad);
        img.addEventListener('error', handleError);

        return () => {
            img.removeEventListener('load', handleLoad);
            img.removeEventListener('error', handleError);
        };
    }, [src]);

    if (isError) {
        return Fallback;
    }

    if (loading) {
        return <LoadingSpinner />;
    }

    const styles = {
        height: height,
        width: width,
        backgroundImage: `url(${source})`,
    };

    return <div style={styles} className={classes.container} />;
};

export default LazyBackground;
