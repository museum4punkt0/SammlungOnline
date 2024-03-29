import React, { ReactElement, useState } from 'react';
import clsx from 'clsx';
import { Collapse, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import ArrowRightAltOutlinedIcon from '@material-ui/icons/ArrowRightAltOutlined';
import {
  CollectionCard,
  CollectionsContext,
} from '@smb/smb-react-components-library';
import { useTranslation } from 'react-i18next';
import useStyles from './collectionsModule.jss';

/**
 * CollectionModule is a wrapper component to display cards of different collections.
 * @constructor
 */
function CollectionsModule({
  collectionModuleClasses = '',
}: {
  collectionModuleClasses?: string;
}): ReactElement {
  const classes = useStyles();
  const { t } = useTranslation();
  // const [isOpen, setOpen] = useState(false);

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
            {/* TODO implement sorting
                        <Grid item={true} xs={12} sm={12} md={12} className={classes.titleGridItem}>
                            <ButtonBase className={classes.sortCollectionsButton}>
                                <Typography className={classes.sortCollectionsButtonTypo}>{t('lastly added')}</Typography>
                                <ArrowBackIosIcon className={classes.titleArrowButton} />
                            </ButtonBase>
                        </Grid>
                        */}
            {collectionsContext.collections
              .slice(0, 4)
              .map(
                (
                  { id, previewImageCard, title, subtitle, collectionObjects },
                  index,
                ) => (
                  <Grid item={true} key={index} xs={12} sm={6} md={6}>
                    <CollectionCard
                      title={title}
                      subtitle={subtitle}
                      count={collectionObjects.length}
                      image={previewImageCard}
                      actionText={t('collections module discover button')}
                      tintColor={'rgba(0, 0, 0, 0.5)'}
                      onClick={() => {
                        if (collectionsContext?.onCollectionClick) {
                          collectionsContext.onCollectionClick(id, title);
                        }
                      }}
                    />
                  </Grid>
                ),
              )}
          </Grid>
          <Collapse
            in={expanded}
            timeout="auto"
            unmountOnExit
            style={{ marginTop: '1rem' }}
          >
            <Grid
              style={{
                // maxWidth: '80rem',
                // maxHeight: '1600px',
                paddingTop: '1rem',
                transition: 'all 1s',
                overflow: 'hidden',
              }}
              container={true}
              spacing={4}
              direction={'row'}
              justifyContent={'flex-start'}
              alignItems={'center'}
            >
              {collectionsContext.collections
                .slice(4)
                .map(
                  (
                    {
                      id,
                      previewImageCard,
                      title,
                      subtitle,
                      collectionObjects,
                    },
                    index,
                  ) => (
                    <Grid item={true} key={index} xs={12} sm={6} md={6}>
                      <CollectionCard
                        title={title}
                        subtitle={subtitle}
                        count={collectionObjects.length}
                        image={previewImageCard}
                        actionText={t('collections module discover button')}
                        tintColor={'rgba(0, 0, 0, 0.5)'}
                        onClick={() => {
                          if (collectionsContext?.onCollectionClick) {
                            collectionsContext.onCollectionClick(id, title);
                          }
                        }}
                      />
                    </Grid>
                  ),
                )}
            </Grid>
          </Collapse>
          <Collapse in={!expanded} timeout="auto" unmountOnExit>
            <Grid
              item={true}
              xs={12}
              sm={12}
              md={12}
              lg={12}
              className={classes.titleGridItem}
            >
              <ButtonBase
                onClick={handleExpandClick}
                className={classes.buttonTitle}
              >
                <span>
                  <Typography
                    variant={'h3'}
                    className={classes.showAllButtonTypo}
                  >
                    {t('collections module show all button')}
                  </Typography>
                  <ArrowRightAltOutlinedIcon
                    className={classes.endArrowButton}
                    fontSize={'large'}
                  />
                </span>
              </ButtonBase>
            </Grid>
          </Collapse>
          {/* <Grid
                        style={{
                            maxHeight: '1600px',
                            paddingTop: '1rem',
                            transition: 'all 1s',
                            overflow: 'hidden',
                        }}
                        container={true}
                        spacing={4}
                        direction={'row'}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        {collectionsContext.collections
                            .slice(collectionsContext.collections.length - 2)
                            .map((collectionContextData, index) => (
                                <Grid item={true} key={index} xs={12} sm={6} md={6}>
                                    <CollectionCard
                                        id={collectionContextData.id}
                                        image={collectionContextData.previewImageCard}
                                        title={collectionContextData.title}
                                        subtitle={collectionContextData.subtitle}
                                        tintColor={'rgba(0, 0, 0, 0.5)'}
                                        elementCount={collectionContextData.collectionObjects.length}
                                        onClick={collectionsContext.onCollectionClick}
                                    />
                                </Grid>
                            ))}
                    </Grid> */}
          {/* <Grid
                        style={{
                            display: !isOpen ? 'flex' : 'none',
                        }}
                        container={true}
                        spacing={4}
                        direction={'row'}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <Grid item={true} xs={12} sm={12} md={12} lg={12} className={classes.titleGridItem}>
                            <ButtonBase onClick={() => setOpen(!isOpen)} className={classes.buttonTitle}>
                                <span>
                                    <Typography variant={'h3'} className={classes.showAllButtonTypo}>
                                        {t('collections module show all button')}
                                    </Typography>
                                    <ArrowRightAltOutlinedIcon className={classes.endArrowButton} fontSize={'large'} />
                                </span>
                            </ButtonBase>
                        </Grid>
                    </Grid> */}
        </div>
      )}
    </CollectionsContext.Consumer>
  );
}

export default CollectionsModule;
