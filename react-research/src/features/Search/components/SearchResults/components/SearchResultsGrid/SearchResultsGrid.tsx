import React from 'react';

import { ExhibitModel } from '@smb/smb-react-components-library';

import Grid from '@material-ui/core/Grid';

import { SearchResultCard } from '../SearchResultCard/SearchResultCard';

interface ISearchResultGridProps {
  data: Array<ExhibitModel>;
  onClick?: (item: ExhibitModel, index: number) => void;
}

const SearchResultGrid: React.FC<ISearchResultGridProps> = ({ data, onClick }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="flex-start"
      data-testid={'search-result-card-container'}
    >
      {data?.map((searchResultItem, index) => {
        return (
          <Grid item={true} lg={3} md={4} sm={6} xs={12} key={searchResultItem.id}>
            <SearchResultCard
              id={searchResultItem.id}
              src={searchResultItem.src}
              title={searchResultItem.title}
              onClick={() => onClick && onClick(searchResultItem, index)}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default SearchResultGrid;
