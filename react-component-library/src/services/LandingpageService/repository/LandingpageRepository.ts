/* eslint no-console: ["error", { allow: ["log"] }] */
import { ApolloError, gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import {
  QueryRoot,
  SmbLandingpage,
  Maybe,
  SmbLandingpageModuleDynamicZone,
} from '../../../generated/graphql';

// Query all categories.
const FetchLandingpage = gql`
  query fetchLandingpage($lang: I18NLocaleCode) {
    strapi_smb {
      smbLandingpage(locale: $lang, publicationState: LIVE) {
        data {
          attributes {
            createdAt
            publishedAt
            updatedAt
            heroSwiperItems {
              id
              title
              href
              caption
              image {
                data {
                  id
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
  }
`;

// Query all categories.
const FetchLandingpageSections = gql`
  query fetchLandingpageSections($lang: I18NLocaleCode) {
    strapi_smb {
      smbLandingpage(locale: $lang, publicationState: LIVE) {
        data {
          attributes {
            module {
              ... on ComponentComponentsSmbSection {
                id
                Type
                CollectionsBlock {
                  headline
                  text
                  type
                  cardCtaText
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
                HighlightsBlock {
                  type
                  text
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
                SearchButtonBlock {
                  headline
                  text
                  searchButtonGroupHeadline1
                  searchButtonGroupHeadline2
                  searchButtonGroupHeadline3
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
                TextBlock {
                  headline
                  subHeadline
                  text
                  linkText
                  linkUrl
                }
                VideoBlock {
                  assets {
                    data {
                      attributes {
                        alternativeText
                        caption
                        url
                      }
                    }
                  }
                  headline
                  subHeadline
                  linkUrl
                  linkText
                }
              }
            }
          }
        }
      }
    }
  }
`;

class LandingpageRepository {
  fetchLandingpageData(lang: string): {
    loading: boolean;
    error: ApolloError | undefined;
    data: SmbLandingpage | null;
  } {
    const { loading, error, data } = useQuery<QueryRoot>(FetchLandingpage, {
      variables: {
        lang: lang,
      },
    });
    let resultData = null;

    if (
      !loading &&
      data &&
      data.strapi_smb &&
      data?.strapi_smb.smbLandingpage?.data?.attributes?.heroSwiperItems?.length
    ) {
      resultData = data.strapi_smb?.smbLandingpage?.data?.attributes;
    }
    return { loading, error, data: resultData };
  }

  fetchLandingpageSections(lang: string): {
    loading: boolean;
    error: ApolloError | undefined;
    data: Maybe<Array<Maybe<SmbLandingpageModuleDynamicZone>>> | null;
  } {
    const { loading, error, data } = useQuery<QueryRoot>(
      FetchLandingpageSections,
      {
        variables: {
          lang: lang,
        },
      },
    );
    let resultData: Maybe<
      Array<Maybe<SmbLandingpageModuleDynamicZone>>
    > | null = null;

    if (
      !loading &&
      data &&
      data.strapi_smb &&
      data.strapi_smb.smbLandingpage?.data?.attributes?.module?.length
    ) {
      resultData = data.strapi_smb.smbLandingpage?.data?.attributes?.module;
    }

    return { loading, error, data: resultData };
  }
}

export default LandingpageRepository;
