import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import useStyles from './exhibitDescriptionGridRow.jss';

export interface IExhibitDescriptionGridRowProps {
  title: string;
  content: string;
}

export const ExhibitDescriptionGridRow: React.FC<IExhibitDescriptionGridRowProps> = ({ title, content }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={12} md={12}>
      <Grid className={classes.row} container>
        <Grid item xs={12} sm={4} md={5} className={classes.cell}>
          <Typography variant='h6' className={classes.title}>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={7} className={classes.cell}>
          <Typography className={classes.content}>{content}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
