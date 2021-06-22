import LanguageService from './LanguageService';
import { ApolloError } from 'apollo-boost';
import IntroRepository from '../Repositories/IntroRepository';
import { SmbIntroSlides, SmbIntroTextModules } from '../generated/graphql';
// TODO remove component dependency
import { TextModuleType, TextSectionData } from '../View/Components/TextBox';
import { ConfigLoader } from '../Util/ConfigLoader';
import { Config } from '../config';
import ImageUrlBuilder from '../Util/ImageUrlBuilder';
import EnumUtil from '../Util/EnumUtil';
// import HighlightsService from './HighlightsService';
export interface IntroSlider {
    slideImage: string;
    slideText: string;
}
interface HighlightsContextData {
    image: string;
    title: string;
}

class IntroService {
    private readonly config: Config;

    constructor() {
        this.config = ConfigLoader.CurrentConfig;
    }

    getIntroContextData(): {
        textLoading: boolean;
        error: ApolloError | undefined;
        rawData: { sliderData: Array<SmbIntroSlides> | null; textModulesData: Array<SmbIntroTextModules> | null };
        textContextData: {
            sliderContextData: Array<IntroSlider>;
            textModulesContextData: Array<TextSectionData>;
        };
    } {
        const introRepository = new IntroRepository();
        // const highlightsService = new HighlightsService();
        // const cc = highlightsService.getHighlightsObjects();

        const { textLoading, error, data } = introRepository.fetchIntro(LanguageService.getCurrentLanguage());
        const textContextData = {
            sliderContextData: new Array<IntroSlider>(),
            textModulesContextData: new Array<TextSectionData>(),
            hightlightsContextData: new Array<HighlightsContextData>(),
        };

        if (!textLoading && data && data.textModulesData && data.sliderData) {
            textContextData.sliderContextData = IntroService.convertSliderElements(data.sliderData, this.config);
            textContextData.textModulesContextData = IntroService.convertTextModules(data.textModulesData);
            // contextData.hightlightsContextData = cc.contextData;
        }

        return { textLoading, error, rawData: data, textContextData };
    }

    private static convertSliderElements(sliderData: SmbIntroSlides[], config: Config): Array<IntroSlider> {
        return sliderData.map(
            (value): IntroSlider => {
                const { title } = value.intro_slide_translations[0];
                const imageUrlBuilder = new ImageUrlBuilder();

                const buildImageUrl = (imageId: string, imageSize: number): string => {
                    return imageUrlBuilder.buildUrl(imageId, imageSize, imageSize).toString();
                };

                return {
                    slideImage: buildImageUrl(value.image, config.DATA_CONFIG.SLIDER_IMAGE_SIZE),
                    slideText: title,
                };
            },
        );
    }

    private static convertTextModules(textModules: SmbIntroTextModules[]): Array<TextSectionData> {
        return textModules.map(
            (value): TextSectionData => {
                const { title, subtitle, content, link_caption } = value.intro_text_module_translations[0];
                const {
                    link,
                    module_background_color,
                    text_area_color,
                    text_color,
                    title_color,
                    intro_text_module_type,
                } = value;
                const moduleType = EnumUtil.getValueForEnumMember(TextModuleType, intro_text_module_type.value);

                return {
                    title: title,
                    subtitle: subtitle,
                    link: {
                        href: link ? link : '',
                        caption: link_caption,
                    },
                    text: content,
                    moduleBackgroundColor: module_background_color,
                    textAreaColor: text_area_color,
                    textColor: text_color,
                    titleColor: title_color,
                    moduleType: moduleType,
                };
            },
        );
    }
}

export default IntroService;
