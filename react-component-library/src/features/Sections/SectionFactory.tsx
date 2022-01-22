import React from 'react';
import {
  GuideSection,
  ResearchSection,
  TextModuleType,
  TextSection,
  TextSectionData,
  TopicSection,
} from 'src';

function SectionFactory({
  textSectionData,
}: {
  textSectionData: TextSectionData;
}) {
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

export default SectionFactory;
