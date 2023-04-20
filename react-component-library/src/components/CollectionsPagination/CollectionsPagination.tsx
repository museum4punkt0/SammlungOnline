/* eslint-disable no-console */
import React, { ReactElement } from 'react';

import './collectionsPagination.scss';
import { CollectionCard } from '../../features/collection/components/CollectionCard/CollectionCardNew';

function CollectionsPagination({ data }: { data: any }): ReactElement {
  return (
    <>
      {data.length > 0 && (
        <div
          id={'CollectionsModule'}
          className={'collections-pagination'}
          data-testid={'collection-discover-module-wrapper'}
        >
          {data.map((collectionData: any, index: number) => (
            <CollectionCard
              key={`${index}_${collectionData.id}`}
              data-testid={'collection-discover-module-cards-wrapper'}
              title={collectionData.title}
              subtitle={collectionData.subtitle}
              image={collectionData.image}
              section={collectionData.section}
              actionText={collectionData.actionText}
              href={collectionData.href}
              target={collectionData.target}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default CollectionsPagination;
