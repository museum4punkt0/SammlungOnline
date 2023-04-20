/* eslint-disable no-console */
import React from 'react';
import { Link, Typography } from '@material-ui/core';

import useStyles from './exhibitAsideText.jss';

interface IExhibitAsideTextProps {
  title: string;
  content: string;
  content2?: string;
  url?: string;
}

const ExhibitAsideText: React.FC<IExhibitAsideTextProps> = ({
  title,
  content,
  content2,
  url,
}) => {
  const classes = useStyles();
  const renderContent = () => {
    if (url) {
      return (
        <>
          {content && (
            <Link
              className={classes.link}
              href={url}
              rel="noopener noreferrer"
              target="_blank"
              variant="h6"
            >
              {content}
              <svg
                className={classes.svg}
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 195 191"
              >
                <g fill="#000">
                  <path d="M185.818,0.161 L128.778,0.161 C123.807,0.161 119.778,4.19 119.778,9.161 C119.778,14.132 123.807,18.161 128.778,18.161 L164.09,18.161 L77.79,104.461 C74.275,107.976 74.275,113.674 77.79,117.189 C79.548,118.946 81.851,119.825 84.154,119.825 C86.457,119.825 88.76,118.946 90.518,117.189 L176.818,30.889 L176.818,66.202 C176.818,71.173 180.847,75.202 185.818,75.202 C190.789,75.202 194.818,71.173 194.818,66.202 L194.818,9.162 C194.818,4.19 190.789,0.161 185.818,0.161 Z" />
                  <path d="M149,75.201 C144.029,75.201 140,79.23 140,84.201 L140,172.657 L18,172.657 L18,50.657 L111.778,50.657 C116.749,50.657 120.778,46.628 120.778,41.657 C120.778,36.686 116.749,32.657 111.778,32.657 L9,32.657 C4.029,32.657 0,36.686 0,41.657 L0,181.657 C0,186.628 4.029,190.657 9,190.657 L149,190.657 C153.971,190.657 158,186.628 158,181.657 L158,84.201 C158,79.23 153.971,75.201 149,75.201 Z" />
                </g>
              </svg>
            </Link>
          )}
          {content2 && (
            <Typography variant="body1" className={classes.paragraphTwoLine}>
              {content2}
            </Typography>
          )}
        </>
      );
    } else {
      return (
        <Typography variant="body1" className={classes.paragraph}>
          {content}
        </Typography>
      );
    }
  };
  return (
    <div className={classes.container}>
      {content && title && (
        <Typography variant="h6" component={'h6'} className={classes.title}>
          {title}:
        </Typography>
      )}
      {renderContent()}
    </div>
  );
};

export default ExhibitAsideText;
