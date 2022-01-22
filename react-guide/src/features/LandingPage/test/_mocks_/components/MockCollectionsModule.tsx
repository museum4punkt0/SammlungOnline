import useStyles from '../../../components/landingPage.jss';
import {
  CollectionsContext,
  CollectionsModule,
} from '@smb/smb-react-components-library';
import React from 'react';
import { IMockCollection } from '../types';

export const MockCollectionsModule = ({
  mockCollection,
}: {
  mockCollection: IMockCollection;
}) => {
  const classes = useStyles();
  return (
    <CollectionsContext.Provider
      value={{
        collections: [mockCollection],
        onCollectionClick: () => {
          // eslint-disable-next-line no-console
          console.log('test');
        },
      }}
    >
      <div
        style={{ padding: 10 }}
        data-testid={'page-content-collection-module-wrapper'}
      >
        <CollectionsModule collectionModuleClasses={classes.collectionModule} />
      </div>
    </CollectionsContext.Provider>
  );
};
