import React from 'react';
import { render } from '@testing-library/react';
import {
  IMockTourData,
  mockCollections,
  mockConfig,
  mockTourData,
  MockTourDesktopComponent,
} from './_mocks_';

import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

describe('GuiderPage component render', () => {
  it('render MockTourDesktopComponent correctly', () => {
    const history = createMemoryHistory();
    const guidePageDesktop = render(
      <Router history={history}>
        <MockTourDesktopComponent
          config={mockConfig}
          mockCollection={mockCollections}
          mockTourData={mockTourData as IMockTourData}
        />
        ,
      </Router>,
    );
    expect(guidePageDesktop).toMatchSnapshot();
  });
});
