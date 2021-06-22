import React, { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";

import { Box } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";

import useGraphQlClient from "./GraphQl/client/GraphQlClient";
import { ApolloProvider } from "@apollo/react-hooks";

import CustomCssBaseline from "./Themes/CustomCssBaseline";
import SmbGuideTheme from "./Themes/SmbGuideTheme";

// import { AppHeader } from '@bit/xai_mb.smb.header';
import LoadingSpinner from "./View/Components/LoadingSpinner/LoadingSpinner";

import useConfigLoader from "./Util/ConfigLoader";
import SwitchRoutes from "./Util/SwitchRoutes";

import routes from "./Routes";
import { AppStage } from "./config";
import { Footer, Header } from "smb-react-components-library";

import useStyles from "./app.jss";
import { useTranslation } from "react-i18next";

//important do not delete
import "./i18n";

function App(): ReactElement {
  // AppHeader sind Komponenten .. Komponenten sind dumm --> bekommen ihre Werte von außen oder über einen Kontext
  // Pages sind intelligenter und dürfen als Controller agieren

  // useConfigLoader will trigger head-request to fetch X-React-App-Stage header. Value change of loadingConfig will
  // result in rerendering the component.
  const classes = useStyles();
  const { t } = useTranslation();
  const { loadingConfig, appStage, config } = useConfigLoader();
  const { loading, graphQlClient } = useGraphQlClient();

  const onContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    if (appStage === AppStage.STAGE || appStage === AppStage.PRODUCTION) {
      event.preventDefault();
    }
  };
  const loadingSpinner = (
    <div className={classes.loadingWrapper}>
      <LoadingSpinner styleClasses={classes.loadingSpinner} />
    </div>
  );

  if (loadingConfig || loading) {
    return loadingSpinner;
  }

  // The HeaderServiceContextProvider is necessary because a graphQL-query will be performed, but provided to the
  // ApolloProvider in this step. So otherwise hooks will crash in an epic way.
  return (
    <ApolloProvider client={graphQlClient}>
      <MuiThemeProvider theme={SmbGuideTheme}>
        <BrowserRouter>
          <CssBaseline />
          <CustomCssBaseline />

          <div className={classes.root} onContextMenu={onContextMenu}>
            <Box className={classes.grow}>
                <Header configuration={config as any} />
              <div className={classes.wrapper}>
                <SwitchRoutes routes={routes} />
              </div>
              <div style={{ backgroundColor: `${SmbGuideTheme.palette.primary.main}` }}>
                <Footer configuration={config as any}  />
              </div>
            </Box>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    </ApolloProvider>
  );
}

export default App;
