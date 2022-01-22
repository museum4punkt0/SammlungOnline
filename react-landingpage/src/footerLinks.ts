import { TFunction } from 'i18next';
import { Config } from './config/config';

export const _links = (t: TFunction, config: Config) => {
  return {
    col1: [
      {
        text: t('footer Intro'),
        href: config.INTRO_DOMAIN,
      },
      {
        text: t('footer Recherche'),
        href: config.RESEARCH_DOMAIN,
      },
      {
        text: t('footer Themen'),
        href: config.TOPICS_DOMAIN,
      },
      {
        text: t('footer Touren'),
        href: config.GUIDE_DOMAIN,
      },
    ],
    col2: [
      {
        text: t('footer Staatliche'),
        href: 'https://www.smb.museum/home',
      },
      {
        text: t('footer Blog'),
        href: 'https://blog.smb.museum/',
      },
      {
        text: t('footer Newsletter'),
        href: 'https://www.smb.museum/newsletter/abonnieren',
      },

      {
        text: t('footer Webshop'),
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
        text: t('imprint'),
        href: config.INTRO_DOMAIN + '/imprint',
      },
      {
        text: t('privacy'),
        href: config.INTRO_DOMAIN + '/privacy',
      },
      {
        text: t('accessibility'),
        href: config.INTRO_DOMAIN + '/accessibility',
      },
    ],
  };
};

export function copyright(t: TFunction): string {
  return t('footer copyright', { year: new Date().getFullYear() });
}
