import {
  Card,
  Checkbox,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import React, { ReactElement } from 'react';

import MapIcon from '@material-ui/icons/Map';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';

import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';

import useStyles from './collapsibleCardHeader.jss';

function CollapsibleCardHeader({
  title = '',
  share = false,
  checkbox = false,
  checkboxStorage = '',
  routeDescription = false,
  map = false,
  onShare,
  onMapClick,
}: {
  title: string;
  share?: boolean;
  checkbox?: boolean;
  routeDescription?: boolean;
  map?: boolean;
  checkboxStorage?: string;
  onShare?: () => void;
  onMapClick?: () => void;
}): ReactElement {
  const classes = useStyles();

  const [checked, setChecked] = React.useState(
    window.sessionStorage.getItem(checkboxStorage) != null
      ? window.sessionStorage.getItem(checkboxStorage) === 'true'
      : false,
  );

  // setChecked(window.localStorage.getItem(checkboxStorage) != null ? window.localStorage.getItem(checkboxStorage) === "true" : false);

  const toggleCheck = () => {
    setChecked(!checked);
  };

  const handleCheck = (event: {
    target: { checked: React.SetStateAction<boolean> };
  }) => {
    setChecked(event.target.checked);
    sessionStorage.setItem(
      checkboxStorage,
      event.target.checked ? 'true' : 'false',
    );
  };

  return (
    <Card
      elevation={0}
      style={{
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        borderRadius: '0px',
      }}
    >
      {/* Card header */}
      <Grid
        container
        direction="row"
        justify="center"
        style={{ height: '100%' }}
      >
        <Grid
          item
          container
          xs={10}
          direction="row"
          justify="flex-start"
          wrap="nowrap"
        >
          {/* move icon */}
          {routeDescription && (
            <Grid item container xs alignContent="center">
              <DirectionsWalkIcon color="primary" fontSize="large" />
            </Grid>
          )}

          {/* title */}
          <Grid
            item
            container
            alignContent="center"
            style={{ paddingLeft: '1rem' }}
          >
            {routeDescription ? (
              <Typography variant="body2" color="primary">
                {title}
              </Typography>
            ) : (
              <Typography variant="h4">{title}</Typography>
            )}
          </Grid>
        </Grid>

        <Grid item container xs={2} justify="flex-end" wrap="nowrap">
          {/* share icon */}
          {share && (
            <Grid item container alignContent="center" justify="center">
              <IconButton
                onClick={onShare}
                // aria-expanded={expandedMap}
                aria-label="show more"
              >
                <ShareOutlinedIcon
                  color="primary"
                  className={classes.iconHover}
                />
              </IconButton>
            </Grid>
          )}

          {/* chackbox */}
          {checkbox && (
            <Grid
              item
              container
              alignContent="center"
              style={{ height: '3.125rem', marginRight: '.5rem' }}
            >
              <Grid item container justify="flex-end">
                <button
                  onClick={toggleCheck}
                  className={classes.checkboxButton}
                >
                  <Checkbox
                    tabIndex={-1}
                    inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                    className={classes.checkbox}
                    classes={{
                      root: classes.root,
                      checked: classes.checked,
                    }}
                    // value="#ffffff"
                    checked={checked}
                    onChange={handleCheck}
                  />
                </button>
              </Grid>
            </Grid>
          )}

          {/* map icon */}
          {map && (
            <Grid
              item
              container
              alignContent="center"
              style={{ height: '3.125rem', marginRight: '.5rem' }}
            >
              <Grid container justify="flex-end">
                <IconButton
                  className={classes.expandMap}
                  onClick={onMapClick}
                  // aria-expanded={expandedMap}
                  aria-label="show more"
                >
                  <MapIcon color="primary" className={classes.iconHover} />
                </IconButton>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Card>
  );
}

export default CollapsibleCardHeader;
