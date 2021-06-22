import { ApolloError, gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { QueryRoot, SmbTours } from '../generated/graphql';

// fetch all tours
const FetchGuides = gql`
    query FetchGuides($lang: String!) {
        smb_tours {
            id
            number
            preview_image
            tours_translations(where: { language: { lang: { _eq: $lang } } }) {
                title
                subtitle
                abstract
            }
            tours_objects {
                object {
                    id
                }
            }
        }
    }
`;

class GuideRepository {

    fetchGuides(lang: string): { loading: boolean; error: ApolloError | undefined; data: Array<SmbTours> | null } {
        const { loading, error, data } = useQuery<QueryRoot>(FetchGuides, { variables: { lang: lang } });
        let resultData = null;

        if (!loading && data) {
            resultData = data.smb_tours;
            // console.log(data);
        }

        return { loading, error, data: resultData };
    }

    // fetchGuide(
    //             id: number,
    //             lang: string,
    //             setIsLoading: (value: boolean) => void,
    //             setData: (value: TourData | undefined) => void,
    //             setError: (value: undefined) => void) {
    //             setIsLoading(false);
        
    //             fetch("/data/guideData/guide_" + id + ".json")
    //                 .then(response => response.json())
    //                 .then(
    //                     (result) => {
    //                         setIsLoading(true);
    //                         setData(result ? result : undefined);
    //                     },
    //                     (error) => {
    //                         setIsLoading(true);
    //                         setError(error);
    //                     }
    //                 ).catch();
    //         }
    
}

export default GuideRepository;
