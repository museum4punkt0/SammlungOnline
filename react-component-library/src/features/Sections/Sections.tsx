import React, { ReactElement } from 'react';
import { TextModuleType, TextSectionData } from 'src';
import SectionFactory from './SectionFactory';

export function Sections({
  sections,
  allowedSectionTypes,
}: {
  sections: TextSectionData[];
  allowedSectionTypes?: TextModuleType[] | undefined;
}): ReactElement {
  return (
    <div
      id={'TextSectionBoxModule'}
      data-testid={'page-text-box-links-module-wrapper'}
    >
      {sections
        .filter((value) => {
          return (
            allowedSectionTypes == undefined ||
            allowedSectionTypes.indexOf(value.moduleType) >= 0
          );
        })
        .map((value, index) => (
          <SectionFactory key={index} textSectionData={value} />
        ))}
    </div>
  );
}

