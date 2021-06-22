import { ApolloError } from 'apollo-boost';
import { SmbIntroSlides, SmbIntroTextModules } from '../../../generated/graphql';
import IntroRepository from '../repository/IntroRepository';
import { LanguageService } from '../../LanguageService';
import { TextModuleType, ITextSectionData } from '../interfaces/TextSectionContext';

import EnumUtil from '../../../util/EnumUtil';
import {IImageUrlBuilder} from "../../ImageUrlBuilderService/image-url-builder-service.interaface";

export interface IntroSlider {
  slideImage: string;
  slideText: string;
}

class IntroService {
  private imageUrlBuilder: IImageUrlBuilder;

  constructor(imageUrlBuilder: IImageUrlBuilder) {
    this.imageUrlBuilder = imageUrlBuilder;
  }

  getIntroContextData(
    sliderImageSize: number,
  ): {
    loading: boolean;
    error: ApolloError | undefined;
    rawData: { sliderData: Array<SmbIntroSlides> | null; textModulesData: Array<SmbIntroTextModules> | null };
    contextData: {
      sliderContextData: Array<IntroSlider>;
      textModulesContextData: Array<ITextSectionData>;
    };
  } {
    const introRepository = new IntroRepository();
    const { loading, error, data } = introRepository.fetchIntro(LanguageService.getCurrentLanguage());
    const contextData = {
      sliderContextData: new Array<IntroSlider>(),
      textModulesContextData: new Array<ITextSectionData>(),
    };

    if (!loading && data && data.textModulesData && data.sliderData) {
      contextData.sliderContextData = IntroService.convertSliderElements(data.sliderData, sliderImageSize, this.imageUrlBuilder);
      contextData.textModulesContextData = IntroService.convertTextModules(data.textModulesData);
    }

    return { loading, error, rawData: data, contextData };
  }

  private static convertSliderElements(
    sliderData: SmbIntroSlides[],
    sliderImageSize: number,
    imageBuilder: IImageUrlBuilder,
  ): Array<IntroSlider> {
    return sliderData.map(
      (value): IntroSlider => {
        const { title } = value.intro_slide_translations[0];
        const imageUrlBuilder = imageBuilder;

        const buildImageUrl = (imageId: string, imageSize: number): string => {
          return imageUrlBuilder.buildUrl(imageId, imageSize, imageSize).toString();
        };

        return {
          slideImage: buildImageUrl(value.image, sliderImageSize),
          slideText: title,
        };
      },
    );
  }

  private static convertTextModules(textModules: SmbIntroTextModules[]): Array<ITextSectionData> {
    return textModules.map(
      (value): ITextSectionData => {
        const { title, subtitle, content, link_caption } = value.intro_text_module_translations[0];
        const { link, module_background_color, text_area_color, text_color, title_color, intro_text_module_type } = value;
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
