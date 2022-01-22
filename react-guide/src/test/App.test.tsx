import { ApolloProvider } from '@apollo/react-hooks';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import {
  Footer,
  Header,
  IConfiguration,
} from '@smb/smb-react-components-library';
import { render } from '@testing-library/react';

const mockClient = {
  cache: {},
  clearStoreCallbacks: [],
  defaultOptions: {},
  disableNetworkFetches: false,
  link: '',
  localState: '',
  mutate: () => false,
  query: () => false,
  queryDeduplication: true,
  queryManager: {},
  reFetchObservableQueries: () => false,
  resetStore: () => false,
  resetStoreCallbacks: [],
  store: {},
  typeDefs: undefined,
  version: '2.6.10',
  watchQuery: () => false,
};

const mockConfiguration = {
  CAROUSEL_CONFIG: {},
  ELASTIC_API_URL: '',
  GRAPHQL_ENDPOINT: 'https://smb-api.xailabs.dev/v1/graphql',
  GUIDE_DOMAIN: 'http://localhost:3000',
  IMAGE_PROVIDER_DOMAIN: 'https://smb-guide.xailabs.dev',
  IMAGE_PROVIDER_ENDPOINT: '',
  IMAGE_PROVIDER_PATH: '/images/',
  INTRO_DOMAIN: 'https://smb-landingpage.xailabs.dev',
  MEDIA_PLAYER_INTERVAL: 8000,
  PRODUCTION_READY: false,
  RESEARCH_DOMAIN: 'https://smb-research.xailabs.dev',
  TOPICS_DOMAIN: 'https://smb-topics.xailabs.dev',
};

describe('App component render', () => {
  it('render Header correctly', () => {
    const header = render(
      <>
        <ApolloProvider client={mockClient as any}>
          <MemoryRouter>
            <Header configuration={mockConfiguration as any} />
          </MemoryRouter>
        </ApolloProvider>
      </>,
    );
    expect(header).toMatchSnapshot();
  });
  it('render Footer correctly', () => {
    const footer = render(
      <>
        <ApolloProvider client={mockClient as any}>
          <MemoryRouter>
            <Footer configuration={mockConfiguration as any} />
          </MemoryRouter>
        </ApolloProvider>
      </>,
    );
    expect(footer).toMatchSnapshot();
  });
});
