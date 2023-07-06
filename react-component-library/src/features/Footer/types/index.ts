import { IConfiguration } from '../../../config/configuration';

export interface IFooterProps {
  configuration: IConfiguration;
  showContactSection: boolean;
}

export enum EFooterLinkType {
  internal,
  external
}

export interface IFooterLink {
  text: string;
  href: string;
  type: EFooterLinkType;
}