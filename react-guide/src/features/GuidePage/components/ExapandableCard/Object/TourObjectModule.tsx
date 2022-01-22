import { Grid } from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import CollapsibleCard from '../CollapsibleCard';
import CollapsibleCardHeader from '../CollapsibleCardHeader';
import ObjectContent from './ObjectContent';
import PreviewContent from './PreviewContent';

// import { LinkBuilder } from '../../../../../utils/LinkBuilder';
import { TourObjectData } from '../../../types/GuideData';
import { useTranslation } from 'react-i18next';

function TourObjectModule({
  objectData,
  mobile = false,
}: {
  objectData: TourObjectData;
  mobile?: boolean;
}): ReactElement {
  // const link = new LinkBuilder();

  const { t } = useTranslation();
  const initTitle: string = t('show more');
  const [name, setName] = useState(initTitle);
  // const [expanded, setExpanded] = useState(false);

  // const handleExpandClick = () => {
  //     setExpanded(!expanded);
  // };

  const handleCardExpandClick = (state: boolean) => {
    if (state) {
      setName(t('show more'));
    } else {
      setName(t('show less'));
    }
  };

  // todo move to service?
  // const generateRelatedTourLinks = () => {
  // if (false) {
  //     const relatedTours: {
  //         link: void;
  //         title: string;
  //     }[] = objectData.relatedTours.map((guide) => {
  //         return (
  //             {
  //                 link: link.toGuide(guide.id, guide.title),
  //                 title: guide.title
  //             }
  //         );
  //     })
  //     return relatedTours;
  // }
  // };

  if (mobile) {
    return (
      <CollapsibleCard
        header={
          <CollapsibleCardHeader
            title={objectData.displayTitle}
            checkbox
            checkboxStorage={objectData.link}
            // share
            // checkbox
          />
        }
        preview
        previewContent={
          // <PreviewContent image={objectData.image} />
          <ObjectContent
            image={objectData.image}
            geographicalReferences={objectData.geographicalReferences}
            materialAndTechnique={objectData.materialAndTechnique}
            dimensionsAndWeight={objectData.dimensionsAndWeight}
            identNr={objectData.identNr}
            abstract={objectData.abstract}
            mobile
          />
        }
        content={
          // <PreviewContent image={objectData.image} />
          <ObjectContent
            image={objectData.image}
            geographicalReferences={objectData.geographicalReferences}
            materialAndTechnique={objectData.materialAndTechnique}
            dimensionsAndWeight={objectData.dimensionsAndWeight}
            identNr={objectData.identNr}
            abstract={objectData.abstract}
            description={objectData.description}
            objectLink={objectData.link}
            // relatedTours={generateRelatedTourLinks()}
            mobile
          />
        }
        footer={
          <CollapsibleCardHeader
            title={name}
            // share
            // checkbox
          />
        }
        hasFooter
        expandCard={handleCardExpandClick}
      />
    );
  }

  return (
    <Grid container>
      <CollapsibleCard
        header={
          <CollapsibleCardHeader
            title={objectData.displayTitle}
            // share
            checkbox
            checkboxStorage={objectData.link}
          />
        }
        preview
        previewContent={<PreviewContent image={objectData.image} />}
        content={
          <ObjectContent
            image={objectData.image}
            geographicalReferences={objectData.geographicalReferences}
            materialAndTechnique={objectData.materialAndTechnique}
            dimensionsAndWeight={objectData.dimensionsAndWeight}
            identNr={objectData.identNr}
            abstract={objectData.abstract}
            description={objectData.description}
            objectLink={objectData.link}
            // relatedTours={generateRelatedTourLinks()}
          />
        }
      />
    </Grid>
  );
}

export default TourObjectModule;
