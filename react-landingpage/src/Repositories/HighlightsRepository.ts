import { ApolloError, gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { QueryRoot, SmbObjects } from '../generated/graphql';
import { ConfigLoader } from '../Util/ConfigLoader';
import { Config } from '../config';

const FetchHighlights = gql`
    query FetchHighlights($offset: Int!, $limit: Int!, $lang: String!, $attributes: [String!]!) {
        smb_highlights(order_by: { object: { updated_at: desc } }, offset: $offset, limit: $limit) {
            object {
                id
                attachments(order_by: { primary: desc }, limit: 1) {
                    attachment
                    primary
                }
                attribute_translations(
                    where: { attribute_key: { _in: $attributes }, language: { lang: { _eq: $lang } } }
                ) {
                    attribute_key
                    value
                }
            }
        }
        smb_highlights_aggregate {
            aggregate {
                count
            }
        }
    }
`;

class HighlightsRepository {
    private readonly config: Config;

    constructor() {
        this.config = ConfigLoader.CurrentConfig;
    }

    fetchHighlightObjects(
        offset = 0,
        limit: number = this.config.DATA_CONFIG.CAROUSEL_HIGHLIGHTS_COUNT,
        lang: string,
    ): { loading: boolean; error: ApolloError | undefined; data: Array<SmbObjects> | null; resultCount: number } {
        const { loading, error, data } = useQuery<QueryRoot>(FetchHighlights, {
            variables: {
                offset: offset,
                limit: limit,
                lang: lang,
                attributes: this.config.DATA_CONFIG.DISPLAY_TITLE_ATTRIBUTE_CANDIDATES,
            },
        });
        let resultData = null;
        let resultCount = 0;

        if (!loading && data) {
            resultData = data.smb_highlights.map((value) => value.object);
            if (data.smb_highlights_aggregate.aggregate?.count) {
                resultCount = data.smb_highlights_aggregate.aggregate?.count;
            }
        }

        return {
            loading,
            error,
            data: resultData,
            resultCount,
        };
    }
}

export default HighlightsRepository;
