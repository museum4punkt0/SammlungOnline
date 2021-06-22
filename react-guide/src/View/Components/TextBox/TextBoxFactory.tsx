import React, { ReactElement } from 'react';
import { TextModuleType, TextSectionData } from './TextBoxContext';
import TextSectionBox from './TextBox';


function TextBoxFactory({
    textSectionData,
    // intro,
    // research,
    // topics,
    // guide,
}: {
    // intro?: boolean,
    // research?: boolean,
    // topics?: boolean,
    // guide?: boolean,
    textSectionData: TextSectionData
}) {

    switch (textSectionData.moduleType) {
        case TextModuleType.RESEARCH:
            return <TextSectionBox textSectionData={textSectionData} />;
        case TextModuleType.TOPIC:
            return <TextSectionBox textSectionData={textSectionData} />;
        // case TextModuleType.GUIDE:
        // return <GuideSection textSectionData={textSectionData} />;
        // case TextModuleType.TEXT:
        default:
            // TODO remove other portals
            return (null);
        // return <TextSection textSectionData={textSectionData} />;
    }
}

export default TextBoxFactory;
