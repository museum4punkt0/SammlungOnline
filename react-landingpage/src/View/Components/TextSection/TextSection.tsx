import React, { ReactElement } from 'react';
import { TextSectionData } from './TextSectionContext';
import Typography from '@material-ui/core/Typography';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Button from '@material-ui/core/Button';

import useStyles from './textSection.jss';

function TextSection({
    textSectionData,
    children,
}: {
    textSectionData: TextSectionData;
    children?: ReactElement | Array<ReactElement>;
}): ReactElement {
    const classes = useStyles();
    return (
        <div className={classes.content} style={{ backgroundColor: textSectionData.moduleBackgroundColor }}>
            <div className={classes.contentWrapper}>
                <Typography variant={'h2'} style={{ color: textSectionData.titleColor }}>
                    {textSectionData.title}
                </Typography>
                <div className={classes.horizontalLine} style={{ backgroundColor: textSectionData.titleColor }} />
                <div className={classes.textArea} style={{ backgroundColor: textSectionData.textAreaColor }}>
                    <Typography component="div" variant={'h3'} style={{ color: textSectionData.textColor }}>
                        {textSectionData.subtitle}
                    </Typography>
                    <Typography
                        className={classes.textContent}
                        variant={'body2'}
                        style={{ color: textSectionData.textColor }}
                    >
                        {textSectionData.text}
                    </Typography>
                    <div className={classes.buttonArea}>
                        <Button
                            tabIndex={0}
                            className={classes.buttonLink}
                            href={textSectionData.link.href}
                            style={{ color: textSectionData.textColor, outlineColor: textSectionData.textColor }}
                            target={'_blank'}
                        >
                            {textSectionData.link.caption}
                            <ArrowRightAltIcon
                                className={classes.buttonLinkArrow}
                                style={{ color: textSectionData.textColor }}
                                fontSize={'large'}
                            />
                        </Button>
                    </div>
                </div>
            </div>
            {children}
        </div>
    );
}

export default TextSection;
