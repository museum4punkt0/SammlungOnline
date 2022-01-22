import React from 'react';

import { Typography, Toolbar, ButtonBase, Grid } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import HeaderLogo from '../HeaderLogo/HeaderLogo';

import useStyles from './headerToolbar.jss';
import { IAppHeaderToolbarProps } from '../../types/interfaces';


const HeaderToolbar: React.FC<IAppHeaderToolbarProps> = (props) => {
  const { onMenuOpen, color, title } = props;

  const classes = useStyles(props)();

  return (
    <Toolbar className={classes.toolbar}>
      <Grid container>
        <Grid item container xs={2} justify="flex-start">
          <HeaderLogo color={color} />
        </Grid>
        <Grid item container xs={10} justify="flex-end">
          <ButtonBase className={classes.menuButton} onClick={onMenuOpen}>
            <Typography variant="h2" className={classes.title}>
              {title}
            </Typography>
            {<ArrowBackIosIcon viewBox="-5 0 24 24" className={classes.menuIconArrow} />}
          </ButtonBase>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

export default HeaderToolbar;
