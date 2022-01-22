import { ExhibitModel } from '@smb/smb-react-components-library';

export interface ISearchExhibitsApiResponse {
  total: number;
  objects: ExhibitModel[];
}
