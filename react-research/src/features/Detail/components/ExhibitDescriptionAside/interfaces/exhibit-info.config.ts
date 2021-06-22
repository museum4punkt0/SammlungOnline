import { ExhibitModel } from 'smb-react-components-library';
import { IConfigurableForEnvironment } from '../../../../../core/interfaces/configurable-for-environment.interface';

export interface IExhibitInfoItemConfig extends IConfigurableForEnvironment {
    title: string;
    predicate: (exhibit: ExhibitModel) => string;
}
