/* eslint-disable no-console */
import React, { ReactElement } from 'react';
import { TextModuleType, TextSectionData } from 'src';
import SectionFactory from './SectionFactory';

export function Sections({
  sections,
  allowedSectionTypes,
  pagination,
  hideInOverviewTopicStories = false,
  id = 'TextSectionBoxModule',
  hasSvg,
  isFooter,
}: {
  sections: TextSectionData[];
  allowedSectionTypes?: TextModuleType[] | undefined;
  pagination?: boolean;
  hideInOverviewTopicStories?: boolean;
  id?: string;
  hasSvg?: boolean;
  isFooter?: boolean;
}): ReactElement {
  return (
    <div id={id} data-testid={'page-text-box-links-module-wrapper'}>
      {sections
        .filter((value) => {
          return (
            allowedSectionTypes == undefined ||
            allowedSectionTypes.indexOf(value.moduleType) >= 0
          );
        })
        .map((value, index) => (
          <SectionFactory
            key={index}
            textSectionData={value}
            pagination={pagination}
            hideInOverviewTopicStories={hideInOverviewTopicStories}
            hasSvg={hasSvg}
            isFooter={isFooter}
          />
        ))}
    </div>
  );
}
