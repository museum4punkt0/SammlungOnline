import React from 'react';

import { Card, CardContent, Typography } from '@material-ui/core';
import { FallbackImage, LazyLoadImage } from '@smb/smb-react-components-library';

import { useSearchResultCardStyles } from './searchResultCard.jss';
import { useTranslation } from 'react-i18next';
import Link from '@material-ui/core/Link';
import { useDependency } from '../../../../../../context/dependency.context';

interface ISearchResultCardProps {
  src: string;
  size?: number;
  title: string;
  onClick?: () => void;
  id: number;
}

export const SearchResultCard: React.FC<ISearchResultCardProps> = (props) => {
  const { size = 300, title, src, onClick, id } = props;
  const { t } = useTranslation();
  const classes = useSearchResultCardStyles();
  const { linkBuilder } = useDependency();
  const renderFallbackImage = () => {
    return (
      <FallbackImage
        label={title}
        text={t('image.notFoundText')}
        width={size}
        height={size}
      />
    );
  };
  const clickHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault(); // disable anchor behavior
    if (onClick) {
      onClick();
    }
  };
  return (
    <Card data-testid={'search-result-grid-card'} className={classes.card}>
      <Link
        onClick={clickHandler}
        href={linkBuilder.getDetailsLink(id, title)}
        style={{ textDecoration: 'none' }}
      >
        <LazyLoadImage
          Fallback={renderFallbackImage()}
          src={src}
          width={size}
          height={size}
        />
        <CardContent className={classes.content}>
          <Typography variant="body2" className={classes.typography}>
            {title}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};
