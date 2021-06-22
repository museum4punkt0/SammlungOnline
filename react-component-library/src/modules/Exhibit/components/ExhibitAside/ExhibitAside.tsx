import React from 'react';

import { ExhibitAsideLinks } from './components/ExhibitAsideLinks/ExhibitAsideLinks';
import { ExhibitAsideText } from './components/ExhibitAsideText/ExhibitAsideText';

import { IAsideContainerItem } from '../../definitions/interfaces/aside/aside-container-item.interface';
import { IAsideInfoItem } from '../../definitions/interfaces/aside/aside-info-item.interface';
import { Grid, Typography } from '@material-ui/core';

export interface IExhibitAsideProps {
  infoItems: IAsideInfoItem[];
  containerElements: IAsideContainerItem[];
  creditLine?: string;
}

export const ExhibitAside: React.FC<IExhibitAsideProps> = props => {
  const { infoItems, containerElements, creditLine } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        {infoItems.map((infoItem, i) => {
          return <ExhibitAsideText key={i} title={infoItem.title} content={infoItem.content} />;
        })}
      </Grid>
      {creditLine && (
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography>{creditLine}</Typography>
        </Grid>
      )}
      <Grid item xs={12} sm={12} md={12} lg={12}>
        {containerElements.map((containerElement, i) => {
          return <ExhibitAsideLinks key={i} type={containerElement.type} links={containerElement.links} title={containerElement.title} />;
        })}
      </Grid>
    </Grid>
  );
};
