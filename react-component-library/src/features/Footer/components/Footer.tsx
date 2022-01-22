import React from 'react';

import Container from '@material-ui/core/Container';
import { Paper, Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';

import FooterGrid from './FooterGrid';

import { useTranslation } from 'react-i18next';

import useStyles from './footer.jss';
import { IFooterProps } from '../types';

import { TextModuleType, TextSection } from 'src';
export const Footer: React.FC<IFooterProps> = ({ configuration }) => {
  const { t } = useTranslation();

  const currentYear = new Date().getFullYear();
  const copyright = t('footer.copyright', { year: currentYear });

  const links = {
    col1: [
      {
        text: t('footer.intro'),
        href: configuration.INTRO_DOMAIN,
      },
      {
        text: t('footer.research'),
        href: configuration.RESEARCH_DOMAIN,
      },
      {
        text: t('footer.topics'),
        href: configuration.TOPICS_DOMAIN,
      },
      {
        text: t('footer.guide'),
        href: configuration.GUIDE_DOMAIN,
      },
    ],
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
    col4: [
      {
        text: t('footer.imprint'),
        href: `${configuration.INTRO_DOMAIN}/imprint`,
      },
      {
        text: t('footer.privacy'),
        href: `${configuration.INTRO_DOMAIN}/privacy`,
      },
      {
        text: t('footer.accessibility'),
        href: `${configuration.INTRO_DOMAIN}/accessibility`,
      },
      {
        text: t('footer.contact'),
        href: 'mailto: smb-digital@smb.spk-berlin.de',
      },
    ],
  };

  const textSectionData = {
    title: t('footer.contactSection.title'),
    text: t('footer.contactSection.text'),
    subtitle: t('footer.contactSection.subtitle'),
    textColor: 'black',
    titleColor: 'black',
    textAreaColor: 'rgb(211, 211, 211)',
    moduleBackgroundColor: 'white',
    link: {
      href: t('footer.contactSection.link.href'),
      caption: t('footer.contactSection.link.text'),
    },
    moduleType: TextModuleType.TEXT,
  };

  const classes = useStyles();

  return (
    <React.Fragment>
      <TextSection textSectionData={textSectionData}></TextSection>
      <Container
        className={classes.wrapper}
        disableGutters={true}
        maxWidth="lg"
      >
        <FooterGrid className={classes.footerGrid}>
          <Paper className={classes.footerCard}>
            {links.col1.map((link, i) => (
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
            {links.col2.map((link, i) => (
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
            {links.col3.map((link, i) => (
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
            {links.col4.map((link, i) => (
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
          align="right"
          variant="body1"
          style={{ color: 'white' }}
        >
          {copyright}
        </Typography>
      </Container>
    </React.Fragment>
  );
};
