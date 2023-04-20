/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router';
import { Typography, Grid } from '@material-ui/core';
import Helmet from 'react-helmet';
import SvgIcon from '@material-ui/core/SvgIcon';
import Tooltip from '@material-ui/core/Tooltip';

import {
  IAttachment,
  ImageZoomModal,
  ExhibitDescriptionAccordionList,
  ExhibitDescriptionGrid,
  ObjectImageDownloadDialog,
  WrappedSpinner,
  LinkBuilder,
  useConfigLoader,
} from '@smb/smb-react-components-library';

import {
  ExhibitActions,
  DetailNavigation,
  ExhibitPreview,
  ExhibitDescription,
  ExhibitDescriptionAside,
  RelatedExhibitsCarousel,
} from '../../components/index';

import {
  useExhibitId,
  useFetchExhibit,
  useFetchExhibitAttachments,
  useAccordionConfiguration,
  useGridConfiguration,
} from '../../hooks/index';

import { useDependency } from '../../providers/index';

// import { exhibitTestData } from './testData';

import useStyles from './detailPage.jss';

const DetailPage: React.FC = () => {
  const { imageUrlBuilder } = useDependency();
  const exhibitId = useExhibitId();
  const { t } = useTranslation();
  const { config } = useConfigLoader();
  const [zoomOpen, setZoomOpen] = useState<boolean>(false);
  const [downloadDialogOpen, setDownloadDialogOpen] = useState<boolean>(false);
  const [currentAttachment, setCurrentAttachment] = useState<IAttachment | null>(null);

  const { loading, exhibit, error: fetchExhibitError } = useFetchExhibit(exhibitId);
  const { loading: attachmentsLoading, data: attachments } = useFetchExhibitAttachments(
    exhibitId,
  );

  // const exhibit = exhibitTestData();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    const [_currentAttachment] = attachments || [null];

    setCurrentAttachment((_currentAttachment as unknown) as IAttachment);
  }, [attachmentsLoading, exhibitId]);

  const descriptionGridItems = useGridConfiguration({
    exhibit,
    lineBreak: '\n',
  });

  const descriptionAccordionItems = useAccordionConfiguration({
    exhibit,
    lineBreak: '\n\n',
  });

  const handleZoom = () => {
    if (currentAttachment) {
      setZoomOpen(true);
    }
  };

  const handleDownload = () => {
    if (currentAttachment) {
      setDownloadDialogOpen(true);
    }
  };

  const handleAttachmentChange = (attachment: IAttachment) => {
    setCurrentAttachment(attachment);
  };

  const term = exhibit?.technicalTerm || '';
  const [title] = exhibit?.titles ?? [];
  const [date] = exhibit?.dating ?? [];
  const titles = [title, term, date].filter(Boolean);
  const classes = useStyles();

  useEffect(() => {
    if (exhibit?.title) {
      document.title = `${exhibit.title} – Staatliche Museen zu Berlin`;
    }
  }, []);

  const allowImageActions = (): boolean => {
    const license = currentAttachment?.license?.text;
    if (license) {
      return (
        license === 'PUBLIC_DOMAIN' ||
        license.indexOf('CC') === 0 ||
        license.indexOf('Public') === 0
      );
    }
    return false;
  };

  const renderZoomActions = () => {
    return (
      <ExhibitActions
        showImageActions={allowImageActions()}
        className={classes.overlayWrapper}
        onZoom={handleZoom}
      />
    );
  };

  const renderDownloadActions = () => {
    return (
      <ExhibitActions
        showImageActions={allowImageActions()}
        onDownload={handleDownload}
      />
    );
  };

  const renderDownloadCSVActions = () => {
    const downloadPath = new LinkBuilder().getDownloadHref(exhibitId, 'csv');
    return (
      <Grid item xs={2} sm={2} lg={2} md={2} className={classes.svgContainer}>
        <Tooltip title={'Download CSV'} arrow={true}>
          <a
            href={`${downloadPath}`}
            target="_blank"
            download
            rel="noreferrer"
            className={classes.svgLink}
          >
            <SvgIcon viewBox="0 0 22.073 27.59">
              <g id="Group" transform="translate(-6.464 0)">
                <path
                  id="Shape"
                  d="M19.313,27.59H2.759A2.763,2.763,0,0,1,0,24.831V8.277L8.277,0H19.313a2.763,2.763,0,0,1,2.759,2.759V24.831A2.763,2.763,0,0,1,19.313,27.59ZM9.422,2.759h0L2.759,9.422V24.831H19.313V2.759Z"
                  transform="translate(6.464)"
                />
                <path
                  id="Path"
                  d="M11.036,5.518,5.518,11.036,0,5.518,1.945,3.573l2.193,2.18V.028L6.9,0V5.753L9.091,3.559Z"
                  transform="translate(11.982 9.657)"
                />
              </g>
            </SvgIcon>
          </a>
        </Tooltip>
      </Grid>
    );
  };

  const resizedCurrentAttachment = (w = 1000, h = 600) => {
    if (currentAttachment && currentAttachment?.filename)
      currentAttachment.src = imageUrlBuilder.buildUrl(currentAttachment.filename, w, h);
    return currentAttachment;
  };

  const renderAside = () => (
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    <ExhibitDescriptionAside exhibit={exhibit!} attachments={attachments} />
  );

  if (fetchExhibitError) {
    return <Redirect to="/404" />;
  }

  const fullImageSource = currentAttachment?.filename
    ? imageUrlBuilder.buildUrl(currentAttachment.filename, 4000, 4000)
    : '#';

  const breadcrumbTextOne = t('breadcrumb.main');
  const breadcrumbTextTwo = t('breadcrumb.research');
  const breadcrumbTextThree = exhibit?.title?.length
    ? exhibit.title
    : t('breadcrumb.noTitle');

  const metaTitle = exhibit?.title?.length
    ? exhibit.title.replace(/["]/g, '')
    : 'Recherche | Staatliche Museen zu Berlin';
  const metaDescription = exhibit?.description?.length
    ? exhibit.description.substring(0, 300).replace(/["]/g, '')
    : 'Recherche in den Online-Sammlungen der Staatlichen Museen zu Berlin';
  const metaLink = exhibit
    ? new LinkBuilder().getPermalinkHref(exhibit.id, exhibit.title)
    : 'https://recherche.smb.museum';
  const metaImage = attachments[0]?.src
    ? imageUrlBuilder.buildUrl(attachments[0].src, 1200, 630)
    : undefined;

  // TODO REMOVE: href:false HACKED IN TO SUPPRESS INTERNAL LINKS
  const getDescriptionGridItems = () => {
    if (!config.PRODUCTION_READY) return descriptionGridItems;
    const descriptionGridItemsAsHTML = descriptionGridItems.map(item => {
      return {
        ...item,
        href: false,
        content: Array.isArray(item.content)
          ? item.content.map(i => {
              return { ...i, html: true, href: i.formatted };
            })
          : item.content,
      };
    });
    return descriptionGridItemsAsHTML;
  };

  return (
    <>
      {!loading && exhibit ? (
        <div
          id="DetailPage"
          className={classes.sectionWrapper}
          data-testid={'detail_page_wrapper'}
        >
          <Helmet>
            <meta property="og:url" content={metaLink} />
            <link rel="canonical" href={metaLink} />
            <meta property="og:title" content={metaTitle} />
            <meta name="twitter:title" content={metaTitle} />
            <meta property="title" content={metaTitle} />
            <title>{metaTitle}</title>
            <meta name="twitter:card" content="summary" />
            <meta name="description" content={metaDescription} />
            <meta property="og:description" content={metaDescription} />
            <meta name="twitter:description" content={metaDescription} />
            {metaImage && <meta property="og:image" content={metaImage} />}
            {metaImage && <meta name="twitter:image" content={metaImage} />}
          </Helmet>
          <div
            className={classes.navigation}
            data-testid={'detail_page_navigation_wrapper'}
          >
            <Typography
              variant="body1"
              color="textSecondary"
              className={classes.breadcrumb}
            >
              {breadcrumbTextOne}
              <a href={'/'}>{breadcrumbTextTwo}</a>
              {` > ${breadcrumbTextThree}`}
            </Typography>
            <DetailNavigation />
          </div>
          <ExhibitPreview
            creditsLabel={t('details.attachment.pictureCredits')}
            currentAttachment={resizedCurrentAttachment()}
            attachments={attachments}
            onChange={handleAttachmentChange}
            renderDownloadActions={renderDownloadActions}
            renderZoomActions={renderZoomActions}
          />
          <ExhibitDescription
            titles={titles}
            renderAside={renderAside}
            renderDownloadCSVActions={renderDownloadCSVActions}
          >
            {descriptionGridItems.length !== 0 && (
              <ExhibitDescriptionGrid
                items={getDescriptionGridItems()}
                exhibit={exhibit}
              />
            )}
            {descriptionAccordionItems.length !== 0 && (
              <ExhibitDescriptionAccordionList items={descriptionAccordionItems} />
            )}
          </ExhibitDescription>
          <RelatedExhibitsCarousel exhibit={exhibit} />
          {downloadDialogOpen && (
            <ObjectImageDownloadDialog
              data-testid="dialog-component"
              filename={(currentAttachment && currentAttachment.downloadFilename) || ''}
              license={
                (currentAttachment && (currentAttachment.license as any)) || {
                  text: '',
                  href: '#',
                }
              }
              image={fullImageSource}
              isOpen={downloadDialogOpen}
              onClose={() => setDownloadDialogOpen(false)}
            />
          )}
          {zoomOpen && (
            <ImageZoomModal
              open={zoomOpen}
              src={fullImageSource}
              onClose={() => setZoomOpen(false)}
            />
          )}
        </div>
      ) : (
        <WrappedSpinner loading={true} platform={'research'} />
      )}
    </>
  );
};

export default DetailPage;
