/* eslint-disable no-console */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { ExhibitModel, Highlights, CommonTheme } from '@smb/smb-react-components-library';

import { useRelatedExhibits } from '../../hooks/index';
import { useDependency } from '../../providers/index';

interface IRelatedExhibitsCarouselProps {
  exhibit: ExhibitModel;
}

const RelatedExhibitsCarousel: React.FC<IRelatedExhibitsCarouselProps> = ({
  exhibit,
}) => {
  const { imageUrlBuilder, linkBuilder } = useDependency();
  const { t } = useTranslation();
  const { exhibits: relatedExhibits } = useRelatedExhibits(exhibit);

  const relatedObjectsWithImages = relatedExhibits.map((exhibit: ExhibitModel) => {
    return {
      image: imageUrlBuilder.createUrlFromTemplate(exhibit.src ?? '', 200, 200),
      link: linkBuilder.getDetailsLink(exhibit.id, exhibit.title),
      title: exhibit.title,
      collection: exhibit.collection,
    };
  });

  if (!relatedExhibits.length) {
    return null;
  }

  const getHighlightsData = () => {
    return {
      title: t('details.referencesToOtherExhibits'),
      text: '',
      slug: '',
      assets: [],
    };
  };

  return (
    <MuiThemeProvider theme={CommonTheme}>
      <section className={`section--default`}>
        <div className={`section__content-container`}>
          <Highlights
            data={getHighlightsData()}
            highlightsCollections={relatedObjectsWithImages}
          />
        </div>
      </section>
    </MuiThemeProvider>
  );
};

export default RelatedExhibitsCarousel;
