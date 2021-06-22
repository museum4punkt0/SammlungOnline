import React from 'react';

import { ExhibitDescriptionAccordion } from './ExhibitDescriptionAccordion/ExhibitDescriptionAccordion';

import useStyles from './exhibitDescriptionAccordionList.jss';

export interface IAccordionItem {
  title: string;
  content: string;
}

export interface IExhibitDescriptionAccordionListProps {
  items: IAccordionItem[];
}

export const ExhibitDescriptionAccordionList: React.FC<IExhibitDescriptionAccordionListProps> = ({ items }) => {
  const classes = useStyles();

  return (
    <div className={classes.accordionWrapper}>
      {items.map((item, i) => {
        return <ExhibitDescriptionAccordion expanded={i === 0} key={i} title={item.title} content={item.content} />;
      })}
    </div>
  );
};
