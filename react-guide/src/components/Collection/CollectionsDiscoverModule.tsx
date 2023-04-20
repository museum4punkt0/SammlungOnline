import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import CollectionCard from './CollectionCard';
import ArrowRightAltOutlinedIcon from '@material-ui/icons/ArrowRightAltOutlined';
import { useTranslation } from 'react-i18next';
import { LinkBuilder } from '../../utils/LinkBuilder';
import useStyles from './collectionsDiscoverModule.jss';
import { CollectionsContext } from '@smb/smb-react-components-library';
// import useConfigLoader from '../../../Util/ConfigLoader';

// TODO: Probably this implementation is not necessary, CollectionsModule could be used instead.

function CollectionsDiscoverModule({
  collectionModuleClasses = '',
}: {
  collectionModuleClasses?: string;
}): ReactElement {
  const classes = useStyles();
  const { t } = useTranslation();
  // const { config } = useConfigLoader();
  const link = new LinkBuilder();
  return (
    <CollectionsContext.Consumer>
      {(collectionsContext): ReactElement => (
        <div
          id={'CollectionsModule'}
          className={clsx(classes.container, collectionModuleClasses)}
        >
          <Grid
            container={true}
            spacing={4}
            direction={'row'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Grid item={true} xs={12} className={classes.titleGridItem}>
              <ButtonBase
                onClick={() => link.toTopicsHashed('#topics')}
                className={classes.titleButton}
              >
                <Typography className={classes.titleButtonTypo}>
                  {t('discover other collections')}
                </Typography>
                <ArrowRightAltOutlinedIcon
                  className={classes.titleArrowButton}
                  fontSize={'large'}
                />
              </ButtonBase>
            </Grid>

            {collectionsContext.collections.map(
              (collectionContextData, index) => (
                <Grid item={true} key={index} xs={12} sm={6}>
                  <CollectionCard
                    id={collectionContextData.id}
                    image={collectionContextData.previewImageCard}
                    title={collectionContextData.title}
                    subtitle={collectionContextData.subtitle}
                    tintColor={'rgba(0, 0, 0, 0.5)'}
                    elementCount={
                      collectionContextData.collectionObjects.length
                    }
                    onClick={collectionsContext.onCollectionClick}
                  />
                </Grid>
              ),
            )}
          </Grid>
        </div>
      )}
    </CollectionsContext.Consumer>
  );
}

export default CollectionsDiscoverModule;
