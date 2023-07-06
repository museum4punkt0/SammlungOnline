import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Paper, Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { Sections } from 'src';
import FooterGrid from './FooterGrid';
import CommonTheme from '../../../typografie/CommonTheme';
import { IFooterProps, IFooterLink, EFooterLinkType } from '../types';

import useStyles from './footer.jss';
import './footer.scss';

import LanguageService from '../../../utils/LanguageService';
import { SiteConfigService } from 'src/services/SiteConfig';



const currentLocalePathSegment = (): string => {
  const defaultLang = LanguageService.getDefaultLanguage();
  const currentLang = LanguageService.getCurrentStrapiLanguage();
  return currentLang === defaultLang ? '' : `/${currentLang}`;
};

interface StrapiRoute {
  name: string; 
  path: string
}

export const Footer: React.FC<IFooterProps> = ({
  configuration,
  showContactSection,
}) => {

  const { t } = useTranslation();
  const classes = useStyles();
  
  const [col1, setCol1] = useState<Array<IFooterLink> | undefined>([]);
  const [col4, setCol4] = useState<Array<StrapiRoute> | undefined>([]);
  const [copyright, setCopyright] = useState<string>('');
  const [cardBlock, setCardBlock] = useState<Array<any> | undefined>([]);
  const siteFooterData = new SiteConfigService();
  const {
    loading,
    data: { footerData },
  } = siteFooterData.getSiteConfigData();


  useEffect(() => {
    if (!loading) {
      setCol1(footerData?.links as any); // {text:string, href:string}[]
      setCol4(footerData?.staticRoutes); // {name:string, path:string}[]
      const currentYear = new Date().getFullYear();
      const copyright = footerData?.copyright ?? 'Staatliche Museen zu Berlin';
      setCopyright(`${currentYear} ${copyright}`);
      setCardBlock(footerData?.section as any);
    }
  }, [loading]);

  const routesToLinks = (
    col: Array<StrapiRoute> | undefined,
  ): Array<IFooterLink> => {
    if (col) {
      const lang = currentLocalePathSegment();
      return col.map((route) => {
        const external = route.path.match(/^http(s)?:\/\/.+/);
        return {
          text: route.name,
          href: external ? route.path : `${configuration.INTRO_DOMAIN}${lang}/${route.path}`,
          type: external ? EFooterLinkType.external : EFooterLinkType.internal
        };
      });
    }
    else return [];
  };

  const links: { col1: Array<IFooterLink>, col2: Array<IFooterLink>, col3: Array<IFooterLink>, col4: Array<IFooterLink> } = {
    col1: col1 ?? [],
    col2: [
      {
        text: t('footer.staatliche'),
        href: 'https://www.smb.museum/home',
        type: EFooterLinkType.external
      },
      {
        text: t('footer.blog'),
        href: 'https://blog.smb.museum/',
        type: EFooterLinkType.external
      },
      {
        text: t('footer.newsletter'),
        href: 'https://www.smb.museum/newsletter/abonnieren',
        type: EFooterLinkType.external
      },
      {
        text: t('footer.webshop'),
        href: 'https://www.smb-webshop.de',
        type: EFooterLinkType.external
      },
    ],
    col3: [
      {
        text: 'Facebook',
        href: 'https://www.facebook.com/staatlichemuseenzuberlin',
        type: EFooterLinkType.external
      },
      {
        text: 'Instagram',
        href: 'https://www.instagram.com/staatlichemuseenzuberlin',
        type: EFooterLinkType.external
      },
      {
        text: 'Youtube',
        href: 'https://www.youtube.com/user/smbchannel',
        type: EFooterLinkType.external
      },
    ],
    col4: routesToLinks(col4),
  };

  const renderLink = (link: IFooterLink, i: number, col: number) => {
    return (
      <React.Fragment key={i}>
        <Link
          target={link.type === EFooterLinkType.external ? "_blank" : ""}
          rel={link.type === EFooterLinkType.external ? "noopener noreferrer" : ""}
          className={link.type === EFooterLinkType.external ? classes.linkExternal : classes.link}
          data-cy={`footer-link-col${col}-${i}`}
          href={link.href}
          color={'inherit'}
        >
          <Typography variant={'caption'} color={'inherit'}>
            {link.text}
          </Typography>
        </Link>
      </React.Fragment>
    )
  }

  return (
    <>
      <MuiThemeProvider theme={CommonTheme}>
        {showContactSection && cardBlock && (
          <Sections sections={[cardBlock] as any} isFooter={true} />
        )}

        <div className={classes.sectionWrapper}>
          <div className={classes.maxWidth}>
            <FooterGrid className={classes.footerGrid}>
              <Paper className={classes.footerCard}>
                {links.col1.length > 0 && links.col1.map((link: { text: string, href: string }, i) => renderLink({ ...link, type: EFooterLinkType.internal }, i, 1))}
              </Paper>
              <Paper className={classes.footerCard}>
                {links.col2.length > 0 && links.col2.map((link: IFooterLink, i) => renderLink(link, i, 2))}
              </Paper>
              <Paper className={classes.footerCard}>
                {links.col3.length > 0 && links.col3.map((link: IFooterLink, i) => renderLink(link, i, 3))}
              </Paper>
              <Paper className={classes.footerCard}>
                {links.col4.length > 0 && links.col4.map((link: IFooterLink, i) => renderLink(link, i, 4))}
              </Paper>
            </FooterGrid>

            <Typography
              display="block"
              variant="h5"
              component="p"
              className="footer__copyright"
              style={{ color: 'white' }}
            >
              &copy;{copyright}
            </Typography>
          </div>
        </div>
      </MuiThemeProvider>
    </>
  );
};
