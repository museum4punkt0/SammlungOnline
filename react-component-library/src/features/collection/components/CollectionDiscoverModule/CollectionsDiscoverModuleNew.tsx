/* eslint-disable react/jsx-key */
import { Grid } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import './collectionsDiscoverModule.scss';
import { LinkBuilder } from '../../../../utils/LinkBuilder';
import { CollectionCard } from '../CollectionCard/CollectionCardNew';
import { CollectionsContext } from '../../types/CollectionsContext';

export function CollectionsDiscoverModuleNew({
  section = '',
}: {
  collectionModuleClasses?: string;
  section?: string;
}): ReactElement {
  const { t } = useTranslation();
  const link = new LinkBuilder();

  return (
    <CollectionsContext.Consumer>
      {(collectionsContext: { collections: any[] }): ReactElement => (
        <div id={'CollectionsModule'} className={'collection-card-max-width'}>
          <Grid
            container={true}
            direction={'row'}
            alignItems={'center'}
            data-testid={'collection-discover-module-wrapper'}
          >
            {collectionsContext.collections.map(
              (collectionContextData, index) => (
                <Grid
                  item={true}
                  key={index}
                  className={'collection-card-wrapper'}
                >
                  <CollectionCard
                    data-testid={'collection-discover-module-cards-wrapper'}
                    image={collectionContextData.previewImageCard}
                    title={collectionContextData.title}
                    subtitle={collectionContextData.subtitle}
                    section={section}
                    actionText={t('collections module discover button')}
                    href={link.getTopicsHref(
                      collectionContextData.id,
                      collectionContextData.platform,
                    )}
                  />
                </Grid>
              ),
            )}
          </Grid>
        </div>
      )}
    </CollectionsContext.Consumer>
  );
}
