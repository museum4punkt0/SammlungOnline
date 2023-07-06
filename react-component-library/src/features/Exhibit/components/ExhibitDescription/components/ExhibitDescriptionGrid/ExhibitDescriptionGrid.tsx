/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import { ExhibitDescriptionGridRow } from './ExhibitDescriptionGridRow/ExhibitDescriptionGridRow';
import useStyles from './exhibitDescriptionGrid.jss';
import { IExhibitDescriptionGridProps, IGridItem } from '../../types';
import { LinkBuilder } from 'src';
export const ExhibitDescriptionGrid: React.FC<IExhibitDescriptionGridProps> = ({
  items,
  exhibit,
}) => {
  const [gridItems, setGridItems] = useState<IGridItem[]>([]);
  const { t } = useTranslation();
  useEffect(() => {
    const permalink = {
      title: t('search.exhibit.attributes.permalink'),
      content: new LinkBuilder().getPermalinkHref(exhibit.id, exhibit.title),
    };
    items.push(permalink);
    setGridItems(items);
  }, [items]);

  const classes = useStyles();
  //todo: create internal links
  return (
    <Grid className={classes.container} container>
      {gridItems &&
        gridItems.map((item, i) => {
          return (
            <React.Fragment key={i}>
              {item.content.length > 0 && (
                <ExhibitDescriptionGridRow
                  key={i}
                  permalink={i === gridItems.length - 1}
                  title={item.title}
                  content={item.content}
                />
              )}
            </React.Fragment>
          );
        })}
    </Grid>
  );
};
