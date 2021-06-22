import React, { ReactElement, useContext } from 'react';
import TextSectionContext, { TextSectionContextData } from './TextSectionContext';
import TextSectionFactory from './TextSectionFactory';

function TextSectionModule(): ReactElement {
    const textSectionContext = useContext<TextSectionContextData>(TextSectionContext);

    return (
        <div id={'TextSectionModule'}>
            {textSectionContext.sections.map((value, index) => (
                <TextSectionFactory key={index} textSectionData={value} />
            ))}
        </div>
    );
}

export default TextSectionModule;
