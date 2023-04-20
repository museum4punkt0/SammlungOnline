/* eslint no-console: ["error", { allow: ["log"] }] */
import { ApolloError, gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import {
  QueryRoot,
  Maybe,
  SmbSiteConfig,
  SmbGuidepageEntity,
  SmbTopicspageEntity,
} from '../../../generated/graphql';

// Query all categories.
const FetchSiteConfig = gql`
  query fetchSiteConfig($lang: I18NLocaleCode) {
    strapi_smb {
      smbSiteConfig(locale: $lang, publicationState: LIVE) {
        data {
          attributes {
            localizations(publicationState: LIVE) {
              data {
                attributes {
                  locale
                  legalPages {
                    ... on ComponentComponentsLegalPages {
                      slug
                    }
                  }
                }
              }
            }
            headerMenuItems {
              headline
              subHeadline
              href
              id
              type
            }
            contactTextBlock {
              headline
              linkText
              linkUrl
              subHeadline
              text
            }
            contactVideoBlock {
              subHeadline
              linkUrl
              linkText
              headline
              assets {
                data {
                  attributes {
                    alternativeText
                    caption
                    url
                  }
                }
              }
            }
            copyright
            legalPages {
              ... on ComponentComponentsLegalPages {
                header
                slug
                footerLink
                matomo
                block {
                  id
                  text
                  assets {
                    data {
                      attributes {
                        url
                        alternativeText
                      }
                    }
                  }
                  videoAssets {
                    data {
                      attributes {
                        alternativeText
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const FetchGuidePage = gql`
  query FetchGuidePage($lang: I18NLocaleCode) {
    strapi_smb {
      smbGuidepage(locale: $lang, publicationState: LIVE) {
        data {
          attributes {
            fallbackHeader
            fallbackText
          }
        }
      }
    }
  }
`;

const FetchTopicPage = gql`
  query FetchTopicPage($lang: I18NLocaleCode) {
    strapi_smb {
      smbTopicspage(locale: $lang, publicationState: LIVE) {
        data {
          attributes {
            heroFallbackHeader
            heroFallbackText
            heroFallbackAsset {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;

class SiteConfigRepository {
  fetchSiteConfig(lang: string): {
    loading: boolean;
    error: ApolloError | undefined;
    data: Maybe<SmbSiteConfig> | null;
  } {
    const { loading, error, data } = useQuery<QueryRoot>(FetchSiteConfig, {
      variables: {
        lang: lang,
      },
    });
    let resultData: Maybe<SmbSiteConfig> | null = null;
    if (
      !loading &&
      data &&
      data.strapi_smb &&
      data.strapi_smb.smbSiteConfig?.data?.attributes
    ) {
      resultData = data.strapi_smb.smbSiteConfig?.data?.attributes;
    }

    return { loading, error, data: resultData };
  }

  fetchGuidePage(lang: string): {
    loading: boolean;
    error: ApolloError | undefined;
    data: Maybe<SmbGuidepageEntity> | null | undefined;
  } {
    const { loading, error, data } = useQuery<QueryRoot>(FetchGuidePage, {
      variables: {
        lang: lang,
      },
    });
    let resultData = null;

    if (!loading && data && !error) {
      resultData = data?.strapi_smb?.smbGuidepage?.data;
    }

    return { loading, error, data: resultData };
  }

  fetchTopicPage(lang: string): {
    loading: boolean;
    error: ApolloError | undefined;
    data: Maybe<SmbTopicspageEntity> | null | undefined;
  } {
    const { loading, error, data } = useQuery<QueryRoot>(FetchTopicPage, {
      variables: {
        lang: lang,
      },
    });
    let resultData = null;

    if (!loading && data && !error) {
      resultData = data?.strapi_smb?.smbTopicspage?.data;
    }

    return { loading, error, data: resultData };
  }
}

export default SiteConfigRepository;
