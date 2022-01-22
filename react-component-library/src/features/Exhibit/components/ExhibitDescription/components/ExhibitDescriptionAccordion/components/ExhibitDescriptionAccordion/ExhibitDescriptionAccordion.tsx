import React from 'react';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import useStyles from './exhibitDescriptionAccordion.jss';
import { IExhibitDescriptionAccordionProps } from '../../../../types';

export const ExhibitDescriptionAccordion: React.FC<IExhibitDescriptionAccordionProps> = (
  props,
) => {
  const { title, content, listTitle, expanded = false } = props;
  const [expandedState, setExpandedState] = React.useState(expanded);

  const handleChange = (
    _event: React.ChangeEvent<Record<string, unknown>>,
    isExpanded: boolean,
  ) => {
    setExpandedState(isExpanded);
  };

  const classes = useStyles();
  // We need a valid id for the arria-labeledby attribute
  const generateValidId = (titleString: string) => {
    return titleString.replace(/\W/g, '_');
  };
  return (
    <Accordion
      expanded={expandedState}
      onChange={handleChange}
      defaultExpanded={false}
      className={classes.accordionElement}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon fontSize="large" />}>
        <Typography
          variant="h6"
          id={title ?? generateValidId(title)}
          className={classes.contrastText}
        >
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails style={{ display: 'inherit' }}>
        {listTitle ? (
          <Typography
            variant="h6"
            id={generateValidId(listTitle)}
            className={classes.contrastText}
          >
            {listTitle}
          </Typography>
        ) : (
          <></>
        )}
        {Array.isArray(content) ? (
          <List
            dense
            disablePadding
            aria-labelledby={
              listTitle ? generateValidId(listTitle) : generateValidId(title)
            }
          >
            {content.map((listItem, i) => {
              return (
                <ListItem dense disableGutters key={i}>
                  <ListItemIcon className={classes.listItemIcon}>•</ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{
                      gutterBottom: false,
                      variant: 'body1',
                    }}
                    className={classes.listItemText}
                  >
                    {listItem}
                  </ListItemText>
                </ListItem>
              );
            })}
          </List>
        ) : (
          <Typography variant="body1" className={classes.contrastText}>
            {content}
          </Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
};
