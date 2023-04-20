import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ExhibitModel, LinkBuilder } from '@smb/smb-react-components-library';

import { Grid, Hidden, useMediaQuery, useTheme } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import QueryParamsService from '../../utils/query-params/query-params.service';

import { useExhibitPagination, useCurrentExhibitOffset } from '../../hooks/index';
import { DetailNavigationLink } from '../index';
const exhibitOffsetQueryParamsKey = 'objIdx';

interface IDetailNavigationProps {
  children?: React.ReactNode;
  renderActions?: () => React.ReactNode;
}

const DetailNavigation: React.FC<IDetailNavigationProps> = ({
  children,
  renderActions,
}) => {
  const { search: queryParameters } = useLocation();
  const { t } = useTranslation();

  const theme = useTheme();
  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'));

  const exhibitOverviewOffset = useCurrentExhibitOffset();
  const [previousResult, nextResult] = useExhibitPagination(exhibitOverviewOffset);

  const createExhibitLink = (exhibit: ExhibitModel, offset: number) => {
    const detailUrl = new LinkBuilder().getDetailsLink(exhibit.id, exhibit.title);
    const queryParamsManagerService = new QueryParamsService(queryParameters);
    const nextExhibitOverviewOffset = exhibitOverviewOffset + offset;
    queryParamsManagerService.set(exhibitOffsetQueryParamsKey, nextExhibitOverviewOffset);
    return `${detailUrl}?${queryParamsManagerService.getQueryString()}`;
  };

  return (
    <Grid container data-testid={'detail_page-detail_navigation'}>
      <Grid container alignItems="flex-start" justifyContent="space-between" spacing={0}>
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
        <Grid item container justifyContent="center" lg={8} md={8} sm={8} xs={12}>
          <Grid container justifyContent="center" alignItems="center" spacing={0}>
            <Grid
              item
              container
              lg={12}
              md={12}
              sm={12}
              xs={6}
              justifyContent={isXsDown ? 'flex-start' : 'center'}
            >
              <DetailNavigationLink
                href={`/${queryParameters}`}
                text={t('search.results.title')}
                ariaLabel={t('search.results.backTo')}
                Icon={isXsDown ? <ArrowBackIosIcon /> : null}
              />
            </Grid>
            <Hidden smUp>
              <Grid
                item
                container
                justifyContent="flex-end"
                lg={12}
                md={12}
                sm={12}
                xs={6}
              >
                {renderActions && renderActions()}
              </Grid>
            </Hidden>
          </Grid>
          {children}
        </Grid>
        <Hidden xsDown>
          <Grid item container justifyContent="flex-end" lg={2} md={2} sm={2}>
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
