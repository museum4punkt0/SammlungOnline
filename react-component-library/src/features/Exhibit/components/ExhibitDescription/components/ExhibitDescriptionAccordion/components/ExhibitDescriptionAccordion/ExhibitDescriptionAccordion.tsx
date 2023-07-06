/* eslint-disable react/jsx-key */
import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import useStyles from './exhibitDescriptionAccordion.jss';
import { IExhibitDescriptionAccordionProps } from '../../../../types';
import { SafeEscapedHTML } from '../../../../../../../../components';

export const ExhibitDescriptionAccordion: React.FC<
  IExhibitDescriptionAccordionProps
> = (props) => {
  const { title, content, listTitle, keywordsList, expanded = false } = props;
  const [expandedState, setExpandedState] = React.useState(expanded);

  const handleChange = (
    _event: React.ChangeEvent<Record<string, unknown>>,
    isExpanded: boolean,
  ) => {
    setExpandedState(isExpanded);
  };

  const classes = useStyles();
  
  // We need a valid id for the aria-labeledby attribute
  const generateValidId = (titleString: string) => {
    return titleString.replace(/\W/g, '_');
  };

  const getListClassName = (value: string) => {
    switch (value) {
      case 'row':
        return classes.accordionListRow;
      case 'column':
      default:
        return classes.accordionListColumn;
    }
  };

  const renderListItem = (item: any, _index: number) => {
    return (
      <li key={_index}>
        <SafeEscapedHTML
          htmlString={item.text}
          cssClassNames={`${classes.listItemText} ${classes.iconclassRow}`}
          htmlTag={'p'}
        />
      </li>
    );
  };

  return (
    <Accordion
      expanded={expandedState}
      onChange={handleChange}
      defaultExpanded={false}
      className={classes.accordionElement}
    >
      <AccordionSummary
        className={classes.accordionSummary}
        expandIcon={
          <ExpandMoreIcon
            fontSize="large"
            className={classes.accordionSummaryIcon}
          />
        }
      >
        <Typography
          variant="h4"
          id={generateValidId(title)}
          className={classes.contrastTextHeader}
        >
          {/*in case there is html in title*/}
          <SafeEscapedHTML htmlString={title} />
        </Typography>
      </AccordionSummary>

      <AccordionDetails style={{ display: 'inherit' }}>
        {listTitle && (
          <Typography
            variant="body1"
            id={generateValidId('listTitle')}
            className={classes.contrastTextTitle}
          >
            {listTitle}
          </Typography>
        )}

        {keywordsList && keywordsList?.length > 0 && (
          <div
            aria-labelledby={
              listTitle ? generateValidId(listTitle) : generateValidId(title)
            }
          >
            {keywordsList.map((listItem, _index) => {
              return (
                <div key={_index}>
                  {listItem.key !== 'keywords' && (
                    <Typography
                      variant="h5"
                      id={generateValidId(listItem.title)}
                      className={classes.listTitle}
                    >
                      {listItem.title}
                    </Typography>
                  )}
                  <ul className={getListClassName(listItem.layout)}>
                    {listItem?.list?.length > 0 &&
                      listItem?.list.map((item, _index) => {
                        return renderListItem(item, _index);
                      })}
                  </ul>
                </div>
              );
            })}
          </div>
        )}

        {Array.isArray(content) ? (
          <List
            dense
            disablePadding
            aria-labelledby={
              listTitle ? generateValidId(listTitle) : generateValidId(title)
            }
          >
            {/*literature and other texts*/}
            {content.map((listItem, i) => {
              return (
                <ListItem dense disableGutters key={i}>
                  <ListItemIcon className={classes.listItemIcon}>
                    •
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{
                      gutterBottom: false,
                      variant: 'body2',
                    }}
                    className={classes.listItemText}
                  >
                    <SafeEscapedHTML htmlString={listItem} htmlTag={'span'} />
                  </ListItemText>
                </ListItem>
              );
            })}
          </List>
        ) : (
          <Typography variant="body2" className={classes.contrastText}>
            <SafeEscapedHTML htmlString={content} htmlTag={'span'} />
          </Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
};
