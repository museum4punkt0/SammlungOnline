import { ILink } from '../link.interface';

import { EExhibitAsideLinks } from '../../enums/exhibit-aside-links.enum';

export interface IAsideContainerItem {
  title: string;
  links?: ILink[];
  type: EExhibitAsideLinks;
}
