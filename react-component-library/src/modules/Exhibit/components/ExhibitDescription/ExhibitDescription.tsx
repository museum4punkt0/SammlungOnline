import React from 'react';

import { Divider, Grid, Typography } from '@material-ui/core';

import useStyles from './exhibitDescription.jss';

export interface IExhibitDescriptionProps {
  titles: string[];
  renderActions: () => React.ReactNode;
  renderAside: () => React.ReactNode;
  children?: React.ReactNode;
}

export const ExhibitDescription: React.FC<IExhibitDescriptionProps> = props => {
  const { titles, children, renderActions, renderAside } = props;

  const classes = useStyles();

  return (
    <div id='DescriptionModule' className={classes.container}>
      <Divider className={classes.separator} />
      <Grid container>
        <Grid item={true} xs={12} sm={12} lg={10} md={10}>
          {titles.map((title, i) => {
            if (!title) {
              return null;
            }

            return (
              <Typography key={i} variant='h3' className={classes.title}>
                {title}
              </Typography>
            );
          })}
        </Grid>
        <Grid container justify='flex-end' item={true} xs={12} sm={12} lg={2} md={2}>
          <div className={classes.actions}>{renderActions()}</div>
        </Grid>
        <Grid container spacing={0} direction='row' justify='space-between' className={classes.contentGrid}>
          <Grid item xs={12} sm={12} md={3}>
            {renderAside()}
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            {children}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
