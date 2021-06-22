import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Header, Footer, NotFoundPage } from 'smb-react-components-library';
import { CssBaseline, Box } from '@material-ui/core';
import SearchPage from '../../../features/Search/SearchPage';
import DetailPage from '../../../features/Detail/DetailPage';

import CustomCssBaseline from '../../../Themes/CustomCssBaseline';

import { useCoreContext } from '../../store/core.context';

import useStyles from '../SmbLayout/smbLayout.jss';

const SmbLayout: React.FC = () => {
    const { configuration } = useCoreContext();
    const classes = useStyles();

    return (
        <BrowserRouter>
            <CssBaseline />
            <CustomCssBaseline />
            <div className={classes.root}>
                <Box className={classes.grow}>
                    <Header configuration={configuration} />
                    <div className={classes.wrapper}>
                        <Switch>
                            <Route path="/" component={SearchPage} exact={true} />
                            <Route path="/detail/:exhibitId/:exhibitTitle?" component={DetailPage} exact={true} />
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
