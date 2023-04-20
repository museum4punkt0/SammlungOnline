import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import GridOnOutlinedIcon from '@material-ui/icons/GridOnOutlined';
import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';

import { ESearchResultView } from '../../enums/index';
import useStyles from './searchPagination.jss';

export interface ISwitchSearchResultViewProps {
  view: ESearchResultView;
  fontSize?: 'inherit' | 'large' | 'small' | 'default';
}

const SwitchSearchResultView: React.FC<ISwitchSearchResultViewProps> = ({
  fontSize,
  view,
}) => {
  if (view !== ESearchResultView.GRID) {
    return <GridOnOutlinedIcon fontSize={fontSize} />;
  }

  return <FormatListBulletedOutlinedIcon fontSize={fontSize} />;
};

interface ISearchPaginationProps {
  onViewChange?: () => void;
  total: number;
  offset: number;
  limit: number;
  view?: ESearchResultView;
  viewToggle?: boolean;
  onOffsetChange?: (offset: number) => void;
}

export const SearchPagination: React.FC<ISearchPaginationProps> = props => {
  const {
    view,
    viewToggle = true,
    onOffsetChange,
    offset,
    limit,
    total,
    onViewChange,
  } = props;

  const { t: translate } = useTranslation();

  const handleNext = () => {
    const newOffset = offset + limit < total ? offset + limit : total - limit;

    onOffsetChange && onOffsetChange(newOffset);
  };

  const handlePrevious = () => {
    const newOffset = offset - limit > 0 ? offset - limit : 0;

    onOffsetChange && onOffsetChange(newOffset);
  };

  const start = offset + 1;
  const end = offset + limit > total ? total : offset + limit;
  const iconLabel =
    view === ESearchResultView.GRID ? 'toggle list view' : 'toggle grid view';

  const classes = useStyles();

  return (
    <div className={classes.contentWrapper}>
      <div className={classes.flipPagesArea}>
        <div className={classes.flipPagesAreaInside}>
          <IconButton
            aria-label={translate('show previous search results')}
            color="inherit"
            disabled={start === 1}
            onClick={handlePrevious}
          >
            <ArrowBackIosOutlinedIcon />
          </IconButton>
          <Typography component="div" variant="subtitle1" className={classes.pagesTypo}>
            {start} - {end}
          </Typography>
          <IconButton
            aria-label={translate('show next search results')}
            color="inherit"
            disabled={end === total}
            onClick={handleNext}
            data-testid="next-icon-button"
          >
            <ArrowForwardIosOutlinedIcon />
          </IconButton>
        </div>
        <Typography component="div" variant="subtitle1" className={classes.pageCount}>
          <Trans t={translate} i18nKey={'search results controls object count'}>
            von {{ searchResultsCount: total }} Objekten
          </Trans>
        </Typography>
      </div>
      {viewToggle && view && (
        <div className={classes.flipViewArea}>
          <IconButton
            aria-label={translate(iconLabel)}
            data-testid="search_pagination-change-view-button"
            color="inherit"
            onClick={() => onViewChange && onViewChange()}
          >
            <SwitchSearchResultView view={view} fontSize="large" />
          </IconButton>
        </div>
      )}
    </div>
  );
};
