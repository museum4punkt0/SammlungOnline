/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Paper, Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { Sections } from 'src';
import FooterGrid from './FooterGrid';
import CommonTheme from '../../../typografie/CommonTheme';
import { IFooterProps } from '../types';

import useStyles from './footer.jss';
import './footer.scss';

import LanguageService from '../../../utils/LanguageService';
import { SiteConfigService } from 'src/services/SiteConfig';

export const Footer: React.FC<IFooterProps> = ({
  configuration,
  showContactSection,
}) => {
  // const [withContactSection, setWithContactSection] = useState<boolean>(true);
  const [col1, setCol1] = useState<Array<any> | undefined | []>([]);
  const [col4, setCol4] = useState<
    Array<{ name: string; path: string }> | undefined | []
  >([]);
  const [copyright, setCopyright] = useState<string>('');
  const [cardBlock, setCardBlock] = useState<Array<any> | undefined | []>([]);
  const siteFooterData = new SiteConfigService();
  const {
    loading,
    data: { footerData },
  } = siteFooterData.getSiteConfigData();

  useEffect(() => {
    if (!loading) {
      setCol1(footerData?.links as any);
      setCol4(footerData?.staticRoutes);
      const currentYear = new Date().getFullYear();
      const copyrightStrapi = footerData?.copyright
        ? footerData?.copyright
        : '';
      const copyright = `${currentYear} ${copyrightStrapi}`;
      setCopyright(copyright);
      setCardBlock(footerData?.section as any);
    }
  }, [loading]);
  const { t } = useTranslation();
  const getCurrentLocale = () => {
    const defaultLang = 'de';
    const lang = LanguageService.getCurrentStrapiLanguage();
    let currentLocale = '';

    if (lang !== defaultLang) {
      currentLocale = `/${currentLocale}${lang}`;
    }

    return currentLocale;
  };

  const getStaticRoutes = (
    col: { name: string; path: string }[] | undefined,
  ) => {
    if (col)
      return col.map((route) => {
        return {
          text: route.name,
          href: `${configuration.INTRO_DOMAIN}${getCurrentLocale()}/${
            route.path
          }`,
        };
      });
    else return [];
  };

  const links = {
    col1: col1 ?? [],
    col2: [
      {
        text: t('footer.staatliche'),
        href: 'https://www.smb.museum/home',
      },
      {
        text: t('footer.blog'),
        href: 'https://blog.smb.museum/',
      },
      {
        text: t('footer.newsletter'),
        href: 'https://www.smb.museum/newsletter/abonnieren',
      },

      {
        text: t('footer.webshop'),
        href: 'https://www.smb-webshop.de',
      },
    ],
    col3: [
      {
        text: 'Facebook',
        href: 'https://www.facebook.com/staatlichemuseenzuberlin',
      },
      {
        text: 'Instagram',
        href: 'https://www.instagram.com/staatlichemuseenzuberlin',
      },
      {
        text: 'Youtube',
        href: 'https://www.youtube.com/user/smbchannel',
      },
    ],
    col4: getStaticRoutes(col4),
  };

  const classes = useStyles();

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
                {links.col1.length > 0 &&
                  links.col1.map((link: { text: string; href: string }, i) => (
                    <React.Fragment key={i}>
                      <Link
                        className={classes.link}
                        data-cy={`footer-link-col1-${i}`}
                        href={link.href}
                        color={'inherit'}
                      >
                        <Typography variant={'caption'} color={'inherit'}>
                          {link.text}
                        </Typography>
                      </Link>
                    </React.Fragment>
                  ))}
              </Paper>
              <Paper className={classes.footerCard}>
                {links.col2.length > 0 &&
                  links.col2.map((link: { text: string; href: string }, i) => (
                    <React.Fragment key={i}>
                      <Link
                        data-cy={`footer-link-col2-${i}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classes.linkExternal}
                        href={link.href}
                        color={'inherit'}
                      >
                        <Typography variant={'caption'} color={'inherit'}>
                          {link.text}
                        </Typography>
                      </Link>
                    </React.Fragment>
                  ))}
              </Paper>
              <Paper className={classes.footerCard}>
                {links.col3.length > 0 &&
                  links.col3.map((link: { text: string; href: string }, i) => (
                    <React.Fragment key={i}>
                      <Link
                        data-cy={`footer-link-col3-${i}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classes.linkExternal}
                        href={link.href}
                        color={'inherit'}
                      >
                        <Typography variant={'caption'} color={'inherit'}>
                          {link.text}
                        </Typography>
                      </Link>
                    </React.Fragment>
                  ))}
              </Paper>
              <Paper className={classes.footerCard}>
                {links.col4.length > 0 &&
                  links.col4.map((link: { text: string; href: string }, i) => (
                    <React.Fragment key={i}>
                      <Link
                        className={classes.link}
                        data-cy={`footer-link-col4-${i}`}
                        href={link.href}
                        color={'inherit'}
                      >
                        <Typography variant={'caption'} color={'inherit'}>
                          {link.text}
                        </Typography>
                      </Link>
                    </React.Fragment>
                  ))}
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
