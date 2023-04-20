import { ApolloError, gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import {
  QueryRoot,
  ComponentComponentsSmbResearchModal,
} from '../../../generated/graphql';

const FetchResearchModal = gql`
  query fetchResearchModal($lang: I18NLocaleCode) {
    strapi_smb {
      smbResearchpage(locale: $lang, publicationState: LIVE) {
        data {
          attributes {
            header
            modalDialog {
              downloadSection {
                buttonText
                header
                id
                text
              }
              webSection {
                buttonLink
                buttonText
                header
                id
                text
              }
            }
          }
        }
      }
    }
  }
`;

class ResearchRepository {
  fetchResearchModal(lang: string): {
    loading: boolean;
    error: ApolloError | undefined;
    data: ComponentComponentsSmbResearchModal | null;
    title: string;
  } {
    const { loading, error, data } = useQuery<QueryRoot>(FetchResearchModal, {
      variables: {
        lang: lang,
      },
    });

    let resultData = null;
    let resultDataTitle = '';

    if (
      !loading &&
      data &&
      data.strapi_smb &&
      data?.strapi_smb.smbResearchpage?.data?.attributes?.modalDialog
    ) {
      resultData =
        data.strapi_smb.smbResearchpage?.data?.attributes?.modalDialog;
    }

    if (
      !loading &&
      data &&
      data.strapi_smb &&
      data.strapi_smb.smbResearchpage?.data?.attributes?.header
    ) {
      resultDataTitle =
        data.strapi_smb.smbResearchpage?.data?.attributes?.header;
    }
    return { loading, error, data: resultData, title: resultDataTitle };
  }
}

export default ResearchRepository;
