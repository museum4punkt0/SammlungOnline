/* eslint-disable react/jsx-key */
import React, { ReactElement, useState } from 'react';
import { ButtonBase, Collapse, Grid, Typography } from '@material-ui/core';
import ArrowRightAltOutlinedIcon from '@material-ui/icons/ArrowRightAltOutlined';

import { CollectionsContext } from '../../types/CollectionsContext';

import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { CollectionCard } from '../CollectionCard/CollectionCardNew';
import { LinkBuilder } from 'src/utils/LinkBuilder';

import useStyles from './collectionsModule.jss';

/**
 * CollectionsModule is a wrapper component to display cards of different collections.
 * @constructor
 */
export function CollectionsModule({
  collectionModuleClasses = '',
  section = '',
  initialCards = 4,
}: {
  collectionModuleClasses?: string;
  section?: string;
  initialCards?: number;
}): ReactElement {
  // const [isOpen, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();
  const { t } = useTranslation();
  const link = new LinkBuilder();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getCardHref = (id: number, title: string, platform?: string) => {
    return section === 'guide'
      ? link.getGuideHref(id, title)
      : link.getTopicsHref(id, platform);
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
              .slice(0, initialCards)
              .map(
                (
                  { id, previewImageCard, title, subtitle, platform },
                  index,
                ) => (
                  <Grid item={true} key={index} xs={12} sm={6} md={6}>
                    <CollectionCard
                      title={title}
                      subtitle={subtitle}
                      section={section}
                      image={previewImageCard}
                      actionText={t('collections module discover button')}
                      href={getCardHref(id, title, platform)}
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
                .slice(initialCards)
                .map(
                  (
                    { id, previewImageCard, title, subtitle, platform },
                    index,
                  ) => (
                    <Grid item={true} key={index} xs={12} sm={6} md={6}>
                      <CollectionCard
                        title={title}
                        subtitle={subtitle}
                        section={section}
                        image={previewImageCard}
                        actionText={t('collections module discover button')}
                        href={getCardHref(id, title, platform)}
                      />
                    </Grid>
                  ),
                )}
            </Grid>
          </Collapse>
          <Collapse
            in={
              !expanded && collectionsContext.collections.length > initialCards
            }
            timeout="auto"
            unmountOnExit
          >
            <Grid
              item
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
        </div>
      )}
    </CollectionsContext.Consumer>
  );
}
