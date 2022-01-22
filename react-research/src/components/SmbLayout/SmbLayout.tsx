import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Header, Footer, NotFoundPage } from '@smb/smb-react-components-library';
import { CssBaseline, Box } from '@material-ui/core';
import SearchPage from '../../features/Search/SearchPage';
import DetailPage from '../../features/Detail/DetailPage';

import CustomCssBaseline from '../../context/Themes/CustomCssBaseline';

import { useCoreContext } from '../../context/core.context';

import useStyles from './smbLayout.jss';

const SmbLayout: React.FC = () => {
  const { configuration } = useCoreContext();
  const classes = useStyles();

  const onContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    const isProductionMode = configuration?.PRODUCTION_READY;
    if (isProductionMode) {
      event.preventDefault();
    }
  };

  return (
    <BrowserRouter>
      <CssBaseline />
      <CustomCssBaseline />
      <div
        className={classes.root}
        onContextMenu={onContextMenu}
        data-testid={'smb_layout_wrapper'}
      >
        <Box className={classes.grow} data-testid={'root-wrapper'}>
          <Header data-testid={'header-wrapper'} configuration={configuration} />
          <div className={classes.wrapper} data-testid={'rooter-wrapper'}>
            <Switch>
              <Route path="/" component={SearchPage} exact={true} />
              <Route
                path="/detail/:exhibitId/:exhibitTitle?"
                component={DetailPage}
                exact={true}
              />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
          <div className={classes.footerWrapper}>
            <Footer configuration={configuration} />
          </div>
        </Box>
      </div>
    </BrowserRouter>
  );
};

export default SmbLayout;
