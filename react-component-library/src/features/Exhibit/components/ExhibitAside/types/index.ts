import { IAsideInfoItem } from '../../../definitions/types/aside/aside-info-item.interface';
import { IAsideContainerItem } from '../../../definitions/types/aside/aside-container-item.interface';
import { ILink } from '../../../definitions/types/link.interface';
import { EExhibitAsideLinks } from '../../../definitions/enums/exhibit-aside-links.enum';

export interface IExhibitAsideProps {
  infoItems: IAsideInfoItem[];
  containerElements: IAsideContainerItem[];
  creditLine?: string;
}
export interface IExhibitAsideTextProps {
  title: string;
  content: string;
}
export interface IExhibitAsideTextProps {
  title: string;
  content: string;
}

export interface IExhibitAsideLinksProps {
  title: string;
  links?: ILink[];
  type: EExhibitAsideLinks;
}
