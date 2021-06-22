import { ExhibitModel } from 'smb-react-components-library';

export interface ISearchExhibitsApiResponse {
    total: number;
    objects: ExhibitModel[];
}
