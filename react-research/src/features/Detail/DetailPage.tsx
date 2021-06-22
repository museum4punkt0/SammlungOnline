import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IAttachment, LoadingSpinner, ImageZoomModal } from 'smb-react-components-library';

import { Redirect } from 'react-router';
import { ObjectImageDownloadDialog } from '@bit/xai_mb.smb.dialog';
import DetailNavigation from './components/DetailNavigation/DetailNavigation';
import ExhibitActions from './components/ExhibitActions/ExhibitActions';
import ExhibitPreview from './components/ExhibitPreview/ExhibitPreview';
import ExhibitDescription from './components/ExhibitDescription/ExhibitDescription';
import ExhibitDescriptionGrid from './components/ExhibitDescription/components/ExhibitDescriptionGrid/ExhibitDescriptionGrid';
import ExhibitDescriptionAccordionList from './components/ExhibitDescription/components/ExhibitDescriptionAccordion/ExhibitDescriptionAccordionList';
import ExhibitDescriptionAside from './components/ExhibitDescriptionAside/ExhibitDescriptionAside';
import RelatedExhibitsCarousel from './components/RelatedExhibitsCarousel/RelatedExhibitsCarousel';

import { useExhibitId } from '../../core/hooks/use-exhibit-id.hook';
import { useFetchExhibit } from '../../core/hooks/use-exhibit.hook';
import { useFetchExhibitAttachments } from '../../core/hooks/use-fetch-exhibit-attachments.hook';
import { useVisibilityConfiguration } from './hooks/use-visibility-configuration.hook';
import { useDependency } from '../../core/store/dependency.context';

import useStyles from './detailPage.jss';

const DetailPage: React.FC = () => {
    const { imageUrlBuilder } = useDependency();
    const exhibitId = useExhibitId();
    const { t } = useTranslation();

    const [zoomOpen, setZoomOpen] = useState<boolean>(false);
    const [downloadDialogOpen, setDownloadDialogOpen] = useState<boolean>(false);
    const [currentAttachment, setCurrentAttachment] = useState<IAttachment | null>(null);

    const { loading, exhibit, error: fetchExhibitError } = useFetchExhibit(exhibitId);
    const { loading: attachmentsLoading, data: attachments } = useFetchExhibitAttachments(exhibitId);

    const descriptionGridItems = useVisibilityConfiguration({ name: 'grid', exhibit, lineBreak: '\n' });
    const descriptionAccordionItems = useVisibilityConfiguration({ name: 'accordion', exhibit, lineBreak: '\n\n' });

    useEffect(() => {
        const [_currentAttachment] = attachments || [null];

        setCurrentAttachment((_currentAttachment as unknown) as IAttachment);
    }, [attachmentsLoading, exhibitId]);

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

    const renderActions = () => {
        return (
            <ExhibitActions showImageActions={!!currentAttachment} onZoom={handleZoom} onDownload={handleDownload} />
        );
    };

    const renderAside = () => <ExhibitDescriptionAside exhibit={exhibit!} />;

    const classes = useStyles();

    if (fetchExhibitError) {
        return <Redirect to="/404" />;
    }

    if (loading || !exhibit || attachmentsLoading) {
        return (
            <div className={classes.content}>
                <LoadingSpinner />
            </div>
        );
    }

    const fullImageSource = currentAttachment?.filename
        ? imageUrlBuilder.buildUrl(currentAttachment.filename, 2500, 2500)
        : '#';

    return (
        <div id="DetailPage" className={classes.content}>
            <div className={classes.navigation}>
                <DetailNavigation renderActions={renderActions} />
            </div>
            <ExhibitPreview
                creditsLabel={t('details.attachment.pictureCredits')}
                currentAttachment={currentAttachment!}
                attachments={attachments}
                onChange={handleAttachmentChange}
            />
            <ExhibitDescription titles={titles} renderActions={renderActions} renderAside={renderAside}>
                <ExhibitDescriptionGrid items={descriptionGridItems} />
                <ExhibitDescriptionAccordionList items={descriptionAccordionItems} />
            </ExhibitDescription>
            <RelatedExhibitsCarousel exhibit={exhibit} />
            {downloadDialogOpen && (
                <ObjectImageDownloadDialog
                    data-cy="dialog-component"
                    filename={currentAttachment?.downloadFilename || ''}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    license={(currentAttachment?.license as any) || { text: '', href: '#' }}
                    image={fullImageSource}
                    isOpen={downloadDialogOpen}
                    onClose={() => setDownloadDialogOpen(false)}
                />
            )}
            {zoomOpen && <ImageZoomModal open={zoomOpen} src={fullImageSource} onClose={() => setZoomOpen(false)} />}
        </div>
    );
};

export default DetailPage;
