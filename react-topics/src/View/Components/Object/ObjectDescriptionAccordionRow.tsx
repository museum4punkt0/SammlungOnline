import React, { ReactElement, useState } from 'react';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Accordion from '@material-ui/core/Accordion';

import useStyles from './objectDescriptionAccordionRow.jss';

function ObjectDescriptionAccordionRow({
    title,
    content,
    initialExpandState = false,
}: {
    title: string;
    content: string;
    initialExpandState?: boolean;
}): ReactElement {
    const classes = useStyles();
    const [expanded, setExpanded] = useState<boolean>(initialExpandState);

    return (
        <Accordion
            className={classes.accordionElement}
            expanded={expanded}
            onChange={(event, accordionExpanded) => {
                setExpanded(accordionExpanded);
            }}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon fontSize={'large'} />}>
                <Typography variant={'h6'} className={clsx(classes.contrastText)}>
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ display: 'inherit' }}>
                {content.split('\n').map((line: string, index: number) => (
                    <Typography
                        key={index}
                        variant={'body1'}
                        className={clsx(classes.contrastText, classes.spacingTop)}
                    >
                        {line.trim()}
                    </Typography>
                ))}
            </AccordionDetails>
        </Accordion>
    );
}

export default ObjectDescriptionAccordionRow;
