import { CardMedia } from '@material-ui/core';
import React, { ReactElement } from 'react';

import useStyles from '../expandableCard.jss';

function PreviewContent({ image }: { image: string }): ReactElement {
  const classes = useStyles();

  // const image = "/assets/images/guide/guide_01/objects/image_01_1265x2013.png"

  // <div className={classes.objectPreviewImage} style={{ backgroundImage: `${image}` }}></div>
  return (
    <CardMedia
      className={classes.objectPreviewImage}
      src="picture"
      image={image}
    />
  );
}

export default PreviewContent;
