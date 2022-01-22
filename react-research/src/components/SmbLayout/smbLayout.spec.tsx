import React from 'react';
import 'jest-canvas-mock';
import { render } from '@testing-library/react';
import { createDependencies } from '../../context/dependency.context';
import { ApolloProvider } from '@apollo/react-hooks';
import { AppStage } from '../../config/enums/app-stage.enum';
import { Footer, Header } from '@smb/smb-react-components-library';
import DetailPage from '../../features/Detail/DetailPage';
import SearchPage from '../../features/Search/SearchPage';
import TestRenderer from 'react-test-renderer';
import { createBrowserHistory } from 'history';
import { MemoryRouter } from 'react-router-dom';

export const mockConfiguration = {
  ELASTIC_API_URL: 'https://smb-search.xailabs.dev/search',
  GRAPHQL_ENDPOINT: 'https://smb-api.xailabs.dev/v1/graphql',
  GUIDE_DOMAIN: 'https://smb-guide.xailabs.dev',
  IMAGE_PROVIDER_DOMAIN: 'https://smb-research.xailabs.dev',
  IMAGE_PROVIDER_ENDPOINT: 'https://smb-research.xailabs.dev/images',
  INTRO_DOMAIN: 'https://smb-landingpage.xailabs.dev',
  PRODUCTION_READY: false,
  RESEARCH_DOMAIN: 'http://localhost:3000',
  TOPICS_DOMAIN: 'https://smb-topics.xailabs.dev',
  stage: 'local' as AppStage,
};

const dependencyContext = createDependencies(mockConfiguration);
Date.now = jest.fn(() => 42);

describe('SmbLayout component render', () => {
  it('render Header correctly', () => {
    const header = render(
      <>
        <ApolloProvider client={dependencyContext.apolloClient}>
          <MemoryRouter>
            <Header configuration={mockConfiguration} />
          </MemoryRouter>
        </ApolloProvider>
      </>,
    );
    expect(header).toMatchSnapshot();
  });
  it('render Footer correctly', () => {
    const footer = render(
      <div>
        <ApolloProvider client={dependencyContext.apolloClient}>
          <MemoryRouter>
            <Footer configuration={mockConfiguration} />
          </MemoryRouter>
        </ApolloProvider>
      </div>,
    );
    expect(footer).toMatchSnapshot();
  });

  it('render DetailPage correctly', () => {
    const history = createBrowserHistory();
    const route = '/detail/:exhibitId/:exhibitTitle?';
    history.push(route);
    const detailPage = TestRenderer.create(
      <ApolloProvider client={dependencyContext.apolloClient}>
        <MemoryRouter>
          <DetailPage />
        </MemoryRouter>
      </ApolloProvider>,
    );
    expect(detailPage).toMatchSnapshot();
  });

  it('render SearchPage correctly', () => {
    const { container } = render(
      <ApolloProvider client={dependencyContext.apolloClient}>
        <MemoryRouter>
          <SearchPage />
        </MemoryRouter>
      </ApolloProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
