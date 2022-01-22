import { IConfiguration } from '../../../../config/configuration';
import React, { ReactElement } from 'react';

export interface IHeaderLink {
  title: string;
  subtitle: string;
  color: string;
  drawerColor: string;
  href: string;
}
export interface IAppHeaderProps {
  configuration: IConfiguration;
}

export interface IHeaderColorPalette {
  main?: string;
  secondary?: string;
}

export interface IHeaderLinkProps {
  title: string;
  subtitle: string;
  href: string;
  color: string;
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
}
export interface INavigationDrawerProps {
  open: boolean;
  onClose: () => void;
  backgroundColor: string;
  children: ReactElement | ReactElement[];
}

export interface IHeaderLogoProps extends React.HTMLAttributes<HTMLElement> {
  color: string;
}

export interface IAppHeaderToolbarProps {
  title: string;
  color: string;
  onMenuOpen?: () => void;
}
