import React from 'react';
import { useTranslation } from 'react-i18next';

import { Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { ReactComponent as SmbLogo } from '../../assets/smb-logo.svg';

import useStyles from './headerLogo.jss';
import { IHeaderLogoProps } from '../../types/interfaces';

const HeaderLogo: React.FC<IHeaderLogoProps> = ({ color, ...props }) => {
  const { t } = useTranslation();
  const classes = useStyles({ color })();

  return (
    <Link
      className={classes.logoLink}
      component={RouterLink}
      to="/"
      aria-label={t('header.logo')}
      {...props}
    >
      <SmbLogo className={classes.logo} fill={color} />
    </Link>
  );
};

export default HeaderLogo;