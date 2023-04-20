import React from 'react';
import { useTranslation } from 'react-i18next';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import './pagination.scss';

interface ISearchPaginationProps {
  onViewChange?: () => void;
  total: number;
  offset: number;
  limit: number;
  section?: string;

  onOffsetChange?: (offset: number) => void;
}

export const Pagination: React.FC<ISearchPaginationProps> = (props) => {
  const { onOffsetChange, offset, limit, total, section } = props;

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

  return (
    <div className={'pagination'}>
      <div className={'pagination__content'}>
        <IconButton
          aria-label={translate('show previous search results')}
          color="inherit"
          disabled={start === 1}
          onClick={handlePrevious}
        >
          <ArrowBackIosOutlinedIcon fontSize={'large'} viewBox="6 0 24 24" />
        </IconButton>
        <Typography
          component="div"
          variant="h5"
          className={'pagination__count__current'}
        >
          {start} - {end}
        </Typography>
        <IconButton
          aria-label={translate('show next search results')}
          color="inherit"
          disabled={end === total}
          onClick={handleNext}
          data-testid="next-icon-button"
        >
          <ArrowForwardIosOutlinedIcon
            fontSize={'large'}
            viewBox="-6 0 24 24"
          />
        </IconButton>
      </div>
      <Typography
        component="div"
        variant="h5"
        className={'pagination__count__total'}
      >
        {translate('pagination.from')} {total} {translate(`${section}`)}
      </Typography>
    </div>
  );
};
