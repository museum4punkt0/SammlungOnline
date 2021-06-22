import React, { ReactElement } from 'react';
import Drawer from '@material-ui/core/Drawer';

import { useStyles } from './navigationDrawer.jss';

export interface INavigationDrawerProps {
  open: boolean;
  onClose: () => void;
  backgroundColor: string;
  children: ReactElement | ReactElement[];
}

const NavigationDrawer: React.FC<INavigationDrawerProps> = props => {
  const { children, open, onClose } = props;

  const classes = useStyles(props)();

  return (
    <nav className={classes.navigation}>
      <Drawer
        open={open}
        anchor='top'
        variant='temporary'
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ keepMounted: true, disableScrollLock: true }}
        onClose={onClose}
      >
        <div className={classes.content}>{children}</div>
      </Drawer>
    </nav>
  );
};

export default NavigationDrawer;
