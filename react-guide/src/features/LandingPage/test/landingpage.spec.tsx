import React from 'react';
import { render } from '@testing-library/react';
import {
  mockCollection,
  MockCollectionsModule,
  MockSliderComponent,
} from './_mocks_';
import { IMockCollection } from './_mocks_/types';

describe('LandingPage component render', () => {
  it('render Slider correctly', () => {
    const slider = render(
      <MockSliderComponent
        mockCollection={mockCollection as IMockCollection[]}
      />,
    );
    expect(slider).toMatchSnapshot();
  });
  it('render  CollectionsModule correctle ', () => {
    // const collectionModule = render(
    //   <MockCollectionsModule mockCollection={mockCollection as any} />,
    // );
    // expect(collectionModule).toMatchSnapshot;
  });
});
