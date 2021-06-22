import React, { ReactElement } from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import PhotoLibraryOutlinedIcon from '@material-ui/icons/PhotoLibraryOutlined';
import Typography from '@material-ui/core/Typography';
import { ButtonBase } from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Card from '@material-ui/core/Card';
import { useTranslation } from 'react-i18next';

import useStyles from './collectionCard.jss';

/**
 * CollectionCard is an UI Element
 * @param title
 * @param image
 * @param tintColor
 * @param elementCount
 * @param handleClick
 * @constructor
 */
function CollectionCard({
    id,
    image,
    title,
    subtitle,
    tintColor,
    elementCount,
    onClick,
}: {
    id: number;
    image: string;
    title: string;
    subtitle: string;
    tintColor: string;
    elementCount: number;
    onClick?: (id: number, title: string) => void;
}): ReactElement {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.cardMedia} image={image} src='image' />
            <CardContent className={classes.cardContent} style={{ backgroundColor: tintColor }}>
                <div className={classes.cardHeader}>
                    <div className={classes.cardCountArea}>
                        <PhotoLibraryOutlinedIcon />
                        <Typography variant={'caption'}>{elementCount}</Typography>
                    </div>
                    <ButtonBase
                        className={classes.cardDiscoverButton}
                        onClick={(): void => {
                            onClick && onClick(id, title);
                        }}
                    >
                        <Typography variant={'caption'} className={classes.cardDiscoverButtonTypo}>
                            {t('collections module discover button')}
                        </Typography>
                        <ArrowRightAltIcon />
                    </ButtonBase>
                </div>
                <div className={classes.cardTitleArea}>
                    <div>
                        <Typography variant={'h3'} className={classes.cardTitleTypo}>
                            {title}
                        </Typography>
                    </div>
                    <div>
                        <Typography variant={'body1'} className={classes.cardSubtitleTypo}>
                            {subtitle}
                        </Typography>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default CollectionCard;
