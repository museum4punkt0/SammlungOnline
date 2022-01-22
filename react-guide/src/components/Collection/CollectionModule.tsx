import React, {
  createRef,
  ReactElement,
  RefObject,
  useContext,
  useState,
} from 'react';
import { Card } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton from '@material-ui/core/IconButton';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ArrowRightAltOutlinedIcon from '@material-ui/icons/ArrowRightAltOutlined';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { buildImageUrl } from './Utils/ImageUtils';
import {
  CollectionContext,
  ICollectionContextData,
  LazyLoadImage,
} from '@smb/smb-react-components-library';
import { useHistory } from 'react-router-dom';
import useStyles from './collectionModule.jss';

/**
 * CollectionModule displays a collection of images as grid.
 * @param maxImageSize
 * @param title
 * @param bottomTitle
 * @constructor
 */
function CollectionModule({
  maxImageSize = 170,
  title,
  bottomTitle,
}: {
  maxImageSize?: number;
  title?: string;
  bottomTitle?: string;
}): ReactElement {
  const classes = useStyles();
  const [contentContainerRef] = useState<RefObject<HTMLDivElement>>(
    createRef<HTMLDivElement>(),
  );
  const collectionContext =
    useContext<ICollectionContextData>(CollectionContext);
  const history = useHistory();

  const discoverButtonClicked = (): void => {
    contentContainerRef.current &&
      window &&
      window.scrollTo({
        left: 0,
        top: contentContainerRef.current.offsetTop,
        behavior: 'smooth',
      });
  };
  const scrollToTop = (): void => {
    window && window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  };
  const imageClicked = (index: number): void => {
    collectionContext.onCollectionObjectSelected &&
      collectionContext.onCollectionObjectSelected(index);
    scrollToTop();
  };

  const objectInfoClicked = (objectId: string): void => {
    history.push(`/detail/${objectId}`);
  };

  return (
    <CollectionContext.Consumer>
      {(collectionContext): ReactElement => (
        <div className={classes.contentWrapper} ref={contentContainerRef}>
          <Grid
            container={true}
            spacing={1}
            direction={'row'}
            justify={'center'}
            alignItems={'center'}
          >
            {title && (
              <Grid item={true} xs={12} className={classes.titleGridItem}>
                <ButtonBase
                  onClick={discoverButtonClicked}
                  className={classes.buttonTitle}
                >
                  <span>
                    <Typography
                      variant={'h3'}
                      className={classes.iconButtonTitleTypo}
                    >
                      {title}
                    </Typography>
                    <ArrowRightAltOutlinedIcon
                      className={classes.titleArrowButton}
                      fontSize={'large'}
                    />
                  </span>
                </ButtonBase>
              </Grid>
            )}

            {collectionContext.collectionObjects.map(
              (collectionObject, index) => (
                <Grid item={true} xs={12} sm={6} md={4} lg={3} key={index}>
                  <Card className={classes.card}>
                    <LazyLoadImage
                      src={buildImageUrl(collectionObject, maxImageSize)}
                      width={''}
                      height={''}
                    >
                      <CardMedia
                        className={classes.cardMedia}
                        image={buildImageUrl(collectionObject, maxImageSize)}
                        onClick={(): void => imageClicked(index)}
                      />
                    </LazyLoadImage>
                    <CardContent className={classes.cardContent}>
                      <IconButton
                        onClick={(): void =>
                          objectInfoClicked(collectionObject.objectId)
                        }
                      >
                        <InfoOutlinedIcon />
                      </IconButton>
                      <Typography
                        variant={'body1'}
                        className={classes.cardTypo}
                      >
                        {collectionObject.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ),
            )}

            {bottomTitle && (
              <Grid item={true} xs={12} className={classes.titleGridItem}>
                <ButtonBase
                  onClick={scrollToTop}
                  className={classes.buttonTitle}
                >
                  <span>
                    <ArrowRightAltOutlinedIcon
                      className={classes.endArrowButton}
                      fontSize={'large'}
                    />
                    <Typography
                      variant={'h3'}
                      className={classes.iconButtonTitleTypo}
                    >
                      {bottomTitle}
                    </Typography>
                  </span>
                </ButtonBase>
              </Grid>
            )}
          </Grid>
        </div>
      )}
    </CollectionContext.Consumer>
  );
}

export default CollectionModule;
