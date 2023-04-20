import { createContext } from 'react';

export enum TextModuleType {
  TEXT,
  RESEARCH,
  TOPIC,
  GUIDE,
  INTRO,
}
// types HighlightsContextData {
//     image: string;
//     title: string;
// }

export interface ITextSectionData {
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

export interface ITextSectionContextData {
  sections: Array<ITextSectionData>;
}

const TextSectionContext = createContext<ITextSectionContextData>({
  sections: [],
});

export default TextSectionContext;
