import React, { ReactElement } from 'react';

import useStyles from './sliderContent.jss';

function SliderContent({
  activeIndex,
  children,
}: {
  activeIndex: number;
  children: ReactElement | ReactElement[];
}): ReactElement {
  const classes = useStyles();

  let length = 1;
  if (Array.isArray(children)) {
    length = children.length;
  }

  const width = 100 * length;
  const translateX = (100 / length) * activeIndex;

  return (
    <div
      className={classes.sliderContent}
      style={{ width: `${width}%`, transform: `translateX(-${translateX}%)` }}
    >
      {children}
    </div>
  );
}

export default SliderContent;
