import { Button, Collapse, Typography } from '@material-ui/core';
import React, { ReactElement, useState } from 'react';

import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import useStyles from './tourDescription.jss';

function TourDescription({
    location,
    duration,
    objectsCount,
    abstract,
    description,
}: {
    location: string,
    duration: string,
    objectsCount: number,
    abstract: string,
    description: string,
}): ReactElement {

    const { t } = useTranslation();
    const classes = useStyles();
    const noDataAvailableText = t('object desc no data available');

    const TypoBoldElement = ({ children }: { children: string }): ReactElement => {
        return <span className={clsx(classes.txtBold, classes.txtElement)}>{children}</span>;
    };
    const TypoElement = ({ title, content }: { title: string; content: string }): ReactElement => {
        return (
            <Typography variant={'body1'}>
                <TypoBoldElement>{`${title} `}</TypoBoldElement>
                {content}
            </Typography>
        );
    };

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    // ort
    // dauer
    // objects
    // descriptionText
    // expandeble text

    return (
        <div style={{ marginTop: '3rem', marginBottom: '1rem' }}>
            <TypoElement
                title={t('place') + ':'}
                content={
                    location ? location :
                        noDataAvailableText
                }
            />
            <TypoElement
                title={t('duration') + ':'}
                content={
                    duration ? duration.toString() :
                        noDataAvailableText
                }
            />
            <TypoElement
                title={t('objects') + ':'}
                content={
                    (objectsCount !== 0) ? objectsCount.toString() :
                        noDataAvailableText
                }
            />
            <br />
            <TypoBoldElement>
                {abstract}
            </TypoBoldElement>
            <br />
            <br />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Typography>
                    {description}
                </Typography>
            </Collapse>

            <Button disableRipple onClick={handleExpandClick} className={classes.expandButton} style={{ padding: '0' }} tabIndex={0}>
                <Typography variant='body2' className={classes.contrastText}>
                    {expanded ? t('show less') : t('show more')}
                </Typography>
            </Button>
        </div>
    );
}

export default TourDescription;
