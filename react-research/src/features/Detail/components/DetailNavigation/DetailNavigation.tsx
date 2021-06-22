import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ExhibitModel } from 'smb-react-components-library';

import { Grid, Hidden, useMediaQuery, useTheme } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import QueryParamsService from '../../../../core/services/query-params/query-params.service';

import { useExhibitPagination } from '../../hooks/use-exhibit-pagination';
import { useCurrentExhibitOffset } from './hooks/use-current-exhibit-offset.hook';

import DetailNavigationLink from './DetailNavigationLink/DetailNavigationLink';

const exhibitOffsetQueryParamsKey = 'exhibitOverviewOffset';

interface IDetailNavigationProps {
    children?: React.ReactNode;
    renderActions: () => React.ReactNode;
}

const DetailNavigation: React.FC<IDetailNavigationProps> = ({ children, renderActions }) => {
    const { search: queryParameters } = useLocation();
    const { t } = useTranslation();

    const theme = useTheme();
    const isXsDown = useMediaQuery(theme.breakpoints.down('xs'));

    const exhibitOverviewOffset = useCurrentExhibitOffset();
    const [previousResult, nextResult] = useExhibitPagination(exhibitOverviewOffset);

    const createExhibitLink = (exhibit: ExhibitModel, offset: number) => {
        const queryParamsManagerService = new QueryParamsService(queryParameters);

        const title = encodeURIComponent(exhibit.title);
        const nextExhibitOverviewOffset = exhibitOverviewOffset + offset;
        queryParamsManagerService.set(exhibitOffsetQueryParamsKey, nextExhibitOverviewOffset);

        return `/detail/${exhibit.id}/${title}?${queryParamsManagerService.getQueryString()}`;
    };

    return (
        <Grid container>
            <Grid container alignItems="flex-start" justify="space-between" spacing={0}>
                <Hidden xsDown>
                    <Grid item lg={2} md={2} sm={2}>
                        {previousResult && (
                            <DetailNavigationLink
                                href={createExhibitLink(previousResult, -1)}
                                text={t('search.results.previous')}
                                label={previousResult.title}
                                Icon={<ArrowBackIosIcon />}
                            />
                        )}
                    </Grid>
                </Hidden>
                <Grid item container justify="center" lg={8} md={8} sm={8} xs={12}>
                    <Grid container justify="center" alignItems="center" spacing={0}>
                        <Grid
                            item
                            container
                            lg={12}
                            md={12}
                            sm={12}
                            xs={6}
                            justify={isXsDown ? 'flex-start' : 'center'}
                        >
                            <DetailNavigationLink
                                href={`/${queryParameters}`}
                                text={t('search.results.title')}
                                Icon={isXsDown ? <ArrowBackIosIcon /> : null}
                            />
                        </Grid>
                        <Hidden smUp>
                            <Grid item container justify="flex-end" lg={12} md={12} sm={12} xs={6}>
                                {renderActions()}
                            </Grid>
                        </Hidden>
                    </Grid>
                    {children}
                </Grid>
                <Hidden xsDown>
                    <Grid item container justify="flex-end" lg={2} md={2} sm={2}>
                        {nextResult && (
                            <DetailNavigationLink
                                href={createExhibitLink(nextResult, 1)}
                                text={t('search.results.next')}
                                label={nextResult.title}
                                align={'right'}
                                Icon={<ArrowForwardIosIcon />}
                            />
                        )}
                    </Grid>
                </Hidden>
            </Grid>
        </Grid>
    );
};

export default DetailNavigation;
