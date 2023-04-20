import React, { ReactElement, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  TextSectionContextData,
  TopicStoriesService,
  Sections,
  HeroSwiper,
  TextModuleType,
  LandingpageService,
  SiteConfigService,
  WrappedSpinner,
  ArrowUpSvg,
} from '@smb/smb-react-components-library';

import useStyles from './landingPage.jss';
import './landingPage.scss';

function LandingPage(): ReactElement {
  const storiesPlatform = 'all';
  const [isArrowUpVisibile, setIsArrowUpVisibile] = useState(false);
  const { t } = useTranslation();
  const classes = useStyles();

  const siteConfigService = new SiteConfigService();
  const { contextData: heroFallbackData } = siteConfigService.getTopicPage();

  const storiesService = new TopicStoriesService();
  const { data: stories } = storiesService.getStoriesData(
    storiesPlatform,
    false,
  );

  const landingpageService = new LandingpageService();
  const { data: sectionsData, loading: sectionsDataLoading } =
    landingpageService.getLandingpageSections();

  const textSectionContext: TextSectionContextData = {
    sections: sectionsData || [],
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.addEventListener('scroll', onScroll);

    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, []);

  const onScroll = () => {
    if (window.pageYOffset >= 500) {
      setIsArrowUpVisibile(true);
    } else {
      setIsArrowUpVisibile(false);
    }
  };

  const getHeroCta = () => {
    const data = sectionsData
      ?.filter((item) => item.moduleType === 2)[0]
      .sections.filter(
        (item: { type: string }) => item.type === 'CollectionsBlock',
      )[0];

    return data?.cta;
  };

  const getHeroCollectionData = () => {
    if (!stories || (stories && !stories.hero?.length)) return heroFallbackData;

    const collection = stories?.hero.map((item: any) => {
      return {
        ...item,
        image: item?.previewImage,
        subtitle: t(`${item?.subtitle}`),
        text: item?.text,
        actionText: getHeroCta() || t(item.cta),
        actionHref: item.href,
        caption: null,
        target: '_blank',
        href: '#',
      };
    });

    return collection;
  };

  const getCollectionBlock = (
    block: any[],
    fallbackBlock: {
      type: string;
      title: string;
      text: string;
      cta: string;
      slug: string;
      platform: string;
    },
  ) => {
    const collectionBlock = block.filter(
      (item: { type: string }) => item.type === 'CollectionsBlock',
    );

    if (collectionBlock.length) return block;
    return [...block, fallbackBlock];
  };

  const getCollectionSection = (sectionBlock: any[]) => {
    const fallbackCollectionsBlock = {
      // type: 'CollectionsBlock',
      type: 'CollectionsBlock',
      title: '',
      text: '',
      cta: t('go to topic'),
      slug: 'TOPIC',
      platform: '',
    };

    const topicSectionBlock = {
      fallbackModule: [
        {
          hasSwiperBlock: false,
          id: 'stories',
          moduleType: 2,
          sections: [fallbackCollectionsBlock],
        },
      ],
      fallbackBlock: fallbackCollectionsBlock,
    };

    const moduleTypeTopic = sectionBlock.filter(
      (block: { moduleType: number }) => block.moduleType === 2,
    );
    if (!moduleTypeTopic.length) return topicSectionBlock.fallbackModule;

    return moduleTypeTopic.map((block: { sections: any[] }) => {
      return {
        ...block,
        sections: getCollectionBlock(
          block.sections,
          topicSectionBlock.fallbackBlock,
        ),
      };
    });
  };

  return (
    <>
      {!sectionsDataLoading ? (
        <div
          className={classes.content}
          data-testid={'page-image-content-wrapper'}
        >
          {(heroFallbackData || stories.hero?.length > 0) && (
            <HeroSwiper
              data={getHeroCollectionData() as any}
              section="topics-hero"
            />
          )}
          {!sectionsDataLoading && (
            <>
              <Sections
                sections={getCollectionSection(textSectionContext.sections)}
                allowedSectionTypes={[TextModuleType.TOPIC]}
                pagination={true}
              />
              {/* <Sections
                sections={textSectionContext.sections}
                allowedSectionTypes={[
                  TextModuleType.RESEARCH,
                  TextModuleType.GUIDE,
                ]}
              /> */}
            </>
          )}
          {isArrowUpVisibile && <ArrowUpSvg />}
        </div>
      ) : (
        <WrappedSpinner loading={true} platform="topics" />
      )}
    </>
  );
}

export default LandingPage;
