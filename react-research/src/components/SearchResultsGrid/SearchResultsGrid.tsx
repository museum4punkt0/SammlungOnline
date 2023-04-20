import React from 'react';
import Grid from '@material-ui/core/Grid';
import { ExhibitModel } from '@smb/smb-react-components-library';

import { useCardConfiguration } from '../../hooks/index';
import { SearchResultCard } from '../index';

import useStyles from './searchResultGrid.jss';

interface ISearchResultGridProps {
  data: Array<ExhibitModel>;
  onClick?: (item: ExhibitModel, index: number) => void;
}

const SearchResultGrid: React.FC<ISearchResultGridProps> = ({ data, onClick }) => {
  const classes = useStyles();

  const getCardAttributes = (exhibit: any) => {
    const data = {
      title: exhibit?.title,
      attributes: useCardConfiguration({
        view: 'card',
        exhibit,
        lineBreak: '\n',
      }),
    };
    return data;
  };

  return (
    <Grid
      className={classes.cardWrapper}
      container
      spacing={0}
      direction="row"
      alignItems="flex-start"
      data-testid={'search-result-card-container'}
    >
      {data?.map((searchResultItem, index) => {
        return (
          <SearchResultCard
            key={searchResultItem.id}
            id={searchResultItem.id}
            src={searchResultItem.src}
            data={getCardAttributes(searchResultItem) as any}
            onClick={() => onClick && onClick(searchResultItem, index)}
          />
        );
      })}
    </Grid>
  );
};

export default SearchResultGrid;
