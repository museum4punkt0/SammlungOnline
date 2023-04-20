import React from 'react';
import clsx from 'clsx';

import { Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';

import { EExhibitAsideLinks } from '../../enums/index';
import { ILink } from '../../types/index';

import useStyles from './exhibitAsideLinks.jss';
import './exhibitLinks.scss';

interface IExhibitAsideLinksProps {
  title: string;
  links?: ILink[];
  type: EExhibitAsideLinks;
}

const ExhibitAsideLinks: React.FC<IExhibitAsideLinksProps> = ({ title, links, type }) => {
  const classes = useStyles();

  const containerTypeClasses = clsx(
    { [classes.contentTopic]: type === EExhibitAsideLinks.TOPIC },
    { [classes.contentGuide]: type === EExhibitAsideLinks.GUIDE },
    { [classes.contentText]: type === EExhibitAsideLinks.TEXT },
  );

  return (
    <div className={`${clsx(containerTypeClasses)} link-card`}>
      {title && (
        <Typography component="div" variant="h6" className={`link-card__title`}>
          {title}
        </Typography>
      )}
      {links &&
        links?.map((link, i) => {
          return link.href ? (
            <Link
              key={i}
              href={link.href}
              color="inherit"
              variant={'subtitle1'}
              className={`link-card__link`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 68.7 52.842"
                color="currentColor"
                className={'link-card__arrow'}
              >
                <path
                  id="icon_arrow_link"
                  d="M51.568,19.816H0V33.026H51.568V52.842L68.7,26.421,51.568,0V19.816Z"
                  fill="currentColor"
                />
              </svg>
              {link.caption}
            </Link>
          ) : (
            <></>
          );
        })}
    </div>
  );
};

export default ExhibitAsideLinks;
