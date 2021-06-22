import React, { ReactElement } from 'react';
import { TextSectionData } from './TextBoxContext';
import TextBoxFactory from './TextBoxFactory';


import useStyles from './textBoxModule.jss';

function TextBoxModule({
        // intro,
        // research,
        // topics,
        // guide,
        sections,
    } : {
        // intro?: boolean,
        // research?: boolean,
        // topics?: boolean,
        // guide?: boolean,
        sections: TextSectionData[];
    }): ReactElement {
    // const textSectionContext = useContext<TextSectionContextData>(TextSectionContext);
    const classes = useStyles();

    return (
        <div id={'TextSectionBoxModule'} className={classes.content}>
            {sections.map((value, index) => (
                <TextBoxFactory 
                    // intro={intro}
                    // research={research}
                    // topics={topics}
                    // guide={guide}
                    key={index} textSectionData={value} />
            ))}
        </div>
    );
}

export default TextBoxModule;
