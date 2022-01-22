import React from 'react';

import { ExhibitModel } from '@smb/smb-react-components-library';

import { Grid } from '@material-ui/core';
import { IExhibit, SearchResultRow } from '../SearchResultRow/SearchResultRow';

interface ISearchResultListProps {
  data: Array<ExhibitModel>;
  onClick?: (item: ExhibitModel, index: number) => void;
}

const SearchResultsList: React.FC<ISearchResultListProps> = ({ data, onClick }) => {
  return (
    <Grid container>
      {data.map((searchResultItem, index) => {
        const exhibit: IExhibit = {
          identNumber: searchResultItem.identNumber,
          title: searchResultItem.title || '',
          dating: searchResultItem.dating?.join(','),
          src: searchResultItem.src,
        };

        return (
          <SearchResultRow
            key={searchResultItem.id}
            id={searchResultItem.id}
            exhibit={exhibit}
            onClick={() => onClick && onClick(searchResultItem, index)}
          />
        );
      })}
    </Grid>
  );
};

export default SearchResultsList;
