import React from 'react';
import { Grid } from '@material-ui/core';
import { ExhibitModel } from '@smb/smb-react-components-library';

import { SearchResultRow } from '../index';
import { useCardConfiguration } from '../../hooks/index';

interface ISearchResultListProps {
  data: Array<ExhibitModel>;
  onClick?: (item: ExhibitModel, index: number) => void;
}

const SearchResultsList: React.FC<ISearchResultListProps> = ({ data, onClick }) => {
  const getCardAttributes = (exhibit: any) => {
    const data = {
      title: exhibit.title,
      attributes: useCardConfiguration({
        view: 'list',
        exhibit,
        lineBreak: '\n',
      }),
    };

    return data;
  };

  return (
    <Grid container>
      {data.map((searchResultItem, index) => {
        return (
          <SearchResultRow
            key={searchResultItem.id}
            id={searchResultItem.id}
            data={getCardAttributes(searchResultItem) as any}
            title={searchResultItem.title}
            src={searchResultItem.src}
            onClick={() => onClick && onClick(searchResultItem, index)}
          />
        );
      })}
    </Grid>
  );
};

export default SearchResultsList;
