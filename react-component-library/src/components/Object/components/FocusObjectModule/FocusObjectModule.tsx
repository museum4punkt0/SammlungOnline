import React, { ReactElement } from 'react';

import useStyles from './focusObjectModule.jss';

function FocusObjectModule({
  title,
  children,
}: {
  title: string;
  children?: ReactElement[];
}): ReactElement {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>{title}</h2>
      <div>{children}</div>
    </div>
  );
}

export default FocusObjectModule;
