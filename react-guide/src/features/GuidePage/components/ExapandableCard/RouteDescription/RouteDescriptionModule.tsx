import { CardContent, Collapse, Grid } from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CollapsibleCard from '../CollapsibleCard';
import CollapsibleCardHeader from '../CollapsibleCardHeader';
import OverrideCard from '../OverrideCard';

function RouteDescriptionModule({
  image,
  location,
  level,
  children,
}: {
  image: string;
  location: string;
  level: string;
  children?: ReactElement | ReactElement[];
}): ReactElement {
  const { t } = useTranslation();
  const initTitle: string = t('open route description');
  const [name, setName] = useState(initTitle);
  const [expanded, setExpanded] = useState(false);

  const openDescText = t('open route description');
  const closeDescText = t('close route description');

  const handleMapExpandClick = () => {
    setExpanded(!expanded);
    // indirect state comparisson, checks if CollapsibleCardHeader is not collapsed
    if (name === closeDescText) {
      handleCardExpandClick(expanded);
    }
  };

  const handleCardExpandClick = (state: boolean) => {
    if (state) {
      setName(openDescText);
    } else {
      setName(closeDescText);
    }
  };

  return (
    <Grid container>
      <Collapse
        in={!expanded}
        timeout="auto"
        unmountOnExit
        style={{ width: '100%' }}
      >
        <CollapsibleCard
          header={
            <CollapsibleCardHeader
              title={name}
              map
              routeDescription
              onMapClick={handleMapExpandClick}
            />
          }
          content={<CardContent style={{ padding: 0 }}>{children}</CardContent>}
          expandCard={handleCardExpandClick}
        />
      </Collapse>

      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
        style={{ width: '100%' }}
      >
        {/* Map Card */}
        <OverrideCard
          location={location}
          image={image}
          locationLevel={level}
          onExit={handleMapExpandClick}
        />
      </Collapse>
    </Grid>
  );
}

export default RouteDescriptionModule;
