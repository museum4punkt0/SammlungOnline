import { ApolloError, gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import {
  ComponentComponentsSmbResearchModal,
  QueryRoot
} from '../../../generated/graphql';

interface MaintenanceModalData {
  showMaintenancePopup?: boolean;
  maintenanceText?: string;
  maintenanceTextLong?: string;
}

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

const FetchMaintenanceModal = gql`
  query FetchMaintenanceModal($lang: I18NLocaleCode) {
    strapi_smb {
      smbResearchpage(locale: $lang, publicationState: LIVE) {
        data {
          attributes {
            show_maintenance_popup,
            maintenance_text,
            maintenance_text_long
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




  fetchMaintenanceModal(lang: string): {
    loading: boolean;
    error: ApolloError | undefined;
    data: MaintenanceModalData | null;
  } {
    const { loading, error, data } = useQuery<QueryRoot>(FetchMaintenanceModal, {
      variables: {
        lang: lang,
      },
    });


    const resultData = {} as MaintenanceModalData

    if(!loading && data && data.strapi_smb ){
      if(data?.strapi_smb.smbResearchpage?.data?.attributes?.show_maintenance_popup){
        resultData['showMaintenancePopup'] = data?.strapi_smb.smbResearchpage?.data?.attributes?.show_maintenance_popup;
      }

      if(data?.strapi_smb.smbResearchpage?.data?.attributes?.maintenance_text){
        resultData['maintenanceText'] = data?.strapi_smb.smbResearchpage?.data?.attributes?.maintenance_text;
      }

      if(data?.strapi_smb.smbResearchpage?.data?.attributes?.maintenance_text_long){
        resultData['maintenanceTextLong'] = data?.strapi_smb.smbResearchpage?.data?.attributes?.maintenance_text_long;
      }
    }

    return { loading, error, data: resultData};
  }
}

export default ResearchRepository;
