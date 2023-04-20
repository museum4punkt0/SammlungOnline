import React from 'react';

import { Hidden, IconButton, Link, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import useStyles from './detailNavigationLink.jss';

interface IDetailNavigationLinkProps {
  href: string;
  text: string;
  label?: string;
  ariaLabel?: string;
  align?: 'left' | 'right';
  Icon?: React.ReactNode;
}

const DetailNavigationLink: React.FC<IDetailNavigationLinkProps> = props => {
  const {
    href,
    ariaLabel,
    text: linkText,
    label: infoText,
    Icon,
    align = 'left',
  } = props;
  const classes = useStyles();

  const aria = ariaLabel ? ariaLabel : `${linkText}: ${infoText || ''}`;
  return (
    <Link component={RouterLink} to={href} className={classes.link} aria-label={aria}>
      <IconButton tabIndex={-1} className={classes.iconButton} color="inherit">
        {align === 'left' && Icon}
        <div className={classes.iconButtonContainer}>
          <Typography
            variant="overline"
            style={{ textAlign: align }}
            className={classes.linkText}
          >
            {linkText}
          </Typography>

          <Hidden smDown>
            <div tabIndex={-1} className={classes.infoTextWrapper}>
              <Typography style={{ textAlign: align }} className={classes.infoText}>
                {infoText}
              </Typography>
            </div>
          </Hidden>
        </div>
        {align === 'right' && Icon}
      </IconButton>
    </Link>
  );
};

export default DetailNavigationLink;
