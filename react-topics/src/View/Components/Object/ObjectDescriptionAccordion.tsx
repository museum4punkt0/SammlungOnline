import clsx from 'clsx';
import React, { ReactElement, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import ObjectContext from './ObjectContext';
import useStyles from './objectDescriptionAccordion.jss';
import ObjectDescriptionAccordionRow from './ObjectDescriptionAccordionRow';
import { FieldVisibility, Visibility } from './ObjectDescriptionModule';

function isEmpty(candidate: string | Array<string> | undefined): boolean {
    if (!candidate) return true;
    return Array.isArray(candidate) ? candidate.length === 0 : candidate.trim().length === 0;
}

function defaultIfEmpty(candidate: string | Array<string> | undefined, defaultValue: string): string {
    if (isEmpty(candidate)) return defaultValue;
    return Array.isArray(candidate) ? candidate.join('; ') : candidate!;
}

function ObjectDescriptionAccordion({ config }: { config: Array<FieldVisibility> }): ReactElement {
    const classes = useStyles();
    const { t } = useTranslation();
    const object = useContext(ObjectContext).objectData;
    const noDataAvailableText = t('object desc no data available');

    const renderRow = (cfg: FieldVisibility): ReactElement | null => {
        // Disable ts here, it cannot handle dynamic properties syntax.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const value = object && object[cfg.key];
        if (cfg.visibility === Visibility.VISIBLE || !isEmpty(value)) {
            return (
                <ObjectDescriptionAccordionRow
                    key={cfg.key}
                    title={t(`object attribute ${cfg.key}`)}
                    content={defaultIfEmpty(value, noDataAvailableText)}
                    initialExpandState={!isEmpty(value)}
                />
            );
        }
        return null;
    };

    return <div className={clsx(classes.spacingTop, classes.accordionWrapper)}>{config.map((f) => renderRow(f))}</div>;
}

export default ObjectDescriptionAccordion;
