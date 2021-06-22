import React, { ReactElement } from 'react';
import NoSimOutlinedIcon from '@material-ui/icons/NoSimOutlined';
import { useTranslation } from 'react-i18next';
import useStyles from './FallbackImage.jss';

export default function FallbackImage({ caption }: { caption?: string }): ReactElement {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <div role="img" arial-label={t('fallback image label', { caption: caption })} className={classes.container}>
            <div>
                <div className={classes.headline}>{t('fallback image text')}</div>
                <NoSimOutlinedIcon fontSize={'large'} />
            </div>
        </div>
    );
}
