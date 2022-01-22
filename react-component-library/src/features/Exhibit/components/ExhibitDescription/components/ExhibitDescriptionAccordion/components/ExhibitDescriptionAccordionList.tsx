import React from 'react';

import { ExhibitDescriptionAccordion } from './ExhibitDescriptionAccordion/ExhibitDescriptionAccordion';

import useStyles from './exhibitDescriptionAccordionList.jss';
import { IExhibitDescriptionAccordionListProps } from '../../../types';

export const ExhibitDescriptionAccordionList: React.FC<IExhibitDescriptionAccordionListProps> =
  ({ items }) => {
    const classes = useStyles();

    return (
      <div className={classes.accordionWrapper}>
        {items.map((item, i) => {
          return (
            <ExhibitDescriptionAccordion
              expanded={item.expanded === true}
              key={i}
              title={item.title}
              content={item.content}
              listTitle={item.listTitle}
            />
          );
        })}
      </div>
    );
  };
