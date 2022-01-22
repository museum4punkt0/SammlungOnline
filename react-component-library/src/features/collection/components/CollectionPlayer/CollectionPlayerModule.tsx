import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory } from 'react-router-dom';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import useStyles from './collectionPlayerModule.jss';

import { HighlightButton } from '../../../../components';
import {
  CollectionContext,
  CollectionContextData,
} from '../CollectionContext/CollectionContext';
import { useConfigLoader } from '../../../../hooks';
import { LazyLoadImage } from '../../../../components/LazyLoadImage/components/LazyLoadImage';
import { MediaPlayer, MediaPlayerContext } from 'src/features';
import { MediaPlayerContextData } from '../../../media/components/MediaPlayerContext/MediaPlayerContext';

export function CollectionPlayerModule({
  interval,
  wrapperClasses = '',
  previewWrapperClasses = '',
  mediaPlayerClasses = '',
}: {
  interval: number;
  wrapperClasses?: string;
  previewWrapperClasses?: string;
  mediaPlayerClasses?: string;
}): ReactElement {
  const classes = useStyles();
  const [playerOpen, setPlayerOpen] = useState(false);
  const [playerPlaying, setPlayerPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const collectionContext =
    useContext<CollectionContextData>(CollectionContext);
  const { t } = useTranslation();
  const { config } = useConfigLoader();
  const history = useHistory();

  // activeCollectionIndex will be used to handle changes from outside, because normaly changes of selectedObjectIndex will
  // be handled by this component itself.
  const [activeCollectionIndex, setActiveCollectionIndex] = useState<
    number | undefined
  >(collectionContext.selectedObjectIndex);

  const debounceToggleControls = AwesomeDebouncePromise(setShowControls, 70, {
    key: (show: any) => show,
  });

  const mediaPlayerContextData: MediaPlayerContextData = {
    collectionObjects: collectionContext.collectionObjects,
    open: playerOpen,
    interval: interval,
    playing: playerPlaying,
    showControls: showControls,
    activeIndex: activeIndex,
    fullscreen: fullscreen,
    togglePlayerOpen: () => setPlayerOpen(!playerOpen),
    togglePlayerPlaying: () => setPlayerPlaying(!playerPlaying),
    toggleControls: (show = !showControls) => debounceToggleControls(show),
    toggleFullscreen: (enable = !fullscreen) => setFullscreen(enable),
    setActiveIndex: (index: number) => setActiveIndex(index),
    onInfoClick: (objectId: string) => {
      const url = `${config.RESEARCH_DOMAIN}/detail/${objectId}`;

      window?.open(url, '_blank')?.focus();
    },
  };

  // TODO: history usage should be removed from component and implemented in page
  const backToTopics = (): void => {
    history.push(`/`);
  };

  // if the selectedObjectIndex from collectionContext has changed, it is necessary to set the active index.
  useEffect(() => {
    if (
      activeCollectionIndex === collectionContext.selectedObjectIndex ||
      collectionContext.selectedObjectIndex === undefined
    ) {
      return;
    }

    setActiveCollectionIndex(collectionContext.selectedObjectIndex);
    setActiveIndex(collectionContext.selectedObjectIndex);
    setPlayerPlaying(false);

    if (!playerOpen) {
      setPlayerOpen(true);
    }
  }, [
    activeIndex,
    activeCollectionIndex,
    playerOpen,
    playerPlaying,
    collectionContext.selectedObjectIndex,
  ]);

  return (
    <div
      className={clsx(classes.contentWrapper, wrapperClasses, {
        [previewWrapperClasses]: !playerOpen,
      })}
    >
      <MediaPlayerContext.Provider value={mediaPlayerContextData}>
        <MediaPlayer
          sliderClasses={mediaPlayerClasses}
          slideClasses={mediaPlayerClasses}
          zoom={true}
        >
          <div
            className={classes.content}
            data-testid="collection-player-module-wrapper"
          >
            <div className={classes.backToTopicsButtonArea}>
              <IconButton tabIndex={0} color={'inherit'} onClick={backToTopics}>
                <ArrowBackIosIcon />
                <Typography className={classes.backToTopicsTypo}>
                  {t('go to topics overview')}
                </Typography>
              </IconButton>
            </div>
            <div
              data-testid="collection-player-module-details"
              className={classes.descriptionArea}
              style={{
                backgroundImage: `url(${collectionContext.previewImageSlider})`,
              }}
            >
              <Typography variant={'h2'} className={classes.title}>
                {collectionContext.title}
              </Typography>
              <Typography component="div" variant={'h5'}>
                {collectionContext.subtitle}
              </Typography>
              <HighlightButton
                caption={t('play button')}
                onClick={(event): void => {
                  mediaPlayerContextData.togglePlayerOpen &&
                    mediaPlayerContextData.togglePlayerOpen(event);
                  mediaPlayerContextData.togglePlayerPlaying &&
                    mediaPlayerContextData.togglePlayerPlaying(event);
                }}
              >
                <PlayArrowIcon color={'primary'} />
              </HighlightButton>
            </div>
            <div
              className={classes.imageContainer}
              data-testid="collection-player-module-image-wrapper"
            >
              <CollectionContext.Consumer>
                {(collectionContext): ReactElement => (
                  <LazyLoadImage src={collectionContext.previewImageSlider}>
                    <img
                      className={classes.image}
                      src={collectionContext.previewImageSlider}
                      alt={''}
                    />
                  </LazyLoadImage>
                )}
              </CollectionContext.Consumer>
            </div>
          </div>
        </MediaPlayer>
      </MediaPlayerContext.Provider>
    </div>
  );
}
