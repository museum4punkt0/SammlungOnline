import React from 'react';

import { ButtonBase, CardActionArea, Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import PhotoLibraryOutlinedIcon from '@material-ui/icons/PhotoLibraryOutlined';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

import useStyles from './collectionCard.jss';

export interface ICollectionCardProps {
  title: string;
  subtitle: string;
  count: number;
  image: string;
  actionText: string;
  tintColor: string;
  onClick?: () => void;
}

export const CollectionCardComponent: React.FC<ICollectionCardProps> = props => {
  const { image, title, subtitle, count, onClick, actionText = 'Discover' } = props;

  const classes = useStyles();

  return (
    <Card className={classes.card} onClick={() => onClick && onClick()}>
      <CardActionArea tabIndex={-1}>
        <CardMedia className={classes.cardMedia} image={image} />
        <CardContent className={classes.cardContent}>
          <div className={classes.cardHeader}>
            <div className={classes.cardCountArea}>
              <PhotoLibraryOutlinedIcon />
              <Typography variant='caption'>{count}</Typography>
            </div>
            <ButtonBase className={classes.cardDiscoverButton} onClick={() => onClick && onClick()}>
              <Typography variant='caption' className={classes.cardDiscoverButtonTypo}>
                {actionText}
              </Typography>
              <ArrowRightAltIcon />
            </ButtonBase>
          </div>
          <div className={classes.cardTitleArea}>
            <div>
              <Typography variant='h3' className={classes.cardTitleTypo}>
                {title} text
              </Typography>
            </div>
            <div>
              <Typography variant='body1' className={classes.cardSubtitleTypo}>
                {subtitle}
              </Typography>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export const CollectionCard = CollectionCardComponent;
