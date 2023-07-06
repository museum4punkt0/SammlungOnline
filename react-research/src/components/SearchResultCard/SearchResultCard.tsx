import React from 'react';
import { useTranslation } from 'react-i18next';

import Link from '@material-ui/core/Link';
import { Card, CardContent, Typography } from '@material-ui/core';

import { FallbackImage, LazyLoadImage } from '@smb/smb-react-components-library';

import { useDependency } from '../../providers';
import { useSearchResultCardStyles } from './searchResultCard.jss';
import { useFetchExhibitAttachments } from '../../hooks';
import { MISSING_IMAGES_WITH_REASONS } from '../ExhibitPreview/ExhibitPreview';

interface IAttributes {
  title?: string;
  content?: string | { formatted: string; href: string; html?: boolean } | string[];
}

interface ICardAttributesProps {
  title: string;
  attributes: IAttributes[];
}

interface ISearchResultCardProps {
  src: string;
  size?: string | number;
  data: ICardAttributesProps;
  onClick?: () => void;
  id: number;
}

export const SearchResultCard: React.FC<ISearchResultCardProps> = props => {
  const { size = '100%', data, src, onClick, id } = props;
  const { t } = useTranslation();
  const { data: attachments } = useFetchExhibitAttachments(id);
  const classes = useSearchResultCardStyles();
  const { linkBuilder } = useDependency();
  const attachmentId = attachments[0]?.id;
  const specialReason = MISSING_IMAGES_WITH_REASONS.includes(attachmentId as number);

  const reasonText = specialReason
    ? t(`details.attachment.missingImageReasons.${attachmentId}`)
    : t('image.notFoundText');

  const renderFallbackImage = () => {
    return (
      <FallbackImage label={data.title} text={reasonText} width={size} height={290} />
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
        href={linkBuilder.getDetailsLink(id, data.title)}
        style={{ textDecoration: 'none' }}
        aria-label={`Link zu ${data.title}`}
        className={classes.cardLink}
      >
        <div aria-label={`Abbildung von ${data.title}`}>
          <LazyLoadImage
            Fallback={renderFallbackImage()}
            src={specialReason ? '#' : src}
            width={size}
            height={290}
          />
        </div>
        <CardContent className={classes.content}>
          {data.attributes &&
            data?.attributes.map((attribute, index) => {
              const textVariant = index === 0 ? 'h4' : 'body1';
              const textClassName =
                index === 0
                  ? classes.typography
                  : index + 1 < data?.attributes.length
                  ? `${classes.typographySecond}`
                  : `${classes.typographySecond} ${classes.typographyLast}`;

              return (
                <Typography
                  id="main-typography"
                  key={`attribute_${index}`}
                  variant={textVariant}
                  className={textClassName}
                >
                  {attribute.content}
                </Typography>
              );
            })}
        </CardContent>
      </Link>
    </Card>
  );
};
