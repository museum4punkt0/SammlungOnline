import React from 'react';

import Grid from '@material-ui/core/Grid';

import { ExhibitDescriptionGridRow } from './ExhibitDescriptionGridRow/ExhibitDescriptionGridRow';

import useStyles from './exhibitDescriptionGrid.jss';

export interface IGridItem {
  title: string;
  content: string;
}

export interface IExhibitDescriptionGridProps {
  items: IGridItem[];
}

export const ExhibitDescriptionGrid: React.FC<IExhibitDescriptionGridProps> = ({ items }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.container} container>
      {items.map((item, i) => {
        return <ExhibitDescriptionGridRow key={i} title={item.title} content={item.content} />;
      })}
    </Grid>
  );
};
