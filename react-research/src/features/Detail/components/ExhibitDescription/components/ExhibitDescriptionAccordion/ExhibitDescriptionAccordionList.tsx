import React from 'react';

import ExhibitDescriptionAccordion from './ExhibitDescriptionAccordion/ExhibitDescriptionAccordion';

import useStyles from './exhibitDescriptionAccordionList.jss';

interface IAccordionItem {
    title: string;
    content: string;
}

interface IExhibitDescriptionAccordionListProps {
    items: IAccordionItem[];
}

const ExhibitDescriptionAccordionList: React.FC<IExhibitDescriptionAccordionListProps> = ({ items }) => {
    const classes = useStyles();

    return (
        <div className={classes.accordionWrapper}>
            {items.map((item, i) => {
                return (
                    <ExhibitDescriptionAccordion expanded={i === 0} key={i} title={item.title} content={item.content} />
                );
            })}
        </div>
    );
};

export default ExhibitDescriptionAccordionList;
