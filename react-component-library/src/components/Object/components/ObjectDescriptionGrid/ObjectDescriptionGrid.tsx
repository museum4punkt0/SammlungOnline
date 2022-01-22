import Grid from '@material-ui/core/Grid';
import React, { ReactElement, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import ObjectContext from '../ObjectContext/ObjectContext';
import ObjectDescriptionGridRow from '../ObjectDescriptionGridRow/ObjectDescriptionGridRow';
import { FieldVisibility, Visibility } from '../ObjectDescriptionModule/ObjectDescriptionModule';

function isEmpty(candidate: string | Array<string> | undefined): boolean {
  if (!candidate) return true;
  return Array.isArray(candidate)
    ? candidate.length === 0
    : candidate.trim().length === 0;
}

function defaultIfEmpty(
  candidate: string | Array<string> | undefined,
  defaultValue: string,
): string {
  if (isEmpty(candidate)) return defaultValue;
  return Array.isArray(candidate) ? candidate.join('\n') : candidate!;
}

function ObjectDescriptionGrid({
  config,
}: {
  config: Array<FieldVisibility>;
}): ReactElement {
  const object = useContext(ObjectContext).objectData;
  const { t } = useTranslation();
  const noDataAvailableText = t(
    'object attribute fallback - no data available',
  );

  let colored = false;
  const renderRow = (cfg: FieldVisibility): ReactElement | null => {
    // Disable ts here, it cannot handle dynamic properties syntax.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = object && object[cfg.key];
    if (cfg.visibility === Visibility.VISIBLE || !isEmpty(value)) {
      colored = !colored;
      return (
        <ObjectDescriptionGridRow
          key={cfg.key}
          title={t(`object attribute ${cfg.key}`)}
          content={defaultIfEmpty(value, noDataAvailableText)}
          colored={colored}
        />
      );
    }
    return null;
  };

  return <Grid container={true}>{config.map((f) => renderRow(f))}</Grid>;
}

export default ObjectDescriptionGrid;
