import { ExhibitModel } from '@smb/smb-react-components-library';
import { IConfigurableForEnvironment } from './index';

export interface IExhibitInfoItemConfig extends IConfigurableForEnvironment {
  title: string;
  type: string;
  predicate: (exhibit: ExhibitModel) => { content: string; content2: string };
}
