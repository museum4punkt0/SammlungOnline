import React from 'react';

import { Divider, Grid, Typography } from '@material-ui/core';

import useStyles from './exhibitDescription.jss';
import {
  AppStage,
  SafeEscapedHTML,
  useConfigLoader,
} from '@smb/smb-react-components-library';

interface IExhibitDescriptionProps {
  titles: string[];
  renderAside: () => React.ReactNode;
  renderDownloadCSVActions: () => React.ReactNode;
  children?: React.ReactNode;
}

const ExhibitDescription: React.FC<IExhibitDescriptionProps> = props => {
  const { titles, children, renderAside, renderDownloadCSVActions } = props;

  const classes = useStyles();
  const { config } = useConfigLoader();
  const withCSVDownload = config.stage !== AppStage.PRODUCTION;

  return (
    <div id="DescriptionModule" className={classes.container}>
      <Divider className={classes.separator} />
      <Grid container>
        <>
          <Grid
            item={true}
            xs={withCSVDownload ? 10 : 12}
            sm={withCSVDownload ? 10 : 12}
            md={withCSVDownload ? 10 : 12}
            lg={withCSVDownload ? 10 : 12}
            className={classes.titleContainer}
          >
            {titles.map((title, i) => {
              const variant = i === 0 ? 'h3' : 'h5';
              const component = i === 0 ? 'h2' : 'h4';
              const className = i === 0 ? classes.title : classes.titleSecond;
              return (
                <React.Fragment key={i}>
                  {title && (
                    <SafeEscapedHTML
                      htmlString={title}
                      htmlTag={component}
                      cssClassNames={className}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </Grid>
          {withCSVDownload && renderDownloadCSVActions()}
        </>

        <Grid
          container
          spacing={0}
          direction="row"
          justifyContent="space-between"
          className={classes.contentGrid}
        >
          <Grid item xs={12} sm={12} md={3}>
            {renderAside()}
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            {children}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ExhibitDescription;
