import { ApolloError, gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { QueryRoot, SmbIntroSlides, SmbIntroTextModules } from '../generated/graphql';

const FetchIntro = gql`
    query FetchIntro($lang: String!) {
        smb_intro_slides {
            image
            intro_slide_translations(where: { language: { lang: { _eq: $lang } } }) {
                title
            }
        }
        smb_intro_text_modules(order_by: { sequence: asc }) {
            title_color
            text_color
            text_area_color
            module_background_color
            link
            intro_text_module_type {
                value
            }
            intro_text_module_translations(where: { language: { lang: { _eq: $lang } } }) {
                title
                subtitle
                content
                link_caption
            }
        }
    }
`;

class IntroRepository {
    fetchIntro(
        lang: string,
    ): {
        loading: boolean;
        error: ApolloError | undefined;
        data: { sliderData: Array<SmbIntroSlides> | null; textModulesData: Array<SmbIntroTextModules> | null };
    } {
        const { loading, error, data } = useQuery<QueryRoot>(FetchIntro, {
            variables: {
                lang: lang,
            },
        });
        let resultDataSlider = null;
        let resultDataTextModules = null;

        if (!loading && data) {
            resultDataSlider = data.smb_intro_slides;
            resultDataTextModules = data.smb_intro_text_modules;
        }

        return { loading, error, data: { sliderData: resultDataSlider, textModulesData: resultDataTextModules } };
    }
}

export default IntroRepository;
