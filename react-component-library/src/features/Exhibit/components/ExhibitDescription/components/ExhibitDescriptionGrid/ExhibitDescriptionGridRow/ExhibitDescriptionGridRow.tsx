/* eslint-disable no-console */
import React from 'react';

import {
  Grid,
  Typography,
  Button,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined';

import useStyles from './exhibitDescriptionGridRow.jss';
import { IExhibitDescriptionGridRowProps } from '../../../types';
import {
  copyToClipboard,
  shortenPermalink,
} from '../../../../../../../utils/helperFunctions';
import { SafeEscapedHTML } from '../../../../../../../components';

/**
 * Component used to render a row in the grid of detail view
 *
 * -----
 * @param title - title of the row (appears in first column)
 * @param content - content of the row (appears in second column)
 * @param permalink - if it's the row with permalink (last row)
 * @constructor
 */
export const ExhibitDescriptionGridRow: React.FC<
  IExhibitDescriptionGridRowProps
> = ({ title, content, permalink }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const copyPermalink = () => {
    copyToClipboard(content as string);
  };

  // todo: use linkBuilder to build the internal links
  return (
    <Grid className={classes.row} container>
      <Grid item xs={12} sm={4} md={5} className={classes.cell}>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        {permalink && (
          <Tooltip title={`${t('details.aside.permalinkCopied')}`} arrow={true}>
            <IconButton
              color="inherit"
              aria-label={`${t('details.aside.permalinkCopied')}`}
              data-testid={'object-actions-permlink'}
              className={`exhibit-actions__btn`}
              onClick={copyPermalink}
            >
              <LinkOutlinedIcon color="primary" fontSize="large" />
            </IconButton>
          </Tooltip>
        )}
      </Grid>
      <Grid item xs={12} sm={8} md={7} className={classes.cellLink}>
        {Array.isArray(content) &&
          content.map((link, index) => {
            const data = link as unknown as {
              markup: string;
              formatted: string;
            };
            return (
              <React.Fragment key={index}>
                <SafeEscapedHTML htmlString={data.markup ?? data.formatted}
                                 cssClassNames={classes.content}/>
              </React.Fragment>
            );
          })}
        {!Array.isArray(content) && !permalink && (
          <Typography
            component={'p'}
            variant="body1"
            className={classes.content}
          >
            {content}
          </Typography>
        )}
        {permalink && (
          <Tooltip title={`${t('details.aside.permalinkCopied')}`} arrow={true}>
            <Button
              variant="text"
              className={classes.button}
              onClick={copyPermalink}
            >
              <Typography className={classes.content}>
                {shortenPermalink(content as string)}
              </Typography>
            </Button>
          </Tooltip>
        )}
      </Grid>
    </Grid>
  );
};
