import React from 'react';
import { ExhibitModel } from '@smb/smb-react-components-library';
import { ESearchResultView } from '../../enums/index';
import { SearchResultGrid, SearchResultsList } from '../index';

export interface ISearchContentProps {
  view: ESearchResultView;
  data: ExhibitModel[];
  onClick?: (item: ExhibitModel, index: number) => void;
}

export const SearchContent: React.FC<ISearchContentProps> = ({ view, data, onClick }) => {
  switch (view) {
    case ESearchResultView.GRID:
      return <SearchResultGrid data={data} onClick={onClick} />;
    default:
      return <SearchResultsList data={data} onClick={onClick} />;
  }
};
