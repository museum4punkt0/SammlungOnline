import React from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Grid, Link, Typography } from '@material-ui/core';
import { FallbackImage, LazyLoadImage } from '@smb/smb-react-components-library';

import { useDependency } from '../../providers/index';

import { useSearchResultRowStyles } from './searchResultRow.jss';

interface IAttributes {
  title?: string;
  content?:
    | string
    | {
        formatted: string;
        href: string;
        html?: boolean;
      }
    | string[];
}

interface IListAttributesProps {
  title: string;
  attributes: IAttributes[];
}

interface ISearchResultRowProps {
  onClick?: () => void;
  src: string;
  title: string;
  imageWidth?: number;
  imageHeight?: number;
  data: IListAttributesProps;
  id: number;
}

export const SearchResultRow: React.FC<ISearchResultRowProps> = props => {
  const { imageWidth = 191, imageHeight = 191, data, title, src, onClick, id } = props;
  const { linkBuilder } = useDependency();

  const { t } = useTranslation();

  const classes = useSearchResultRowStyles();

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
      justifyContent="center"
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
            <Typography variant="h4" color="primary" className={classes.contentTypoTitle}>
              {title}
            </Typography>
            {data?.attributes &&
              data?.attributes.map((attribute, _index) => {
                return (
                  <React.Fragment key={_index}>
                    {attribute?.content && attribute?.title && (
                      <Typography key={_index} variant="body1" className={classes.typo}>
                        <b className={classes.attribute}>{attribute?.title}: </b>
                        {attribute?.content}
                      </Typography>
                    )}
                  </React.Fragment>
                );
              })}
          </Box>
        </Grid>
      </Link>
    </Grid>
  );
};
