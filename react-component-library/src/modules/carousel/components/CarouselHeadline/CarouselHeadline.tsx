import React from 'react';

import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import useStyles from './carousel-headline.jss';

export interface ICarouselHeadlineProps {
  href?: string;
  color?: string;
  children?: React.ReactNode;
}

const CarouselHeadlineComponent: React.FC<ICarouselHeadlineProps> = props => {
  const { children, href = '#', color = 'black' } = props;

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.headlineWrapper}>
        <div className={classes.headline}>
          <Divider className={classes.divider} style={{ backgroundColor: color }} />
          <Typography className={classes.title} style={{ color: color }} variant='h1'>
            <Link color='inherit' href={href}>
              {children}
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export const CarouselHeadline = CarouselHeadlineComponent;
