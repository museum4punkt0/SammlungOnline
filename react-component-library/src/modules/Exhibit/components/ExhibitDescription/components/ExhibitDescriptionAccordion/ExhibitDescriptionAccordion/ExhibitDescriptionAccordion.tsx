import React from 'react';

import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Accordion from '@material-ui/core/Accordion';

import useStyles from './exhibitDescriptionAccordion.jss';

export interface IExhibitDescriptionAccordionProps {
  title: string;
  content: string;
  expanded?: boolean;
}

export const ExhibitDescriptionAccordion: React.FC<IExhibitDescriptionAccordionProps> = props => {
  const { title, content, expanded = false } = props;
  const [expandedState, setExpandedState] = React.useState(expanded);

  const handleChange = (_event: React.ChangeEvent<Record<string, unknown>>, isExpanded: boolean) => {
    setExpandedState(isExpanded);
  };

  const classes = useStyles();

  return (
    <Accordion expanded={expandedState} onChange={handleChange} defaultExpanded={false} className={classes.accordionElement}>
      <AccordionSummary expandIcon={<ExpandMoreIcon fontSize='large' />}>
        <Typography variant='h6' className={classes.contrastText}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails style={{ display: 'inherit' }}>
        <Typography variant='body1' className={classes.contrastText}>
          {content}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};
