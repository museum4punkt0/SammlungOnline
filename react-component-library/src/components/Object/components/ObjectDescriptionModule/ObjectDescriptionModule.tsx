import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { ReactElement, useContext } from 'react';
import ObjectActions from '../ObjectAction/ObjectActions';
import ObjectContext from '../ObjectContext/ObjectContext';
import ObjectDescriptionAccordion from '../ObjectDescriptionAccordion/ObjectDescriptionAccordion';
import ObjectDescriptionAside from '../ObjectDescriptionAside/ObjectDescriptionAside';
import ObjectDescriptionGrid from '../ObjectDescriptionGrid/ObjectDescriptionGrid';

import useStyles from './objectDescriptionModule.jss';

export enum Visibility {
  VISIBLE,
  VISIBLE_IF_AVAILABLE,
}

export interface FieldVisibility {
  key: string;
  visibility: Visibility;
}

function filterUniqueValues(...values: Array<string>): Array<string> {
  return values
    .filter((v) => v !== '')
    .filter((value: string, index: number, self: Array<string>) => {
      return self.indexOf(value) === index;
    });
}

function ObjectDescriptionModule({
  gridConfig,
  accordionConfig,
}: {
  gridConfig: Array<FieldVisibility>;
  accordionConfig: Array<FieldVisibility>;
}): ReactElement {
  const classes = useStyles();
  const objectContextData = useContext(ObjectContext);
  const title =
    (objectContextData.objectData?.objectTitles &&
      objectContextData.objectData.objectTitles[0]) ||
    '';
  const term = objectContextData.objectData?.technicalTerm || '';
  const date =
    (objectContextData.objectData?.dating &&
      objectContextData.objectData?.dating[0]) ||
    '';
  const mainTitles = filterUniqueValues(title, term, date);

  const renderTitles = () =>
    mainTitles.length > 0
      ? mainTitles.map((mainTitle: string, index: number) => (
          <Typography
            key={index}
            variant={'h3'}
            className={clsx(
              classes.contrastText,
              classes.largeText,
              classes.boldText,
            )}
          >
            {mainTitle}
          </Typography>
        ))
      : objectContextData.objectData?.displayTitle;

  return (
    <div id={'DescriptionModule'} className={classes.container}>
      <div className={classes.separator} />
      <Grid
        container={true}
        spacing={0}
        direction={'row'}
        justify={'space-between'}
        className={classes.titleGrid}
      >
        <Grid item={true} xs={12} sm={12} lg={11} md={10}>
          {renderTitles()}
        </Grid>
        <Grid item={true} xs={12} sm={12} lg={1} md={2}>
          <ObjectActions
            showImageActions={
              objectContextData?.objectData?.hasPrimaryImage || false
            }
            classNames={classes.objectActions}
          />
        </Grid>
      </Grid>
      <Grid
        container={true}
        spacing={0}
        direction={'row'}
        justify={'space-between'}
        className={classes.contentGrid}
      >
        <Grid item={true} xs={12} sm={12} md={3}>
          <ObjectDescriptionAside />
        </Grid>
        <Grid item={true} xs={12} sm={12} md={8}>
          <ObjectDescriptionGrid config={gridConfig} />
          <ObjectDescriptionAccordion config={accordionConfig} />
        </Grid>
      </Grid>
    </div>
  );
}

export default ObjectDescriptionModule;
