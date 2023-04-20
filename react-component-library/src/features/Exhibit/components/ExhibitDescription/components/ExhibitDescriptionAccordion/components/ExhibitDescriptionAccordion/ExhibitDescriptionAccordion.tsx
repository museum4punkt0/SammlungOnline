/* eslint-disable react/jsx-key */
import React from 'react';
import { useTranslation } from 'react-i18next';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Tooltip from '@material-ui/core/Tooltip';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import OpenInNew from '@material-ui/icons/OpenInNew';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import useStyles from './exhibitDescriptionAccordion.jss';
import { IExhibitDescriptionAccordionProps } from '../../../../types';

export const ExhibitDescriptionAccordion: React.FC<
  IExhibitDescriptionAccordionProps
> = (props) => {
  const { title, content, listTitle, keywordsList, expanded = false } = props;
  const [expandedState, setExpandedState] = React.useState(expanded);
  const { t } = useTranslation();

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

  const getListClassName = (value: string) => {
    switch (value) {
      case 'row':
        return classes.accordionListRow;
      case 'column':
      default:
        return classes.accordionListColumn;
    }
  };

  const renderInternalLinks = false;

  const renderListItem = (item: any, _index: number) => {
    const externalUrlName = t('details.externalUrl');
    return (
      <li key={_index}>
        {renderInternalLinks && item.internalUrl ? (
          <Tooltip title={`${t('tooltip.title')} ${item.text}`} arrow={true}>
            <Link
              href={item.internalUrl}
              className={classes.listItemText}
              aria-label={item.text}
              variant="body2"
            >
              {item.text}
            </Link>
          </Tooltip>
        ) : (
          <Typography variant="body2" className={classes.listItemText}>
            {item.text}
          </Typography>
        )}
        {item.externalUrl && (
          <>
            <span>|</span>
            <Tooltip title={`${t('tooltip.title')} ${item.text}`} arrow={true}>
              <Link
                href={item.externalUrl}
                className={classes.listItemText}
                aria-label={item.text}
              >
                {externalUrlName}
                <span className={classes.icon}>
                  <OpenInNew />
                </span>
              </Link>
            </Tooltip>
          </>
        )}
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
          id={title ?? generateValidId(title)}
          className={classes.contrastTextHeader}
        >
          {title}
        </Typography>
      </AccordionSummary>

      <AccordionDetails style={{ display: 'inherit' }}>
        {!listTitle && (
          <Typography
            variant="h5"
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
                    {listItem?.list &&
                      listItem?.list?.length > 0 &&
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
                    {listItem}
                  </ListItemText>
                </ListItem>
              );
            })}
          </List>
        ) : (
          <Typography variant="body2" className={classes.contrastText}>
            {content}
          </Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
};
