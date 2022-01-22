import React from 'react';
import Drawer from '@material-ui/core/Drawer';

import { useStyles } from './navigationDrawer.jss';
import { INavigationDrawerProps } from '../../types/interfaces';

const NavigationDrawer: React.FC<INavigationDrawerProps> = (props) => {
  const { children, open, onClose } = props;

  const classes = useStyles(props)();

  return (
    <nav className={classes.navigation}>
      <Drawer
        open={open}
        anchor="top"
        variant="temporary"
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ keepMounted: true, disableScrollLock: false }}
        onClose={onClose}
      >
        <div className={classes.content}>{children}</div>
      </Drawer>
    </nav>
  );
};

export default NavigationDrawer;
