import React, { ReactElement } from 'react';
import Grid from '@material-ui/core/Grid';

function FooterGrid({ children, className }: { children: ReactElement[]; className: string }): ReactElement {
  return (
    <div className={className}>
      <Grid container={true} spacing={0} direction={'row'} justify={'flex-start'} alignItems={'flex-start'}>
        {children.map((child, index) => (
          <Grid item={true} xs={12} sm={6} md={3} lg={3} key={index}>
            {child}
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default FooterGrid;
