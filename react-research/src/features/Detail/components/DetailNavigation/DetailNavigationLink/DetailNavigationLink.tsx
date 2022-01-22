import React from 'react';

import { Link as RouterLink } from 'react-router-dom';
import { Hidden, IconButton, Link, Tooltip, Typography } from '@material-ui/core';

import useStyles from './detailNavigationLink.jss';

interface IDetailNavigationLinkProps {
  href: string;
  text: string;
  label?: string;
  align?: 'left' | 'right';
  Icon?: React.ReactNode;
}

const DetailNavigationLink: React.FC<IDetailNavigationLinkProps> = (props) => {
  const { href, text, label, Icon, align = 'left' } = props;

  const classes = useStyles();

  return (
    <Link
      component={RouterLink}
      to={href}
      style={{ textAlign: align }}
      className={classes.link}
    >
      <IconButton tabIndex={-1} className={classes.iconButton} color="inherit">
        {Icon && align === 'left' && Icon}
        <Typography variant="overline" className={classes.linkText}>
          {text}
        </Typography>
        {Icon && align === 'right' && Icon}
      </IconButton>
      <Hidden smDown>
        <div tabIndex={-1} className={classes.navText}>
          <Tooltip placement="bottom" title={label ?? ''} arrow={true}>
            <Typography className={classes.navigationTextTypography}>{label}</Typography>
          </Tooltip>
        </div>
      </Hidden>
    </Link>
  );
};

export default DetailNavigationLink;
