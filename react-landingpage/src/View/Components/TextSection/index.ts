import TextSectionModule from './TextSectionModule';
import TextSectionContext, {
    TextSectionData as ContextTextSectionData,
    TextSectionContextData as ContextTextSectionContextData,
    TextModuleType,
} from './TextSectionContext';
import TextSection from './TextSection';
import TopicSection from './TopicSection';
import ResearchSection from './ResearchSection/ResearchSection';
import GuideSection from './GuideSection';

export {
    TextSectionModule,
    TextSectionContext,
    TextModuleType,
    GuideSection,
    ResearchSection,
    TopicSection,
    TextSection,
};
export type TextSectionData = ContextTextSectionData;
export type TextSectionContextData = ContextTextSectionContextData;
