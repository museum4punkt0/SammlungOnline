import { Card, CardContent, CardMedia, Checkbox, Collapse, Grid, GridList, IconButton, TextareaAutosize, Typography } from '@material-ui/core';
import React, { ReactElement, useState } from 'react';

import MapIcon from '@material-ui/icons/Map';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import classes from '*.module.css';
import clsx from 'clsx';
import useStyles from './expandableCard.jss';
import { Link } from 'react-router-dom';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';

import ZoomInIcon from '@material-ui/icons/ZoomIn';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import CloseIcon from '@material-ui/icons/Close';

// todo remove
import testImage from "../../../../assets/images/guide/guide_01/objects/image_01_1265x2013.png"
import testImage2 from "../../../../assets/images/guide/guide_01/objects/images_05_879x1900.png"

import testMapImage from "../../../../assets/images/guide/maps/bode_museum_EG.png"

function ExpandableCard({
    objectCard = false,
    routeDescription = false,
    img = false
}: {
    objectCard?: boolean;
    routeDescription?: boolean;
    img?: boolean;
}): ReactElement {
    const classes = useStyles();

    const [expanded, setExpanded] = useState(false);
    const [expandedMap, setExpandedMap] = useState(false);

    const handleExpandMapClick = () => {
        setExpandedMap(!expandedMap);
        setExpanded(false);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
        setExpandedMap(false);
    };

    const TypoBoldElement = ({ children }: { children: string }): ReactElement => {
        return <span className={clsx(classes.txtBold, classes.txtElement)}>{children}</span>;
    };

    const TypoElement = ({ title, content }: { title: string; content: string }): ReactElement => {
        return (
            <Typography variant={'body1'} className={clsx(classes.contrastText)}>
                <TypoBoldElement>{`${title} `}</TypoBoldElement>
                {content}
            </Typography>
        );
    };

    // closed
    // header
    // title
    // share
    // select
    // map
    // expand button
    // preview image

    // opend
    // header
    // title
    // share
    // select
    // map
    // shrink button
    // content

    // content
    // object
    // image
    // from where
    // material + mase
    // inventar
    // object description

    // object detail page
    // other routes

    // map
    //open: header -> standortuebersicht {ort} + close button
    // backgroude = hint color
    // map image
    // zoom button
    // chane map? (< {ebenen name} >)

    // route description
    //closed: header -> person icon Wegbeschreibung oeffnen map icaon expand icon
    //open: header -> person icon Wegbeschreibung schliessen map icaon shrink icon
    // content:
    // room title | order | guide Station | other guide link


    return (
        <Card
            elevation={0}
            style={{ backgroundColor: 'white', width: '100%', borderRadius: '0px', marginBottom: '1rem' }}
        >

            <Collapse in={!expandedMap} timeout="auto" unmountOnExit>
                {/* Card header */}
                <Grid item container direction='row' justify='space-between' wrap='nowrap'>
                    <Grid item container xs={10} direction='row' justify='flex-start' wrap='nowrap'>
                        {/* route description */}
                        {/* move icon */}
                        {routeDescription && (
                            <Grid item container xs alignContent='center'>
                                <DirectionsWalkIcon color='primary' fontSize='large' />
                            </Grid>
                        )}
                        {/* title */}
                        <Grid item container alignContent='center' style={{ paddingLeft: '1rem' }} >
                            <Typography noWrap variant='h4'>ExpandableCard Title</Typography>
                        </Grid>

                        {/* changes */}
                    </Grid>
                    <Grid item container xs={2} direction='row' justify='space-evenly' wrap='nowrap'>
                        {/* object */}
                        {/* share icon */}
                        {objectCard && (
                            <React.Fragment>
                                <Grid item container alignContent='center' justify='center'>
                                    <ShareOutlinedIcon color='primary' />
                                </Grid>

                                {/* chackbox */}
                                <Grid item container alignContent='center'>
                                    <Checkbox
                                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                                        classes={{
                                            root: classes.root,
                                            checked: classes.checked
                                        }}
                                        value="#ffffff"
                                    />
                                    {/* <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />   */}
                                </Grid>
                            </React.Fragment>
                        )}
                        {/* route description */}
                        {/* map icon */}
                        {routeDescription && (
                            <Grid item container alignContent='center'>
                                <IconButton
                                    className={clsx(classes.expandMap, {
                                        [classes.expandMapOpen]: expandedMap,
                                    })}
                                    onClick={handleExpandMapClick}
                                    aria-expanded={expandedMap}
                                    aria-label="show more"
                                >
                                    <MapIcon color='primary' />
                                </IconButton>
                            </Grid>
                        )}


                        {/* expand icon */}
                        <Grid item container alignContent='center'>
                            {/* <ExpandMoreIcon fontSize='large' color='primary'/> */}
                            <IconButton
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon fontSize='large' color='primary' />
                            </IconButton>
                        </Grid>

                        {/* changes */}
                    </Grid>
                </Grid>
            </Collapse>


            <Collapse in={expandedMap} timeout="auto" unmountOnExit>
                <Card
                    elevation={0}
                    className={classes.mapContainer}
                    style={{ width: '100%', borderRadius: '0px' }}
                >
                    <Grid item container direction='row' justify='space-between' wrap='nowrap'>
                        <Grid item container xs={10} direction='column' justify='flex-start' wrap='nowrap'>
                            {/* title */}
                            <Grid item container alignContent='center' style={{ paddingLeft: '1rem' }} >
                                <Typography color='secondary' noWrap variant='h4'>StandortUebersicht</Typography>
                            </Grid>
                            <Grid item container alignContent='center' style={{ paddingLeft: '1rem' }} >
                                <Typography color='secondary' noWrap variant='h4'>Bode-Museum</Typography>
                            </Grid>
                        </Grid>
                        <Grid item container xs={2} direction='row' justify='space-evenly' wrap='nowrap'>

                            {/* route description */}
                            {/* map icon */}
                            {routeDescription && (
                                <Grid item container alignContent='center'>
                                    <IconButton
                                        className={clsx(classes.expandMap, {
                                            [classes.expandMapOpen]: expandedMap,
                                        })}
                                        onClick={handleExpandMapClick}
                                        aria-expanded={expandedMap}
                                        aria-label="show more"
                                    >
                                        <CloseIcon color='secondary' fontSize='large' />
                                    </IconButton>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Card>
            </Collapse>

            {objectCard && (
                <React.Fragment>
                    {/* Content closed */}
                    {/* Preview */}
                    <Collapse in={!expanded} timeout="auto" unmountOnExit>
                        <CardContent style={{ height: '23.125rem', padding: 0, }}>
                            {img && (
                                <CardMedia

                                    className={classes.objectPreviewImage}
                                    src='picture'
                                    image={testImage}
                                />
                            ) || (
                                    <CardMedia

                                        className={classes.objectPreviewImage}
                                        src='picture'
                                        image={testImage2}
                                    />
                                )}


                        </CardContent>
                    </Collapse>
                    {/* Content open */}
                    {/* open expanded */}
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent style={{ height: '34.25rem' }}>
                            <Grid container direction='row' style={{ height: '100%' }}>
                                {/* image */}
                                <Grid item xs={6}>
                                    {img && (
                                        <CardMedia
                                            className={classes.objectImage}
                                            src='picture'
                                            image={testImage}
                                        />
                                    ) || (
                                            <CardMedia
                                                className={classes.objectImage}
                                                src='picture'
                                                image={testImage2}
                                            />
                                        )}

                                </Grid>
                                <Grid item container xs={6} direction='column' alignContent='space-between' justify='space-between'>

                                    <Grid item>
                                        <Typography>Konstantinopel</Typography>
                                        <Typography>Elfenbein, 17,6 x 12,8 cm</Typography>
                                        <Typography>Inv. Nr. 574</Typography>
                                    </Grid>

                                    <Grid item>
                                        <GridList className={classes.list}>
                                            <TypoBoldElement>
                                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.
                                    </TypoBoldElement>

                                            <Typography style={{ width: '100%' }}>
                                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

                                                Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                                    </Typography>
                                        </GridList>
                                    </Grid>

                                    <Grid item container direction='column'>
                                        <Link to='' style={{ width: '100%' }}>
                                            <Grid container direction='row' justify='flex-start' wrap='nowrap'>
                                                <Grid item container alignContent='center'>
                                                    <Typography variant='h4'>Object Details</Typography>
                                                </Grid>
                                                <Grid item container alignContent='center'>
                                                    <TrendingFlatIcon fontSize='large' color='primary' />
                                                </Grid>
                                            </Grid>
                                        </Link>
                                        <Link to='' style={{ width: '100%' }}>
                                            <Grid container direction='row' justify='flex-start' wrap='nowrap'>
                                                <Grid item container alignContent='center'>
                                                    <Typography variant='h4'>Teil von 2</Typography>
                                                </Grid>
                                                <Grid item container alignContent='center'>
                                                    <TrendingFlatIcon fontSize='large' color='primary' />
                                                </Grid>
                                            </Grid>
                                        </Link>
                                    </Grid>

                                </Grid>
                            </Grid>

                        </CardContent>
                    </Collapse>
                </React.Fragment>
            )}

            {routeDescription && (
                <React.Fragment>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent style={{ padding: 0, }}>
                            <TypoBoldElement>Raum 111</TypoBoldElement>
                            <Typography>Raum 111 2. Station</Typography>
                            <Typography>Raum 111 2. Station</Typography>
                        </CardContent>
                    </Collapse>
                    <Collapse in={expandedMap} className={classes.mapContainer} timeout="auto" unmountOnExit>
                        <CardContent style={{ height: '23.125rem', padding: 0, }}>
                            <Grid container justify='center'>
                                <CardMedia
                                    className={classes.objectMapImage}
                                    src='picture'
                                    image={testMapImage}
                                />
                            </Grid>
                        </CardContent>
                        <Grid container justify='center'>
                            <ZoomInIcon color='secondary' fontSize='large' />
                        </Grid>
                        <Grid container justify='center'>
                            <ArrowBackIosIcon color='secondary' fontSize='large' />
                            <Typography variant='h4' color='secondary'>Erdgeschoss</Typography>
                            <ArrowForwardIosIcon color='secondary' fontSize='large' />
                        </Grid>
                    </Collapse>
                </React.Fragment>
            )}

            {/* open map */}
            {/* replace normal card */}
            {/* map header */}
            <Grid>
                {/* title */}
                {/* close icon */}
            </Grid>



        </Card>
    );
}

export default ExpandableCard;
