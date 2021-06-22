import React from 'react';

import { Grid } from '@material-ui/core';
import { ToursCarousel } from './components/ToursCarousel/ToursCarousel';
import { TopicsCarousel } from './components/TopicsCarousel/TopicsCarousel';
import SearchContainer from './components/SearchContainer/SearchContainer';

import useStyles from './searchPage.jss';

const SearchPage: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.content}>
            <SearchContainer />
            <Grid className={classes.topicsCarousel}>
                <TopicsCarousel />
            </Grid>
            <Grid className={classes.toursCarousel}>
                <ToursCarousel />
            </Grid>
        </div>
    );
};

export default SearchPage;
