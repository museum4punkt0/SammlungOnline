/* eslint-disable no-console */
import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  ExhibitModel,
  getOrgUnitURL,
  IAttachment,
} from '@smb/smb-react-components-library';

import { infoItemsConfiguration } from '../../utils/configuration/index';
import { EExhibitAsideLinks } from '../../enums/index';
import { ExhibitAside } from '../index';

import { useCoreContext, useDependency } from '../../providers/index';
import { IAsideInfoItem } from '../../types/index';

interface IExhibitDescriptionAsideProps {
  exhibit: ExhibitModel;
  attachments: IAttachment[];
}

const ExhibitDescriptionAside: React.FC<IExhibitDescriptionAsideProps> = ({
  exhibit,
  attachments,
}) => {
  const { configuration } = useCoreContext();
  const { toursService, topicsService } = useDependency();

  const { t } = useTranslation();

  const infoItemsConfigurationForEnvironment = infoItemsConfiguration.filter(
    ({ stages }) => {
      return stages.includes(configuration.stage);
    },
  );

  const { data: tours } = toursService.findToursInfoByExhibitId(exhibit.id);
  const { data: topics } = topicsService.findTopicsInfoByExhibitId(exhibit.id);
  const collectionKey = exhibit.collectionKey;

  const getAsideContainerElementsLink = (
    caption: string,
    type: string,
    testData?: boolean,
  ) => {
    const link = testData ? window.location.href : getOrgUnitURL(collectionKey, type);
    if (link) {
      return [
        {
          caption: caption,
          href: link,
        },
      ];
    }
    return [];
  };

  const asideContainerElements = [
    {
      title: t('details.aside.topic'),
      type: EExhibitAsideLinks.TOPIC,
      // links: topics,
      links:
        configuration.stage === 'dev'
          ? getAsideContainerElementsLink(
              t('details.aside.topicTestData'),
              'anfrage',
              true,
            )
          : topics,
    },
    {
      title: t('details.aside.tours'),
      type: EExhibitAsideLinks.GUIDE,
      // links: tours,
      links:
        configuration.stage === 'dev'
          ? getAsideContainerElementsLink(
              t('details.aside.toursTestData'),
              'anfrage',
              true,
            )
          : tours,
    },
    /*{
      title: '',
      type: EExhibitAsideLinks.TEXT,
      links: getAsideContainerElementsLink(t('details.aside.image request'), 'anfrage'),
    },*/
    {
      title: '',
      type: EExhibitAsideLinks.TEXT,
      links: getAsideContainerElementsLink(
        t('details.aside.contact and feedback'),
        'email',
      ),
    },
  ];

  const infoItems: IAsideInfoItem[] = infoItemsConfigurationForEnvironment
    .map(infoItem => {
      return {
        title: t(infoItem.title),
        content: t(infoItem.predicate(exhibit).content),
        content2: t(infoItem.predicate(exhibit).content2),
        url:
          t(infoItem.type) === 'collection' ? getOrgUnitURL(collectionKey, 'url') : null,
      };
    })
    .filter(item => item.content || item.content2);

  const asideContainersWithLinks = asideContainerElements.filter(
    containerItem => !!containerItem.links?.length,
  );

  return (
    <ExhibitAside
      creditLine={exhibit.creditLine}
      infoItems={infoItems}
      containerElements={asideContainersWithLinks}
      shareImageUrl={attachments[0]?.src}
      exhibit={exhibit}
    />
  );
};

export default ExhibitDescriptionAside;
