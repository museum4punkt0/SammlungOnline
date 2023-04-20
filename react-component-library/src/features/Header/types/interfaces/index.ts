import { IConfiguration } from '../../../../config/configuration';
import React, { ReactElement } from 'react';

export interface IHeaderLink {
  title: string;
  subtitle: string;
  color: string;
  type: string;
  drawerColor: string;
  href: string;
}
export interface IAppHeaderProps {
  configuration: IConfiguration;
  isBlackBackground?: boolean;
  shouldDisplayLang?: boolean;
  currentPortal: string;
}

export interface IHeaderColorPalette {
  main?: string;
  secondary?: string;
}

export interface IHeaderLinkProps {
  title: string;
  subtitle: string;
  href: string;
  selected: boolean;
  color: string;
  selectedColor: string;
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
  link: string;
}

export interface IAppHeaderToolbarProps {
  configuration?: IConfiguration;
  title: string;
  type: string;
  logoLink: string;
  color: string;
  shouldDisplayLang?: boolean;
  localizations?: {
    main: string[];
    options: string[];
  };
  onMenuOpen?: () => void;
}
