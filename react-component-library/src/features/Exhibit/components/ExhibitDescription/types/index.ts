import React from 'react';

export interface IExhibitDescriptionProps {
  titles: string[];
  renderActions: () => React.ReactNode;
  renderAside: () => React.ReactNode;
  children?: React.ReactNode;
}
export interface IGridItem {
  title: string;
  content: string;
}

export interface IExhibitDescriptionGridProps {
  items: IGridItem[];
}

export interface IExhibitDescriptionGridRowProps {
  title: string;
  content: string;
}
export interface IAccordionItem {
  title: string;
  content: string | string[];
  expanded?: boolean;
  listTitle?: string;
}

export interface IExhibitDescriptionAccordionListProps {
  items: IAccordionItem[];
}

export interface IExhibitDescriptionAccordionProps extends IAccordionItem {
  expanded?: boolean;
}
