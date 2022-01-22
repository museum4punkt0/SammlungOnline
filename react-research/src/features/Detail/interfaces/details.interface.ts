import { EExhibitAsideLinks } from '@smb/smb-react-components-library';

export interface IAsideContainerItem {
  title: string;
  links?: ILink[];
  type: EExhibitAsideLinks;
}
export interface ILink {
  href: string;
  target?: string;
  text?: string;
  caption?: string;
}
export interface IAsideInfoItem {
  title: string;
  content: string;
}
