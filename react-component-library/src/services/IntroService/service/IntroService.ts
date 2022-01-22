import { ApolloError } from 'apollo-boost';
import {
  SmbIntroSlides,
  SmbIntroTextModules,
} from '../../../generated/graphql';
import { LanguageService } from '../../LanguageService';

import EnumUtil from '../../../utils/EnumUtil';
import {
  ConfigLoader,
  IConfiguration,
  IntroRepository,
  TextModuleType,
  TextSectionData,
} from 'src';
import ImageUrlBuilder from 'src/utils/ImageUrlBuilder';

export interface IntroSlider {
  slideImage: string;
  slideText: string;
}

class IntroService {
  private readonly config: IConfiguration;

  constructor(config: any) {
    this.config = config || ConfigLoader.CurrentConfig;
  }

  getIntroContextData(): {
    loading: boolean;
    error: ApolloError | undefined;
    rawData: {
      sliderData: Array<SmbIntroSlides> | null;
      textModulesData: Array<SmbIntroTextModules> | null;
    };
    contextData: {
      sliderContextData: Array<IntroSlider>;
      textModulesContextData: Array<TextSectionData>;
    };
  } {
    const introRepository = new IntroRepository();
    const { loading, error, data } = introRepository.fetchIntro(
      LanguageService.getCurrentLanguage(),
    );
    const contextData = {
      sliderContextData: new Array<IntroSlider>(),
      textModulesContextData: new Array<TextSectionData>(),
    };

    if (!loading && data && data.textModulesData && data.sliderData) {
      contextData.sliderContextData = IntroService.convertSliderElements(
        data.sliderData,
        this.config,
      );
      contextData.textModulesContextData = IntroService.convertTextModules(
        data.textModulesData,
      );
    }

    return { loading, error, rawData: data, contextData };
  }

  private static convertSliderElements(
    sliderData: SmbIntroSlides[],
    config: IConfiguration,
  ): Array<IntroSlider> {
    return sliderData.map((value): IntroSlider => {
      const { title } = value.intro_slide_translations[0];
      const imageUrlBuilder = new ImageUrlBuilder(config);
      const buildImageUrl = (imageId: string, imageSize: number): string => {
        return imageUrlBuilder
          ?.buildUrl(imageId, imageSize, imageSize)
          ?.toString();
      };

      return {
        slideImage: buildImageUrl(
          value?.image,
          config.CAROUSEL_CONFIG.SLIDER_IMAGE_SIZE,
        ),
        slideText: title,
      };
    });
  }

  private static convertTextModules(
    textModules: SmbIntroTextModules[],
  ): Array<TextSectionData> {
    return textModules.map((value): TextSectionData => {
      const { title, subtitle, content, link_caption } =
        value.intro_text_module_translations[0];
      const {
        link,
        module_background_color,
        text_area_color,
        text_color,
        title_color,
        intro_text_module_type,
      } = value;
      const moduleType = EnumUtil.getValueForEnumMember(
        TextModuleType,
        intro_text_module_type.value,
      );

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
    });
  }
}

export default IntroService;
