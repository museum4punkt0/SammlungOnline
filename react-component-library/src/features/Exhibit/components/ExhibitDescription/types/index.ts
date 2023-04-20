import React from 'react';
import { ExhibitModel } from 'src';

export interface IExhibitDescriptionProps {
  titles: string[];
  renderActions: () => React.ReactNode;
  renderAside: () => React.ReactNode;
  children?: React.ReactNode;
  exhibitId: number;
}
export interface IGridItem {
  title: string;
  content: string | { formatted: string; href: string; html?: boolean }[];
}

export interface IExhibitDescriptionGridProps {
  items: IGridItem[];
  exhibit: ExhibitModel;
}

export interface IExhibitDescriptionGridRowProps {
  title: string;
  permalink: boolean;
  content: string | { formatted: string; href: string; html?: boolean }[];
}
// export interface IAccordionItem {
//   title: string;
//   content: string | string[];
//   expanded?: boolean;
//   listTitle?: string;
// }
export interface IAccordionItem {
  title: string;
  content: string | string[];
  keywordsList?: Array<IAccordionObject> | [];
  expanded?: boolean;
  listTitle?: string;
}

export interface IAccordionObject {
  title: string;
  list: Array<{ text?: string; externalUrl?: string; internalUrl: string }>;
  layout: 'column' | 'row';
  key: string;
}

export interface IExhibitDescriptionAccordionListProps {
  items: IAccordionItem[];
}

export interface IExhibitDescriptionAccordionProps extends IAccordionItem {
  expanded?: boolean;
}
