/* eslint-disable no-console */
import ResearchRepository from '../repository/ResearchRepository';
import {
  ComponentComponentsSmbResearchModal,
  Maybe,
  ComponentComponentsSmbWebModule,
  ComponentComponentsSmbDownloadModule,
} from '../../../generated/graphql';
import { LanguageService } from 'src';

class ResearchService {
  getResearchModalData() {
    const lang = LanguageService.getDefaultLanguage();
    const researchRepository = new ResearchRepository();
    const { loading, error, data, title } =
      researchRepository.fetchResearchModal(lang);
    let convertedSectionsData;

    if (!loading && data) {
      convertedSectionsData = this.convertModuleData(data, title);
    }

    return { loading, error, data: convertedSectionsData };
  }

  convertModuleData(
    items: ComponentComponentsSmbResearchModal,
    title: string,
  ): {
    title: string;
    download: Maybe<ComponentComponentsSmbDownloadModule> | null;
    web: Maybe<ComponentComponentsSmbWebModule> | null;
  } {
    return {
      title: title,
      download: items.downloadSection ? items.downloadSection : null,
      web: items?.webSection ? items?.webSection : null,
    };
  }
}

export default ResearchService;
