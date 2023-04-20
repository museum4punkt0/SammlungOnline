import {
  Card,
  CardContent,
  Collapse,
  Grid,
  IconButton,
} from '@material-ui/core';
import React, { ReactElement, useState } from 'react';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import clsx from 'clsx';
import useStyles from './expandableCard.jss';

function CollapsibleCard({
  header,
  content,
  preview = false,
  // footer = false,
  previewContent,
  footer,
  hasFooter = false,
  expandCard,
}: {
  header: ReactElement | ReactElement[];
  content: ReactElement | ReactElement[];
  preview?: boolean;
  // footer?: boolean;
  previewContent?: ReactElement | ReactElement[];
  footer?: ReactElement | ReactElement[];
  hasFooter?: boolean;
  expandCard?: (state: boolean) => void;
}): ReactElement {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    if (expandCard) {
      expandCard(expanded);
    }
  };

  return (
    <Card
      elevation={0}
      style={{
        backgroundColor: 'white',
        width: '100%',
        borderRadius: '0px',
        marginBottom: '1rem',
      }}
    >
      {/* Card header */}
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        wrap="nowrap"
        style={{ minHeight: '3.125rem' }}
      >
        <Grid item container>
          <Grid item container alignContent="center">
            {header}
          </Grid>
        </Grid>
        {!hasFooter && (
          <Grid
            item
            container
            xs={1}
            alignContent="center"
            style={{ height: '3.125rem', marginRight: '.5rem' }}
          >
            <IconButton
              style={{ padding: '0' }}
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon
                fontSize="large"
                color="primary"
                className={classes.iconHover}
              />
            </IconButton>
          </Grid>
        )}
      </Grid>

      {/* Preview */}
      {preview && (
        <Collapse in={!expanded} timeout="auto" unmountOnExit>
          <CardContent
            style={{
              // height: '23.125rem',
              padding: 0,
            }}
          >
            {previewContent}
          </CardContent>
        </Collapse>
      )}

      {/* Content open */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {content}
      </Collapse>

      {hasFooter && (
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          wrap="nowrap"
        >
          <Grid item container xs={11}>
            <Grid item container alignContent="center">
              {footer}
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={1}
            direction="row"
            justifyContent="space-evenly"
            wrap="nowrap"
            style={{ marginRight: '.5rem' }}
          >
            <Grid
              item
              container
              alignContent="center"
              style={{ height: '3.125rem' }}
            >
              <IconButton
                style={{ padding: '0' }}
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon fontSize="large" color="primary" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Card>
  );
}

export default CollapsibleCard;
