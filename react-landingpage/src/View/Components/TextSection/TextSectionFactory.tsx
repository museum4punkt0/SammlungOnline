import React, { ReactElement } from 'react';
import { TextModuleType, TextSectionData } from './TextSectionContext';
import GuideSection from './GuideSection';
import TopicSection from './TopicSection';
import ResearchSection from './ResearchSection/ResearchSection';
import TextSection from './TextSection';

function TextSectionFactory({ textSectionData }: { textSectionData: TextSectionData }): ReactElement {
    switch (textSectionData.moduleType) {
        case TextModuleType.RESEARCH:
            return <ResearchSection textSectionData={textSectionData} />;
        case TextModuleType.TOPIC:
            return <TopicSection textSectionData={textSectionData} />;
        case TextModuleType.GUIDE:
            return <GuideSection textSectionData={textSectionData} />;
        case TextModuleType.TEXT:
        default:
            return <TextSection textSectionData={textSectionData} />;
    }
}

export default TextSectionFactory;
