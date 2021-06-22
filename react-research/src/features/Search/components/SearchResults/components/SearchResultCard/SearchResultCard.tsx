import React from 'react';

import { ButtonBase, Card, CardContent, Typography } from '@material-ui/core';
import { FallbackImage, LazyLoadImage } from 'smb-react-components-library';

import { useSearchResultCardStyles } from './searchResultCard.jss';
import { useTranslation } from 'react-i18next';

interface ISearchResultCardProps {
    src: string;
    size?: number;
    title: string;
    onClick?: () => void;
}

export const SearchResultCard: React.FC<ISearchResultCardProps> = (props) => {
    const { size = 300, title, src, onClick } = props;
    const { t } = useTranslation();
    const classes = useSearchResultCardStyles();

    const renderFallbackImage = () => {
        return <FallbackImage label={title} text={t('image.notFoundText')} width={size} height={size} />;
    };

    return (
        <ButtonBase onClick={onClick}>
            <Card data-cy={'search-result-grid-card'} className={classes.card}>
                <LazyLoadImage Fallback={renderFallbackImage()} src={src} width={size} height={size} />
                <CardContent className={classes.content}>
                    <Typography variant="body2" className={classes.typography}>
                        {title}
                    </Typography>
                </CardContent>
            </Card>
        </ButtonBase>
    );
};
