import React from 'react';
import clsx from 'clsx';

import { Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

import { ILink } from '../../../../definitions/interfaces/link.interface';
import { EExhibitAsideLinks } from '../../../../definitions/enums/exhibit-aside-links.enum';

import useStyles from './exhibitAsideLinks.jss';

export interface IExhibitAsideLinksProps {
  title: string;
  links?: ILink[];
  type: EExhibitAsideLinks;
}

export const ExhibitAsideLinks: React.FC<IExhibitAsideLinksProps> = ({ title, links, type }) => {
  const classes = useStyles();

  const containerTypeClasses = clsx(
    { [classes.contentTopic]: type === EExhibitAsideLinks.TOPIC },
    { [classes.contentGuide]: type === EExhibitAsideLinks.GUIDE },
    { [classes.contentText]: type === EExhibitAsideLinks.TEXT },
  );

  return (
    <div className={clsx(classes.content, containerTypeClasses)}>
      <Typography component='div' variant='h5' className={clsx(classes.typoTitle, containerTypeClasses)}>
        {title}
      </Typography>
      {links?.map((link, i) => (
        <Link key={i} href={link.href} color='inherit' className={clsx(classes.link, containerTypeClasses)}>
          {link.caption}
          <ArrowRightAltIcon />
        </Link>
      ))}
    </div>
  );
};
