import React, { ReactElement, useContext, useEffect, useRef, useState } from 'react';
import MediaPlayerContext, { MediaPlayerContextData } from './MediaPlayerContext';
import { Typography } from '@material-ui/core';
import SliderModule from '../Slider/SliderModule';
import Slide from '../Slider/Slide';
import MediaPlayerControls from './MediaPlayerControls';
import Progressbar from '../Progressbar/Progressbar';
import Fullscreen from 'react-full-screen';
import { CollectionObject } from '../Collection/Dto/CollectionObject';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ZoomInOutlinedIcon from '@material-ui/icons/ZoomInOutlined';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import { useLazyImageLoader } from '../LazyLoading/LazyImageLoader';
import ModalImageZoom from '../ImageZoom/ModalImageZoom';
import { useTranslation } from 'react-i18next';
import ArrowRightAltOutlinedIcon from '@material-ui/icons/ArrowRightAltOutlined';
import ButtonBase from '@material-ui/core/ButtonBase';

import useStyles from './mediaPlayer.jss';

function generateImageUrls(collectionObjects: CollectionObject[], maxPreviewImageSize: number): string[] {
    return collectionObjects.map((value) =>
        value.imageUrlBuilder.buildUrl(value.imageId, maxPreviewImageSize, maxPreviewImageSize).toString(),
    );
}

/**
 * MediaPlayer for images.
 * This Player uses a slider element to display a slideshow of images.
 * @param maxImageSize
 * @param maxPreviewImageSize
 * @param children
 * @param sliderClasses
 * @param slideClasses
 * @param hideTitleInterval
 * @param zoom
 * @constructor
 */
function MediaPlayer({
    maxImageSize = 2500,
    maxPreviewImageSize = 160,
    children,
    sliderClasses = '',
    slideClasses = '',
    hideTitleInterval = 4000,
    zoom = false,
}: {
    maxImageSize?: number;
    maxPreviewImageSize?: number;
    children?: ReactElement;
    sliderClasses?: string;
    slideClasses?: string;
    hideTitleInterval?: number;
    zoom?: boolean;
}): ReactElement {
    const classes = useStyles();
    const [progressbarValue, setProgressbarValue] = useState(0);
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const mediaPlayerContextData = useContext<MediaPlayerContextData>(MediaPlayerContext);
    const [showTitle, setShowTitle] = useState<boolean>(true);
    const autoHideRef = useRef<() => void>();
    const [zoomOpened, setZoomOpened] = useState<boolean>(false);
    const [currentImageUrl, setCurrentImageUrl] = useState<string>('');
    const { t } = useTranslation();

    useEffect((): void => {
        if (hideTitleInterval && showTitle) {
            autoHideRef.current = (): void => {
                setShowTitle(false);
            };
        }
    }, [showTitle, hideTitleInterval]);
    useEffect((): void => {
        if (!mediaPlayerContextData.showControls) {
            return;
        }
        setShowTitle(true);
    }, [mediaPlayerContextData.showControls]);
    useEffect((): void => {
        setShowTitle(true);
    }, [mediaPlayerContextData.activeIndex]);
    useEffect((): void => {
        if (!showTitle) {
            return;
        }
        const hideTitle = (): void => {
            autoHideRef.current && autoHideRef.current();
        };

        setTimeout(hideTitle, hideTitleInterval);
    }, [hideTitleInterval, showTitle]);
    useEffect(() => {
        setPreviewImages(generateImageUrls(mediaPlayerContextData.collectionObjects, maxPreviewImageSize));
    }, [maxPreviewImageSize, mediaPlayerContextData.collectionObjects]);
    useEffect(() => {
        const collectionObject = mediaPlayerContextData.collectionObjects[mediaPlayerContextData.activeIndex];
        if (!collectionObject) {
            return;
        }

        const imageUrl = collectionObject.imageUrlBuilder
            .buildUrl(collectionObject.imageId, maxImageSize, maxImageSize)
            .toString();

        setCurrentImageUrl(imageUrl);
    }, [mediaPlayerContextData.activeIndex, mediaPlayerContextData.collectionObjects, maxImageSize]);

    const onUpdateProgress = (progressValue: number): void => {
        setProgressbarValue(progressValue);
    };
    const togglePlayer = (event: React.MouseEvent, fullscreen: boolean): void => {
        mediaPlayerContextData.toggleFullscreen && mediaPlayerContextData.toggleFullscreen(fullscreen);
        mediaPlayerContextData.togglePlayerOpen && mediaPlayerContextData.togglePlayerOpen(event);
        mediaPlayerContextData.togglePlayerPlaying && mediaPlayerContextData.togglePlayerPlaying(event);
    };
    const toggleZoom = (event: React.MouseEvent): void => {
        setZoomOpened(!zoomOpened);
        if (mediaPlayerContextData.playing) {
            mediaPlayerContextData.togglePlayerPlaying && mediaPlayerContextData.togglePlayerPlaying(event);
        }
    };
    // Preloading the first image, so image will be cached by the browser. This will only get called on
    // post-construct.
    useLazyImageLoader(generateImageUrls(mediaPlayerContextData.collectionObjects, maxImageSize)[0]);

    return (
        <MediaPlayerContext.Consumer>
            {(mediaPlayerContext): ReactElement | undefined => (
                <div className={classes.childWrapper}>
                    {!mediaPlayerContext.open && children}
                    {!mediaPlayerContext.open && (
                        <div>
                            <Progressbar
                                styleClasses={classes.progressbar}
                                value={progressbarValue}
                                maxValue={mediaPlayerContext.interval}
                            />
                            <MediaPlayerControls
                                playing={false}
                                onPlayPauseButtonClick={(event): void => {
                                    togglePlayer(event, false);
                                }}
                                show={true}
                                autoHide={false}
                                images={previewImages}
                            />
                        </div>
                    )}
                    {mediaPlayerContext.open && (
                        <Fullscreen
                            enabled={mediaPlayerContext.fullscreen}
                            onChange={(isFullscreen: boolean): void => {
                                if (!isFullscreen && mediaPlayerContext.fullscreen) {
                                    mediaPlayerContext.toggleFullscreen && mediaPlayerContext.toggleFullscreen();
                                }
                            }}
                        >
                            {mediaPlayerContext.showControls && (
                                <IconButton
                                    className={classes.backButton}
                                    color="inherit"
                                    onClick={(event): void => {
                                        togglePlayer(event, false);
                                    }}
                                >
                                    <ArrowBackIosIcon />
                                </IconButton>
                            )}
                            {zoom && !mediaPlayerContext.fullscreen && mediaPlayerContext.showControls && (
                                <IconButton
                                    className={classes.imageZoomButton}
                                    color="inherit"
                                    onClick={(event): void => toggleZoom(event)}
                                >
                                    <ZoomInOutlinedIcon />
                                </IconButton>
                            )}
                            <SliderModule
                                interval={mediaPlayerContext.interval}
                                playing={mediaPlayerContext.playing}
                                arrows={false}
                                dots={false}
                                sliderClasses={clsx(classes.slider, sliderClasses, {
                                    [classes.sliderFullscreen]: mediaPlayerContext.fullscreen,
                                })}
                                onProgressUpdate={onUpdateProgress}
                                activeIndex={mediaPlayerContext.activeIndex}
                                setActiveIndex={mediaPlayerContext.setActiveIndex}
                                onSlide={mediaPlayerContext.setActiveIndex}
                            >
                                {mediaPlayerContext.collectionObjects.map((collectionObject, index) => (
                                    <Slide
                                        key={index}
                                        image={collectionObject.imageUrlBuilder
                                            .buildUrl(collectionObject.imageId, maxImageSize, maxImageSize)
                                            .toString()}
                                        slideClasses={clsx(classes.slide, slideClasses, {
                                            [classes.slideFullscreen]: mediaPlayerContext.fullscreen,
                                        })}
                                        onClick={(): void =>
                                            mediaPlayerContext.toggleControls && mediaPlayerContext.toggleControls()
                                        }
                                        onMouseMove={(): void =>
                                            mediaPlayerContext.toggleControls && mediaPlayerContext.toggleControls(true)
                                        }
                                    />
                                ))}
                            </SliderModule>
                            {mediaPlayerContext.collectionObjects.length > 0 && (
                                <div className={classes.titleWrapper}>
                                    <div className={clsx(classes.titleElements, { [classes.titleHide]: !showTitle })}>
                                        <Typography component="div" variant={'h4'} className={clsx(classes.title)}>
                                            {mediaPlayerContext.collectionObjects[mediaPlayerContext.activeIndex].title}
                                        </Typography>
                                        <ButtonBase
                                            onClick={() => {
                                                mediaPlayerContext.onInfoClick(
                                                    mediaPlayerContext.collectionObjects[mediaPlayerContext.activeIndex]
                                                        .objectId,
                                                )
                                            }}
                                        >
                                            <Typography className={classes.titleToObject}>
                                                {t('go to object details')}
                                            </Typography>
                                            <ArrowRightAltOutlinedIcon />
                                        </ButtonBase>
                                    </div>
                                </div>
                            )}
                            <div
                                className={clsx(classes.mediaPlayerControlsWrapper, {
                                    [classes.mediaPlayerControlsWrapperHide]: !mediaPlayerContext.showControls,
                                })}
                            >
                                <Progressbar
                                    styleClasses={classes.progressbar}
                                    value={progressbarValue}
                                    maxValue={mediaPlayerContext.interval}
                                />
                                <MediaPlayerControls
                                    playing={mediaPlayerContext.playing}
                                    onPlayPauseButtonClick={mediaPlayerContext.togglePlayerPlaying}
                                    show={mediaPlayerContext.showControls}
                                    hideControlsInterval={mediaPlayerContext.hideControlsInterval}
                                    toggleShowControls={mediaPlayerContext.toggleControls}
                                    images={previewImages}
                                    imageIndex={mediaPlayerContext.activeIndex}
                                    fullscreen={mediaPlayerContext.fullscreen}
                                    onImageClick={mediaPlayerContext.setActiveIndex}
                                    onFullscreenClick={(): void =>
                                        mediaPlayerContext.toggleFullscreen && mediaPlayerContext.toggleFullscreen()
                                    }
                                />
                            </div>
                            <ModalImageZoom
                                open={zoomOpened}
                                imageUrl={currentImageUrl}
                                onClose={(): void => setZoomOpened(!zoomOpened)}
                            />
                        </Fullscreen>
                    )}
                </div>
            )}
        </MediaPlayerContext.Consumer>
    );
}

export default MediaPlayer;
