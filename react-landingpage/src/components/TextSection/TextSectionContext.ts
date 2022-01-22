import { createContext } from 'react';

export enum TextModuleType {
  TEXT,
  RESEARCH,
  TOPIC,
  GUIDE,
}
interface HighlightsContextData {
  image: string;
  title: string;
}

export interface TextSectionData {
  title: string;
  subtitle: string;
  text: string;
  link: {
    href: string;
    caption: string;
  };
  moduleBackgroundColor: string;
  textAreaColor: string;
  textColor: string;
  titleColor: string;
  moduleType: TextModuleType;
}

export interface TextSectionContextData {
  sections: Array<TextSectionData>;
}

const TextSectionContext = createContext<TextSectionContextData>({
  sections: [],
});

export default TextSectionContext;
