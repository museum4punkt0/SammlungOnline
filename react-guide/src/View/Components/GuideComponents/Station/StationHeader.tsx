import { Card, Divider, Grid, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';

import RouteDescriptionModule from '../ExapandableCard/RouteDescription/RouteDescriptionModule';
import { StationData } from '../../../../Services/Interfaces/GuideData';
import StationDirection from './Direction';
import useStyles from './stationHeader.jss';
import { useTranslation } from 'react-i18next';


function StationHeader({
    children,
    location,
    station,
    withObjects,
}: {
    children?: ReactElement | ReactElement[];
    location: string;
    station: StationData;
    withObjects: boolean;
}): ReactElement {

    const classes = useStyles();
    const { t } = useTranslation();
    // arrow
    // text


    return (
        <div id={station.id} style={{ width: '100%' }}>

            {/* Wegbeschreibung */}
            <RouteDescriptionModule
                image={station.map}
                location={location}
                level={station.level}
            >
                {station.directions.map((direction, index) => {
                    return (
                        <StationDirection key={direction.name} direction={direction} station={station} />
                    );
                })}
            </RouteDescriptionModule>

            {/* Objects */}
            {withObjects && (
                <React.Fragment>
                    {/* station header card */}
                    <Card
                        elevation={0}
                        className={classes.roomHeader}
                        style={{ height: '3.125rem', width: '100%', borderRadius: '0px', marginBottom: '1rem' }}
                    >
                        <Grid container direction='row' justify='space-between' wrap='nowrap' style={{ height: '100%' }}>
                            <Grid item container xs={10} alignContent='center'>
                                <Typography variant='h3' color='secondary' style={{ marginLeft: '.5rem' }}>{station.name}</Typography>
                            </Grid>
                            <Grid item container xs={2} alignContent='center' justify='flex-end'>
                                <Typography variant='h5' color='secondary' style={{ marginRight: '.5rem' }}>
                                    {station.objects.length} {station.objects.length > 1 ? t('objects') : t('object')}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Card>

                    {children}

                    <Divider className={classes.divider} />
                </React.Fragment>
            )}
        </div>
    );
}

export default StationHeader;
