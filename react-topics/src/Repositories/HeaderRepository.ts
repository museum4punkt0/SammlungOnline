import { ApolloError, gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { QueryRoot, SmbHeader } from '../generated/graphql';

const FetchHeader = gql`
    query FetchHeader($lang: String!) {
        smb_header(order_by: { id: asc }) {
            href
            color
            drawer_color
            header_translations(where: { language: { lang: { _eq: $lang } } }) {
                subtitle
                title
            }
        }
    }
`;

class HeaderRepository {
    fetchHeader(lang: string): { loading: boolean; error: ApolloError | undefined; data: Array<SmbHeader> | null } {
        const { loading, error, data } = useQuery<QueryRoot>(FetchHeader, {
            variables: { lang: lang },
        });
        let resultData = null;

        if (!loading && data) {
            resultData = data.smb_header;
        }

        return { loading, error, data: resultData };
    }
}

export default HeaderRepository;
