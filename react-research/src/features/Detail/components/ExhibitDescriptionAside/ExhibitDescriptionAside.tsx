import React from 'react';
import { useTranslation } from 'react-i18next';

import infoItemsConfiguration from './config/exhibit-info.config';

import { ExhibitModel } from 'smb-react-components-library';
import { EExhibitAsideLinks } from '../../enums/exhibit-aside-links.enum';
import ExhibitAside from '../ExhibitAside/ExhibitAside';

import { useCoreContext } from '../../../../core/store/core.context';
import { useDependency } from '../../../../core/store/dependency.context';

interface IExhibitDescriptionAsideProps {
    exhibit: ExhibitModel;
}

const ExhibitDescriptionAside: React.FC<IExhibitDescriptionAsideProps> = ({ exhibit }) => {
    const { configuration } = useCoreContext();
    const { toursService, topicsService } = useDependency();

    const { t } = useTranslation();

    const infoItemsConfigurationForEnvironment = infoItemsConfiguration.filter(({ stages }) => {
        return stages.includes(configuration.stage);
    });

    const { data: tours } = toursService.findToursInfoByExhibitId(exhibit.id);
    const { data: topics } = topicsService.findTopicsInfoByExhibitId(exhibit.id);

    const asideContainerElements = [
        {
            title: t('details.aside.topic'),
            type: EExhibitAsideLinks.TOPIC,
            links: topics,
        },
        {
            title: t('details.aside.tours'),
            type: EExhibitAsideLinks.GUIDE,
            links: tours,
        },
        {
            title: t('details.aside.contact'),
            type: EExhibitAsideLinks.TEXT,
            links: [
                {
                    caption: 'smb-digital@smb.spk-berlin.de',
                    href: `mailto: smb-digital@smb.spk-berlin.de`,
                },
            ],
        },
    ];

    const infoItems = infoItemsConfigurationForEnvironment.map((infoItem) => {
        return { title: t(infoItem.title), content: infoItem.predicate(exhibit) };
    });

    const asideContainersWithLinks = asideContainerElements.filter((containerItem) => !!containerItem.links?.length);

    return (
        <ExhibitAside
            creditLine={exhibit.creditLine}
            infoItems={infoItems}
            containerElements={asideContainersWithLinks}
        />
    );
};

export default ExhibitDescriptionAside;
