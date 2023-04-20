import React, { ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';

import './no-data.scss';

function NoDataPage({ content }: { content: any }): ReactElement {
  function createMarkup(richText: string) {
    return {
      __html: richText,
    };
  }

  return (
    <section className="no-data section section--default">
      <div className="no-data__content">
        <Typography className={'no-data__header'} variant={'h2'}>
          {content.fallbackHeader}
        </Typography>
        <Typography
          className={'no-data__rich-text'}
          variant={'body1'}
          component={'div'}
          dangerouslySetInnerHTML={createMarkup(content.fallbackText)}
        />
      </div>
    </section>
  );
}

export default NoDataPage;
