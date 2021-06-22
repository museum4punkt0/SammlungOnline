import React, { createContext } from 'react';
import { CollectionObject } from '../Collection/Dto/CollectionObject';

export interface MediaPlayerContextData {
    collectionObjects: CollectionObject[];
    interval: number;
    open: boolean;
    playing: boolean;
    showControls: boolean;
    activeIndex: number;
    fullscreen: boolean;
    hideControlsInterval?: number;
    togglePlayerOpen?: (event: React.MouseEvent) => void;
    togglePlayerPlaying?: (event: React.MouseEvent) => void;
    toggleControls?: (show?: boolean) => void;
    toggleFullscreen?: (enable?: boolean) => void;
    setActiveIndex: (index: number) => void;
    onInfoClick: (objectId: string) => void;
}

const MediaPlayerContext = createContext<MediaPlayerContextData>({
    collectionObjects: [],
    interval: 8000,
    open: false,
    playing: false,
    showControls: true,
    activeIndex: 0,
    fullscreen: false,
    hideControlsInterval: 4000,
    setActiveIndex: (): void => {
        throw Error('You have to override the setter!');
    },
    onInfoClick: (): void => {
        throw Error('You have to override the setter!');
    },
});

export default MediaPlayerContext;
