import React from 'react';

import { ExhibitDescriptionAccordion } from './ExhibitDescriptionAccordion/ExhibitDescriptionAccordion';
import { MuiThemeProvider } from '@material-ui/core/styles';

import useStyles from './exhibitDescriptionAccordionList.jss';
import { IExhibitDescriptionAccordionListProps } from '../../../types';
import CommonTheme from '../../../../../../../typografie/CommonTheme';

export const ExhibitDescriptionAccordionList: React.FC<
  IExhibitDescriptionAccordionListProps
> = ({ items }) => {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={CommonTheme}>
      <div className={classes.accordionWrapper}>
        {items.map((item, i) => {
          return (
            <ExhibitDescriptionAccordion
              expanded={item.expanded === true}
              key={i}
              title={item.title}
              content={item.content}
              keywordsList={item.keywordsList}
              listTitle={item.listTitle}
            />
          );
        })}
      </div>
    </MuiThemeProvider>
  );
};
