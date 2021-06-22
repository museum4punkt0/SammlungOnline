import React, { createRef, ReactElement, RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import FullscreenOutlinedIcon from '@material-ui/icons/FullscreenOutlined';
import FullscreenExitOutlinedIcon from '@material-ui/icons/FullscreenExitOutlined';
import clsx from 'clsx';
import LazyImage from '../LazyLoading/LazyImage';

import useStyles from './mediaPlayerControls.jss';

function calcScrollX(scrollWidth: number, imageIndex: number, imageCount: number): number {
    return (scrollWidth / imageCount) * imageIndex;
}
const MediaPlayerControlsPreviewImagesId = 'MediaPlayerControlsPreviewImages';

/**
 * MediaPlayerControls with Play-Pause-Button, Maximize-Button and Preview-Images.
 *
 * @param playing
 * @param onPlayPauseButtonClick
 * @param show
 * @param autoHide Hide controls after Controls were shown for the first time.
 * @param hideControlsInterval
 * @param toggleShowControls
 * @param images
 * @param imageIndex
 * @param fullscreen
 * @param onImageClick
 * @param onFullscreenClick
 * @constructor
 */
function MediaPlayerControls({
    playing,
    onPlayPauseButtonClick,
    show = true,
    autoHide = true,
    hideControlsInterval = 4000,
    toggleShowControls,
    images,
    imageIndex,
    fullscreen = false,
    onImageClick,
    onFullscreenClick,
}: {
    playing: boolean;
    onPlayPauseButtonClick?: (event: React.MouseEvent) => void;
    show?: boolean;
    autoHide?: boolean;
    hideControlsInterval?: number;
    toggleShowControls?: (show: boolean) => void;
    images?: string[];
    imageIndex?: number;
    fullscreen?: boolean;
    onImageClick?: (index: number) => void;
    onFullscreenClick?: (event: React.MouseEvent) => void;
}): ReactElement {
    const classes = useStyles();
    const [scrolledIndex, setScrolledIndex] = useState(imageIndex);
    const [imageContainerRef] = useState<RefObject<HTMLDivElement>>(createRef<HTMLDivElement>());
    const [autoHideProgress, setAutoHideProgress] = useState(0);
    const [showOnMouseOver, setShowOnMouseOver] = useState(false);
    const autoHideRef = useRef<() => void>();
    const autoHideUpdateInterval = 100;

    const updateAutoHide = (): void => {
        if (!autoHide || !toggleShowControls || showOnMouseOver) {
            return;
        }

        let newAutoHideProgress = autoHideProgress + autoHideUpdateInterval;
        if (autoHideProgress >= hideControlsInterval) {
            toggleShowControls(false);
            newAutoHideProgress = 0;
        }

        setAutoHideProgress(newAutoHideProgress);
    };
    useEffect((): void => {
        if (autoHide && toggleShowControls) {
            autoHideRef.current = updateAutoHide;
        }
    });
    useEffect(() => {
        const hideControls = (): void => {
            autoHideRef.current && autoHideRef.current();
        };

        const autoHideInterval = setInterval(hideControls, autoHideUpdateInterval);
        return (): void => clearInterval(autoHideInterval);
    }, [show]);

    // Wheel-Event has to be registered as active event, so we have to add the event the old way.
    useLayoutEffect((): void => {
        if (!document) {
            return;
        }

        const element = document.getElementById(MediaPlayerControlsPreviewImagesId);
        if (!element) {
            return;
        }

        const scrollHorizontal = (event: WheelEvent): void => {
            if (!imageContainerRef.current) {
                return;
            }
            event.preventDefault();

            const leftScrollPosition = imageContainerRef.current.scrollLeft + event.deltaY;
            imageContainerRef.current.scrollTo({
                left: leftScrollPosition,
                top: 0,
            });
        };

        element.addEventListener('wheel', (ev): void => scrollHorizontal(ev));
    }, [imageContainerRef]);

    // if imageIndex and scrolledIndex are not equal, the slider is in different state and die preview should scroll.
    // Scrolling only make sense if window is present, which mean we are not rendering on server-side.
    if (
        images &&
        imageIndex !== undefined &&
        imageIndex !== scrolledIndex &&
        imageContainerRef.current &&
        imageContainerRef.current.scrollTo &&
        window !== undefined
    ) {
        imageContainerRef.current.scrollTo({
            left: calcScrollX(imageContainerRef.current.scrollWidth, imageIndex - 1, images.length),
        });
        setScrolledIndex(imageIndex);
    }

    return (
        <div
            id={'MediaPlayerControls'}
            className={clsx(classes.wrapper, { [classes.wrapperHide]: !show })}
            onMouseOver={(): void => setShowOnMouseOver(true)}
            onMouseLeave={(): void => setShowOnMouseOver(false)}
            onTouchStart={(): void => setShowOnMouseOver(true)}
            onTouchEnd={(): void => setShowOnMouseOver(false)}
        >
            {onFullscreenClick && (
                <div className={classes.maximizeButton}>
                    <IconButton color={'inherit'} onClick={onFullscreenClick}>
                        <FullscreenOutlinedIcon className={clsx({ [classes.hide]: fullscreen })} />
                        <FullscreenExitOutlinedIcon className={clsx({ [classes.hide]: !fullscreen })} />
                    </IconButton>
                </div>
            )}
            <IconButton color={'inherit'} onClick={onPlayPauseButtonClick}>
                {playing && <PauseIcon />}
                {!playing && <PlayArrowIcon />}
            </IconButton>
            {images && imageIndex !== undefined && (
                <div className={classes.countingArea}>
                    <div>{`${imageIndex + 1} | ${images.length}`}</div>
                </div>
            )}
            {images && (
                <div id={MediaPlayerControlsPreviewImagesId} ref={imageContainerRef} className={classes.images}>
                    <div className={classes.imagesSlider}>
                        {images.map((value, index) => (
                            <LazyImage key={index} src={value}>
                                <div
                                    className={clsx(classes.image, { [classes.activeImage]: imageIndex === index })}
                                    key={index}
                                    style={{
                                        backgroundImage: `url(${value})`,
                                    }}
                                    onClick={(): void => onImageClick && onImageClick(index)}
                                />
                            </LazyImage>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MediaPlayerControls;
