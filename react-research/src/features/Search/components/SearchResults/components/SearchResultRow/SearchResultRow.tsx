import React from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Grid, Link, Typography } from '@material-ui/core';

import { useSearchResultRowStyles } from './searchResultRow.jss';

import { FallbackImage, LazyLoadImage } from '@smb/smb-react-components-library';
import { useDependency } from '../../../../../../context/dependency.context';

export interface IExhibit {
  title: string;
  involvedParties?: string;
  dating?: string;
  identNumber?: string;
  src: string;
  collection?: string;
}

interface ISearchResultRowProps {
  onClick?: () => void;
  imageWidth?: number;
  imageHeight?: number;
  exhibit: IExhibit;
  id: number;
}

export const SearchResultRow: React.FC<ISearchResultRowProps> = (props) => {
  const { imageWidth = 191, imageHeight = 191, exhibit, onClick, id } = props;
  const { title, identNumber, dating, collection, src, involvedParties } = exhibit;
  const { linkBuilder } = useDependency();

  const { t } = useTranslation();

  const classes = useSearchResultRowStyles();

  const descriptionFields = [
    { label: 'search.exhibit.attributes.involvedParties', value: involvedParties },
    { label: 'search.exhibit.attributes.dating', value: dating },
    { label: 'search.exhibit.attributes.identNumber', value: identNumber },
    { label: 'search.exhibit.attributes.collection', value: collection },
  ];

  const renderFallbackImage = () => {
    return (
      <FallbackImage
        label={title}
        text={t('image.notFoundText')}
        width={imageWidth}
        height={imageHeight}
      />
    );
  };

  const mouseClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (onClick) {
      onClick();
    }
  };

  return (
    <Grid
      data-testid={'search-result-list-card'}
      container={true}
      spacing={0}
      className={classes.listElement}
      alignItems="flex-start"
      justify="center"
    >
      <Link
        classes={{ root: classes.listElement }}
        onClick={mouseClickHandler}
        href={linkBuilder.getDetailsLink(id, title)}
      >
        <Grid
          item
          container
          alignContent="flex-start"
          className={classes.listElementMediaArea}
          lg={2}
          md={3}
          sm={4}
          xs={12}
        >
          <LazyLoadImage
            src={src}
            Fallback={renderFallbackImage()}
            width={imageWidth}
            height={imageHeight}
          />
        </Grid>
        <Grid
          item
          lg={10}
          md={9}
          sm={8}
          xs={12}
          className={classes.listElementDescriptionArea}
        >
          <Box component="div" display="inline-block">
            <Typography variant="h3" color="primary" className={classes.contentTypoTitle}>
              {title}
            </Typography>
            {descriptionFields.map(({ value, label }, index) => {
              if (!value) {
                return null;
              }

              return (
                <Typography key={index} variant="body1">
                  <b>{t(label)}: </b>
                  {value}
                </Typography>
              );
            })}
          </Box>
        </Grid>
      </Link>
    </Grid>
  );
};
