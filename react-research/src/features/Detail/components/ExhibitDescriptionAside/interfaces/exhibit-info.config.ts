import { ExhibitModel } from '@smb/smb-react-components-library';
import { IConfigurableForEnvironment } from '../../../../../config/interfaces/configurable-for-environment.interface';

export interface IExhibitInfoItemConfig extends IConfigurableForEnvironment {
  title: string;
  predicate: (exhibit: ExhibitModel) => string;
}
