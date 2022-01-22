import React from 'react';

import { Typography } from '@material-ui/core';

import useStyles from './exhibitAsideText.jss';

interface IExhibitAsideTextProps {
  title: string;
  content: string;
}

const ExhibitAsideText: React.FC<IExhibitAsideTextProps> = ({ title, content }) => {
  const classes = useStyles();

  return (
    <Typography variant="body1" className={classes.container}>
      <span className={classes.content}>{title} </span>
      {content}
    </Typography>
  );
};

export default ExhibitAsideText;
