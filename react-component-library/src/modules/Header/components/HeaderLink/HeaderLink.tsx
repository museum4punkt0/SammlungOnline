import React from 'react';

import { Link, Typography } from '@material-ui/core';

import useStyles from './headerLink.jss';

export interface IHeaderLinkProps {
  title: string;
  subtitle: string;
  href: string;
  color: string;
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
}

const HeaderLink: React.FC<IHeaderLinkProps> = props => {
  const { title, subtitle, href, onMouseOver, onMouseLeave } = props;

  const classes = useStyles(props)();

  const mouseOver = () => {
    onMouseOver && onMouseOver();
  };
  const mouseLeave = () => {
    onMouseLeave && onMouseLeave();
  };

  return (
    <Link href={href} className={classes.link} onMouseOver={mouseOver} onMouseLeave={mouseLeave} onFocus={mouseOver} onBlur={mouseLeave}>
      <Typography variant='h1' className={classes.title}>
        {title}
      </Typography>
      <Typography variant='subtitle1' className={classes.subtitle}>
        {subtitle}
      </Typography>
    </Link>
  );
};

export default HeaderLink;
