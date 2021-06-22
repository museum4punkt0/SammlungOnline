import React, { ReactElement } from 'react';
import { TextSectionData } from './TextBoxContext';
import Typography from '@material-ui/core/Typography';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Button from '@material-ui/core/Button';

import useStyles from './textBox.jss';

function TextBox({
    textSectionData,
    children,
}: {
    textSectionData: TextSectionData;
    children?: ReactElement | Array<ReactElement>;
}): ReactElement {
    const classes = useStyles();
    return (
        <div className={classes.content}>
            <div className={classes.contentWrapper}>
                <div className={classes.textArea} style={{ backgroundColor: textSectionData.textAreaColor }}>
                    <Typography variant={'h3'} style={{ color: textSectionData.textColor }}>
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
                            className={classes.buttonLink}
                            href={textSectionData.link.href}
                            style={{ color: textSectionData.textColor }}
                            target={'_blank'}
                        >
                            {/* TODO Typography? */}
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

export default TextBox;
