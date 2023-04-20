import React from 'react';

import { Link, Typography } from '@material-ui/core';

import useStyles from './headerLink.jss';
import { IHeaderLinkProps } from '../../types/interfaces';

const HeaderLink: React.FC<IHeaderLinkProps> = (props) => {
  const {
    selected,
    selectedColor,
    title,
    subtitle,
    href,
    onMouseOver,
    onMouseLeave,
  } = props;

  const classes = useStyles(props)();

  const mouseOver = () => {
    !selected && onMouseOver && onMouseOver();
  };
  const mouseLeave = () => {
    !selected && onMouseLeave && onMouseLeave();
  };

  return (
    <Link
      href={href}
      className={classes.link}
      onMouseOver={mouseOver}
      onMouseLeave={mouseLeave}
      onFocus={mouseOver}
      onBlur={mouseLeave}
    >
      <Typography
        variant="h1"
        component="h2"
        className={classes.title}
        style={{ color: selected ? selectedColor : '' }}
      >
        {title}
      </Typography>
      <Typography
        variant="subtitle1"
        component="p"
        className={classes.subtitle}
        style={{ color: selected ? selectedColor : '' }}
      >
        {subtitle}
      </Typography>
    </Link>
  );
};

export default HeaderLink;
