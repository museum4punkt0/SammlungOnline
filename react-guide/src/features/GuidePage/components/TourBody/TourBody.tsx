import {
  Grid,
  isWidthUp,
  Theme,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import React, { ReactElement } from 'react';
import TourObjectModule from '../ExapandableCard/Object/TourObjectModule';
// import { TourObjectData, StationData } from '../interfaces/GuideContext';
import { StationData } from '../../types/GuideData';
import StationHeader from '../Station/StationHeader';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

type BreakpointOrNull = Breakpoint | null;

function useWidth() {
  const theme: Theme = useTheme();
  const keys: Breakpoint[] = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output: BreakpointOrNull, key: Breakpoint) => {
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}

function TourBody({
  location,
  stations,
}: {
  location: string;
  stations: StationData[];
}): ReactElement {
  /**
   * Be careful using this hook. It only works because the number of
   * breakpoints in theme is static. It will break once you change the number of
   * breakpoints. See https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level
   */
  const width = useWidth();

  if (isWidthUp('md', width)) {
    return (
      <Grid container>
        {stations.map((station) => {
          if (station.objects.length > 0) {
            return (
              <StationHeader
                key={station.name}
                location={location}
                station={station}
                withObjects
              >
                {station.objects.map((object) => {
                  return (
                    <TourObjectModule
                      key={object.displayTitle}
                      objectData={object}
                    />
                  );
                })}
              </StationHeader>
            );
          } else {
            return null;
          }
        })}
      </Grid>
    );
  }

  // arrow
  // text

  return (
    <Grid container>
      {stations.map((station) => {
        if (station.objects.length > 0) {
          return (
            <StationHeader
              key={station.name}
              location={location}
              station={station}
              withObjects
            >
              {station.objects.map((object) => {
                return (
                  <TourObjectModule
                    mobile
                    key={object.displayTitle}
                    objectData={object}
                  />
                );
              })}
            </StationHeader>
          );
        } else {
          return null;
        }
      })}
    </Grid>
  );
}

export default TourBody;
