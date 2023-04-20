/* eslint-disable react/jsx-key */
import { Grid } from '@material-ui/core';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import ArrowRightAltOutlinedIcon from '@material-ui/icons/ArrowRightAltOutlined';
import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

// import CollectionCard from './CollectionCard';

import useStyles from './collectionsDiscoverModule.jss';
import { LinkBuilder } from '../../../../utils/LinkBuilder';
import { CollectionCard } from '../CollectionCard/CollectionCardNew';
import { CollectionsContext } from '../../types/CollectionsContext';
// TODO: Probably this implementation is not necessary, CollectionsModule could be used instead.

export function CollectionsDiscoverModule({
  collectionModuleClasses = '',
  section = '',
}: {
  collectionModuleClasses?: string;
  section?: string;
}): ReactElement {
  const classes = useStyles();
  const { t } = useTranslation();
  const link = new LinkBuilder();

  const handleTopic = () => {
    link.toTopicsHashed('/#topics');
  };

  return (
    <CollectionsContext.Consumer>
      {(collectionsContext: { collections: any[] }): ReactElement => (
        <div
          id={'CollectionsModule'}
          className={clsx(classes.container, collectionModuleClasses)}
        >
          <Grid
            container={true}
            className={classes.gridContainer}
            spacing={4}
            direction={'row'}
            alignItems={'center'}
            data-testid={'collection-discover-module-wrapper'}
          >
            <Grid item={true} xs={12} className={classes.titleGridItem}>
              <ButtonBase onClick={handleTopic} className={classes.titleButton}>
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
                    data-testid={'collection-discover-module-cards-wrapper'}
                    image={collectionContextData.previewImageCard}
                    title={collectionContextData.title}
                    subtitle={collectionContextData.subtitle}
                    section={section}
                    actionText={t('collections module discover button')}
                    href={link.getTopicsHref(
                      collectionContextData.id,
                      collectionContextData.platform,
                    )}
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
