import { createContext } from 'react';
import { TextContainerTextElement, TextContainerType } from '../PlattformLinks/TextContainer';

export interface ObjectData {
    id: number;
    displayTitle: string; // usually joined "title, technicalTerm, dating"
    identNr?: string;
    objectTitles?: string[];
    technicalTerm?: string;
    collection?: string;
    collectionKey?: string;
    location?: string;
    description?: string;
    dating?: string[];
    involvedParties?: string[];
    materialAndTechnique?: string[];
    dimensionsAndWeight?: string[];
    geographicalReferences?: string[];
    provenance?: string[];
    isHighlight?: boolean;
    isExhibited?: boolean;
    attachments?: ObjectAttachment[];
    hasPrimaryImage?: boolean;
    additionalAttributes: Array<{ key: string; value?: string }>;
}

export interface ObjectAttachment {
    filename: string;
    width: number;
    height: number;
    src: string; // full source url, prefixed with path and with width and height applied to filename
    primary: boolean;
    credits?: string;
    license?: Link;
    downloadFilename?: string;
    resize: (w: number, h: number) => string;
}

// TODO move to shared structs
export interface Link {
    text: string;
    href: string;
    target?: string;
}

export interface TextContainer {
    title: string;
    type: TextContainerType;
    elements: Array<TextContainerTextElement>;
}

export interface ObjectContextData {
    objectData?: ObjectData; // never undefined in real life
    previewClicked: (attachment: ObjectAttachment) => void;
    emailButtonPressed: () => void;
    shareButtonPressed: () => void;
    driveFileButtonPressed: () => void;
    downloadButtonPressed: () => void;
    zoomButtonPressed: () => void;
    asideTextContainerElements?: Array<TextContainer>;
}

const ObjectContext = createContext<ObjectContextData>({
    previewClicked: (): void => {
        console.log('previewClicked');
    },
    emailButtonPressed: () => {
        console.log('emailButtonPressed');
    },
    downloadButtonPressed: () => {
        console.log('downloadButtonPressed');
    },
    shareButtonPressed: () => {
        console.log('shareButtonPressed');
    },
    zoomButtonPressed: () => {
        console.log('zoomButtonPressed');
    },
    driveFileButtonPressed: () => {
        console.log('driveFileButtonPressed');
    },
});

export default ObjectContext;
