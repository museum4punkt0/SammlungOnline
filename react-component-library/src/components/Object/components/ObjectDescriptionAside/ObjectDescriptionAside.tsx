import React, { ReactElement, useContext } from 'react';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import ObjectContext from '../ObjectContext/ObjectContext';


import useStyles from './objectDescriptionAside.jss';
import TextContainer from '../../../PlattformLinks/components/TextContainer/TextContainer';

function ObjectDescriptionAside(): ReactElement {
  const classes = useStyles();
  const { t } = useTranslation();
  const objectContextData = useContext(ObjectContext);
  const noDataAvailableText = t(
    'object attribute fallback - no data available',
  );

  const TypoBoldElement = ({
    children,
  }: {
    children: string;
  }): ReactElement => {
    return (
      <span className={clsx(classes.txtBold, classes.txtElement)}>
        {children}
      </span>
    );
  };
  const TypoElement = ({
    title,
    content,
  }: {
    title: string;
    content: string;
  }): ReactElement => {
    return (
      <Typography variant={'body1'} className={clsx(classes.contrastText)}>
        <TypoBoldElement>{`${title} `}</TypoBoldElement>
        {content}
      </Typography>
    );
  };

  return (
    <div className={classes.asideContainer}>
      <div className={clsx(classes.spacer)}>
        <TypoElement
          title={t('object attribute identNr')}
          content={
            objectContextData.objectData?.identNr
              ? objectContextData.objectData?.identNr
              : noDataAvailableText
          }
        />
        <TypoElement
          title={t('object attribute collection')}
          content={
            objectContextData.objectData?.collection
              ? objectContextData.objectData?.collection
              : noDataAvailableText
          }
        />
        <TypoElement
          title={t('object attribute location')}
          content={
            objectContextData.objectData?.location
              ? objectContextData.objectData?.location
              : noDataAvailableText
          }
        />
      </div>
      {objectContextData.asideTextContainerElements &&
        objectContextData.asideTextContainerElements.map((value, index) => (
          <TextContainer
            key={index}
            containerType={value.type}
            title={value.title}
            elements={value.elements}
          />
        ))}
    </div>
  );
}

export default ObjectDescriptionAside;
