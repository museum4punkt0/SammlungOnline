import { Button, Card, CardContent, CardMedia, Grid, GridList, IconButton, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';

import clsx from 'clsx';
import useStyles from '../expandableCard.jss';

// import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { useTranslation } from 'react-i18next';
import { LinkBuilder } from '../../../../../Util/LinkBuilder';

function ObjectContent({
    image,
    geographicalReferences,
    materialAndTechnique,
    dimensionsAndWeight,
    identNr,
    abstract,
    description,
    objectLink,
    relatedTours,
    mobile = false
}: {
    image: string
    geographicalReferences: string;
    materialAndTechnique: string;
    dimensionsAndWeight: string;
    identNr: string;
    abstract: string;
    description?: string;
    objectLink?: string;
    relatedTours?: { link: void, title: string }[];
    mobile?: boolean;
}): ReactElement {
    const classes = useStyles();
    const { t } = useTranslation();
    const link = new LinkBuilder();

    const TypoBoldElement = ({ children }: { children: string }): ReactElement => {
        return <span className={clsx(classes.txtBold, classes.txtElement)}>{children}</span>;
    };

    const OpenObjectInNewTab = () => window.open(link.getObjectUrl(objectLink), "_newtab");

    if (mobile) {
        return (
            <CardContent
            // style={{ height: '40rem' }}
            >
                <Grid item container direction='column' wrap='nowrap'>
                    <Grid item container justify='center'>
                        <CardMedia
                            // className={classes.objectImage}
                            style={{ height: '15.563rem', width: '11.188rem', backgroundPosition: 'top', }}
                            src='picture'
                            image={image}
                        />
                    </Grid>
                </Grid>

                <Grid item container direction='column' alignContent='flex-start' justify='flex-start'>

                    <Grid item style={{ margin: '1rem 0' }}>
                        <Typography>{geographicalReferences}</Typography>
                        <Typography>{materialAndTechnique}</Typography>
                        <Typography>{dimensionsAndWeight}</Typography>
                        <Typography>{identNr}</Typography>
                    </Grid>

                    {abstract && (
                        <Grid item>
                            <TypoBoldElement>{abstract}</TypoBoldElement>
                        </Grid>
                    )}

                    {description && (
                        <Grid item>
                            <Typography style={{ marginTop: '1rem', width: '100%', whiteSpace: 'pre-line' }}>{description}</Typography>
                        </Grid>
                    )}

                    {(objectLink || relatedTours) && (
                        <Grid item container direction='column' style={{ marginTop: '3rem' }}>
                            {objectLink && (
                                <Button
                                    style={{ padding: '0' }}
                                    color={'inherit'}
                                    onClick={OpenObjectInNewTab}//link.toObject(objectLink)}
                                >
                                    <Grid container direction='row' justify='flex-start' wrap='nowrap'>
                                        <Grid item container alignContent='center'>
                                            <Typography variant='h4'>{t('object details')}</Typography>
                                        </Grid>
                                        <Grid item container alignContent='center'>
                                            <ArrowRightAltIcon fontSize={'large'} />
                                        </Grid>
                                    </Grid>
                                </Button>
                            )}


                            {/* todo link */}
                            {relatedTours &&
                                relatedTours.map((route) => {
                                    return (

                                        <Card elevation={0} onClick={() => route.link}>
                                            <CardContent>
                                                <Grid container direction='row' justify='flex-start' wrap='nowrap'>
                                                    <Grid item container alignContent='center'>
                                                        <Typography variant='h4'>{route.title}</Typography>
                                                    </Grid>
                                                    <Grid item container alignContent='center'>
                                                        <ArrowRightAltIcon fontSize={'large'} />
                                                    </Grid>
                                                </Grid>

                                            </CardContent>
                                        </Card>
                                    );
                                })
                            }
                        </Grid>
                    )}
                </Grid>
                {/* </Grid> */}
            </CardContent>
        );
    }




    return (
        <CardContent>
            <Grid container direction='row' style={{ height: '100%' }}>
                {/* image */}
                <Grid item container xs={6} direction='column' wrap='nowrap' style={{ padding: '1rem' }}>
                    <Grid item container justify='center'>
                        <CardMedia
                            className={classes.objectImage}
                            src='picture'
                            image={image}
                        />
                    </Grid>
                </Grid>
                {/* Object Data */}
                <Grid item container xs={6} direction='column' alignContent='flex-start' justify='flex-start'>

                    <Grid item>
                        <Typography>{geographicalReferences}</Typography>
                        <Typography>{materialAndTechnique}, {dimensionsAndWeight}</Typography>
                        <Typography>{identNr}</Typography>
                    </Grid>

                    <Grid item style={{ height: '17.313rem', marginTop: '1rem' }}>
                        <GridList className={classes.list}>
                            <TypoBoldElement>{abstract}</TypoBoldElement>
                            <Typography style={{ marginTop: '1rem', whiteSpace: 'pre-line', width: '100%' }}>{description}</Typography>
                        </GridList>
                    </Grid>

                    <Grid item container direction='column' style={{ marginTop: '3rem' }}>
                        <Button
                            style={{ padding: '0' }}
                            color={'inherit'}
                            onClick={() => window.open(link.getObjectUrl(objectLink), "_newtab")}//link.toObject(objectLink)}
                            className={classes.buttonHover}
                        >
                            <Grid container direction='row' justify='flex-start' wrap='nowrap'>
                                <Grid item container alignContent='center'>
                                    <Typography variant='h4'>{t('object details')}</Typography>
                                </Grid>
                                <Grid item container alignContent='center'>
                                    <ArrowRightAltIcon fontSize={'large'} className={classes.iconHover} />
                                </Grid>
                            </Grid>
                        </Button>


                        {/* todo link */}
                        {relatedTours &&
                            relatedTours.map((route) => {
                                return (

                                    <Card elevation={0} onClick={() => route.link}>
                                        <CardContent>
                                            <Grid container direction='row' justify='flex-start' wrap='nowrap'>
                                                <Grid item container alignContent='center'>
                                                    <Typography variant='h4'>{route.title}</Typography>
                                                </Grid>
                                                <Grid item container alignContent='center'>
                                                    <ArrowRightAltIcon fontSize={'large'} />
                                                </Grid>
                                            </Grid>

                                        </CardContent>
                                    </Card>
                                );
                            })
                        }
                    </Grid>
                </Grid>
            </Grid>
        </CardContent>
    );
}

export default ObjectContent;
