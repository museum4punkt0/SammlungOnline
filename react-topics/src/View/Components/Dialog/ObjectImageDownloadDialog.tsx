import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import LanguageOutlined from '@material-ui/icons/LanguageOutlined';
import SaveAltOutlinedIcon from '@material-ui/icons/SaveAltOutlined';
import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link as License } from '../Object/ObjectContext';
import useStyles from './objectImageDownloadDialog.jss';

interface IDialogProps {
    filename: string;
    isOpen: boolean;
    image: string;
    license: License;
    onClose: () => void;
}

function ObjectImageDownloadDialog({ filename, license, isOpen, image, onClose }: IDialogProps): ReactElement {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <React.Fragment>
            <Dialog style={{ zIndex: 1400 }} fullWidth maxWidth={'md'} open={isOpen} onClose={onClose}>
                <DialogTitle className={classes.content} disableTypography={true}>
                    <Typography variant={'h3'} className={classes.downloadDialogTitle}>
                        {t('dialog download title')}
                    </Typography>
                    <IconButton data-cy="dialog-close" onClick={onClose} className={classes.downloadDialogCloseButton}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent className={clsx(classes.content, classes.verticalLine, classes.container)}>
                    <Grid container spacing={6}>
                        {/*TODO use license from props*/}
                        <Grid item={true} md={6}>
                            <Typography className={classes.capitalize} xs-align="left" sm-align="center" variant="h4">
                                {t('download noncommercial use')}
                            </Typography>
                            <Typography className={classes.downloadDialogContentTypo}>
                                <Trans t={t} i18nKey={'download image dialog content'}>
                                    Die von Ihnen ausgewählte Werkabbildung unterliegt den Lizenzbedingungen gemäß: CC
                                    NC-BY-SA der Staatlichen Museen zu Berlin – Preußischer Kulturbesitz und schließt
                                    eine kommerzielle Nutzung eindeutig aus. Mit dem Herunterladen der Abbildung
                                    erklären Sie sich mit den Lizenzbedingungen rechtsverbindlich einverstanden.
                                </Trans>
                            </Typography>
                        </Grid>
                        <Grid item={true} md={6}>
                            <Typography className={classes.capitalize} xs-align="left" sm-align="center" variant="h4">
                                {t('download commercial use')}
                            </Typography>
                            <Typography className={classes.downloadDialogContentTypo}>
                                <Trans t={t} i18nKey={'download image dialog content right'}>
                                    Falls Sie eine kommerzielle Nutzung beabsichtigen wenden Sie sich bitte an die
                                    <Link href={t('link to bpk')} rel={'noreferrer'} target={'_blank'}>
                                        bpk – Bildagentur Preußischer Kulturbesitz
                                    </Link>
                                    <br />
                                    <br />
                                    Bei der Verwendung für wissenschaftliche Publikationen bitten wir um die
                                    <Link href={t('link to bpk')} rel={'noreferrer'} target={'_blank'}>
                                        Zusendung eines Belegexemplars.
                                    </Link>
                                </Trans>
                            </Typography>
                        </Grid>
                        <Grid item={true} xs={12} md={6}>
                            <Link
                                href={image}
                                className={classes.downloadImageButton}
                                download={filename}
                                target={'_blank'}
                                data-cy="download-dialog-download"
                            >
                                <Typography
                                    component="div"
                                    variant={'h4'}
                                    className={clsx(classes.downloadDialogDownloadLink)}
                                >
                                    {t('download')}
                                </Typography>
                                <SaveAltOutlinedIcon fontSize={'large'} />
                            </Link>
                        </Grid>
                        <Grid item={true} xs={12} md={6}>
                            <Link href={t('link to bpk')} className={classes.downloadImageButton} target={'_blank'}>
                                <Typography
                                    component="div"
                                    variant={'h4'}
                                    className={clsx(classes.downloadDialogDownloadLink)}
                                >
                                    {t('website bpk')}
                                </Typography>
                                <LanguageOutlined fontSize={'large'} />
                            </Link>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}

export default ObjectImageDownloadDialog;
