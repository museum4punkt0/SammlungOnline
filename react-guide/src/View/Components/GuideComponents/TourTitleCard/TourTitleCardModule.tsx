import { CardMedia, Grid, Typography } from "@material-ui/core";
import React from "react";
import { ReactElement } from "react";
import useStyles from './tourTitleCardModule.jss';


function TourTitleCard(
    {
        title,
        abstract,
        subTitle,
        image,
        withImage = false
    }: {
        title: string,
        abstract: string,
        subTitle: string,
        image?: string,
        withImage?: boolean
    }
): ReactElement {
    const classes = useStyles();

    return (
        <div>
            {withImage && (
                <CardMedia
                    className={classes.content}
                    src='picture'
                    image={image}
                >
                    <Grid container justify='center' style={{ height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.55)', }}>

                        <Grid
                            item container
                            direction='column'
                            justify='center'
                            style={{ maxWidth: '80rem', margin: '0 0.5rem' }}
                        >
                            <Typography variant='h5'>{subTitle}</Typography>
                            <Typography variant='h1'>{title}</Typography>
                            <Grid container item direction='row' >
                                <Grid item xs={5}>
                                    <Typography variant='h5'>{abstract}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                </CardMedia>)
                ||
                (
                    <Grid container justify='center' style={{ height: '100%' }}>

                        <Grid
                            item container
                            direction='column'
                            justify='center'
                            style={{ maxWidth: '80rem' }}
                        >
                            <Typography variant='h5'>{subTitle}</Typography>
                            <Typography variant='h1'>{title}</Typography>
                            <Grid container item direction='row' >
                                <Grid item xs={5}>
                                    <Typography variant='h5'>{abstract}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
        </div>
    );
}

export default TourTitleCard;