/* eslint-disable no-console */
import React, { ReactElement } from 'react';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Link,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import LanguageOutlined from '@material-ui/icons/LanguageOutlined';
import SaveAltOutlinedIcon from '@material-ui/icons/SaveAltOutlined';

import { Link as License } from '../../../Object/components/ObjectContext/ObjectContext';
import { ResearchService } from '../../../../services/ResearchService';
import useStyles from '../dialog.jss';

interface IDialogProps {
  filename: string;
  isOpen: boolean;
  image: string;
  license: License;
  onClose: () => void;
}

const licenseCodePlaceholderText = '(licenseCode)';
const externalLinkIcon = `
 <svg className={classes.svg} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 195 191">
  <g fill="#000">
   <path d="M185.818,0.161 L128.778,0.161 C123.807,0.161 119.778,4.19 119.778,9.161 C119.778,14.132 123.807,18.161 128.778,18.161 L164.09,18.161 L77.79,104.461 C74.275,107.976 74.275,113.674 77.79,117.189 C79.548,118.946 81.851,119.825 84.154,119.825 C86.457,119.825 88.76,118.946 90.518,117.189 L176.818,30.889 L176.818,66.202 C176.818,71.173 180.847,75.202 185.818,75.202 C190.789,75.202 194.818,71.173 194.818,66.202 L194.818,9.162 C194.818,4.19 190.789,0.161 185.818,0.161 Z" />
   <path d="M149,75.201 C144.029,75.201 140,79.23 140,84.201 L140,172.657 L18,172.657 L18,50.657 L111.778,50.657 C116.749,50.657 120.778,46.628 120.778,41.657 C120.778,36.686 116.749,32.657 111.778,32.657 L9,32.657 C4.029,32.657 0,36.686 0,41.657 L0,181.657 C0,186.628 4.029,190.657 9,190.657 L149,190.657 C153.971,190.657 158,186.628 158,181.657 L158,84.201 C158,79.23 153.971,75.201 149,75.201 Z" />
  </g>
 </svg>
`;

export function ObjectImageDownloadDialog({
  filename,
  isOpen,
  image,
  license,
  onClose,
}: IDialogProps): ReactElement {
  const classes = useStyles();
  const researchService = new ResearchService();
  const { loading, data } = researchService.getResearchModalData();

  const formatText = (text: string | undefined | null) => {
    const formattedText = (text || '')
      .replace(/<\/a>/g, `${externalLinkIcon}</a>`)
      .replace(
        `${licenseCodePlaceholderText}`,
        `<a href="${license.href}" aria-label="Link zu: ${
          license.text
        }" target="${license.target || '_blank'}">${
          license.text
        }${externalLinkIcon}</a>`,
      );
    return formattedText;
  };

  const getDialogVariant = () => {
    if (data?.download && data?.web) return 'md';
    return 'xs';
  };

  const getDialogContentVariant = () => {
    if (data?.download && data?.web) return 6;
    return 12;
  };

  return (
    <>
      <Dialog
        style={{ zIndex: 1400 }}
        fullWidth
        maxWidth={getDialogVariant()}
        open={isOpen}
        onClose={onClose}
      >
        {!loading && data && (
          <>
            <DialogTitle className={classes.container} disableTypography={true}>
              <div className={classes.header}>
                <Typography variant={'h3'} className={classes.title}>
                  {data.title}
                </Typography>
                <IconButton
                  data-cy="dialog-close"
                  onClick={onClose}
                  className={classes.closeButton}
                >
                  <CloseIcon fontSize="large" />
                </IconButton>
              </div>
            </DialogTitle>

            <DialogContent className={classes.container}>
              <div className={classes.contentWrapper}>
                {data.download && (
                  <Grid
                    item={true}
                    className={classes.innerContent}
                    md={getDialogContentVariant()}
                  >
                    {data.download.header && (
                      <Typography
                        className={classes.sectionTitle}
                        xs-align="left"
                        sm-align="center"
                        variant="h4"
                      >
                        {data.download.header}
                      </Typography>
                    )}
                    {data.download.text && (
                      <Typography
                        className={classes.sectionRichText}
                        component={'div'}
                        variant="body1"
                        dangerouslySetInnerHTML={{
                          __html: `${formatText(data.download.text)}`,
                        }}
                      />
                    )}
                    {data.download.buttonText && (
                      <Link
                        href={image}
                        className={classes.sectionButton}
                        download={filename}
                        target={'_blank'}
                        data-cy="download-dialog-download"
                      >
                        <Typography
                          component="div"
                          variant={'h4'}
                          className={classes.sectionButtonLink}
                        >
                          {data.download.buttonText}
                        </Typography>
                        <SaveAltOutlinedIcon fontSize={'large'} />
                      </Link>
                    )}
                  </Grid>
                )}
                {data.web && (
                  <Grid
                    item={true}
                    className={classes.innerContent}
                    md={getDialogContentVariant()}
                  >
                    {data.web.header && (
                      <Typography
                        className={classes.sectionTitle}
                        xs-align="left"
                        sm-align="center"
                        variant="h4"
                      >
                        {data.web.header}
                      </Typography>
                    )}
                    {data.web.text && (
                      <Typography
                        className={classes.sectionRichText}
                        component={'div'}
                        variant="body1"
                        dangerouslySetInnerHTML={{
                          __html: `${formatText(data.web.text)}`,
                        }}
                      />
                    )}
                    {data.web.buttonLink && (
                      <Link
                        href={data.web.buttonLink}
                        className={classes.sectionButton}
                        target={'_blank'}
                      >
                        <Typography
                          component="div"
                          variant={'h4'}
                          className={classes.sectionButtonLink}
                        >
                          {data.web.buttonText}
                        </Typography>
                        <LanguageOutlined fontSize={'large'} />
                      </Link>
                    )}
                  </Grid>
                )}
              </div>
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
}
