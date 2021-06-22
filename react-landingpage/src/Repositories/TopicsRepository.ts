import { ApolloError, gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { QueryRoot, SmbTopics } from '../generated/graphql';

const FetchTopics = gql`
    query FetchTopics($lang: String!) {
        smb_topics(order_by: { id: desc }) {
            id
            has_slide
            preview_image
            topics_translations(where: { language: { lang: { _eq: $lang } } }) {
                description
                title
            }
            objects {
                object {
                    id
                }
            }
        }
    }
`;

class TopicsRepository {
    fetchTopics(lang: string): { loading: boolean; error: ApolloError | undefined; data: Array<SmbTopics> | null } {
        const { loading, error, data } = useQuery<QueryRoot>(FetchTopics, { variables: { lang: lang } });
        let resultData = null;

        if (!loading && data) {
            resultData = data.smb_topics;
        }

        return { loading, error, data: resultData };
    }
}

export default TopicsRepository;
