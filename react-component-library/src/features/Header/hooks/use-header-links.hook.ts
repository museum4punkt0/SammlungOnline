import { useTranslation } from 'react-i18next';

import { IConfiguration } from '../../../config/configuration';
import { IHeaderLink } from '../types/interfaces';


const useHeaderLinks = (configuration: IConfiguration): IHeaderLink[] => {
  const { t } = useTranslation();

  return [
    {
      href: configuration.INTRO_DOMAIN,
      color: '#ffffff',
      drawerColor: '#000000',
      title: t('header.intro.title'),
      subtitle: t('header.intro.subtitle'),
    },
    {
      href: configuration.RESEARCH_DOMAIN,
      color: '#000000',
      drawerColor: '#ffffff',
      title: t('header.research.title'),
      subtitle: t('header.research.subtitle'),
    },
    {
      href: configuration.TOPICS_DOMAIN,
      color: '#F9FF04',
      drawerColor: '#000000',
      title: t('header.topics.title'),
      subtitle: t('header.topics.subtitle'),
    },
    {
      href: configuration.GUIDE_DOMAIN,
      color: '#F25B5B',
      drawerColor: '#d3d3d3',
      title: t('header.tours.title'),
      subtitle: t('header.tours.subtitle'),
    },
  ];
};

export default useHeaderLinks;
