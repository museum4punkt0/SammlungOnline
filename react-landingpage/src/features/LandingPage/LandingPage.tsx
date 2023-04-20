/* eslint-disable no-console */
import React, {
  ReactElement,
  useEffect,
  useState,
  useRef,
  MutableRefObject,
  useLayoutEffect,
} from 'react';

import {
  TextSectionContextData,
  Sections,
  HeroSwiper,
  LandingpageService,
  // LanguageService,
  WrappedSpinner,
  ArrowUpSvg,
} from '@smb/smb-react-components-library';

import './landingPage.scss';

function LandingPage(): ReactElement {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isArrowUpVisibile, setIsArrowUpVisibile] = useState(false);

  const landingpageService = new LandingpageService();
  // const lang = LanguageService.getCurrentStrapiLanguage();
  const { data, loading: dataLoading } = landingpageService.getHeroSwiperData();
  const { data: sectionsData, loading: sectionsDataLoading } =
    landingpageService.getLandingpageSections();

  const textSectionContext: TextSectionContextData = {
    sections: sectionsData || [],
  };

  const svgScroll: MutableRefObject<SVGSVGElement | null> = useRef(null);

  const onScroll = () => {
    if (window.pageYOffset >= scrollPosition - 2) {
      setIsArrowUpVisibile(true);
    } else {
      setIsArrowUpVisibile(false);
    }
  };

  useLayoutEffect(() => {
    if (scrollPosition) {
      document.addEventListener('scroll', onScroll);
    }

    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [scrollPosition]);

  useEffect(() => {
    window.scrollTo({ top: 0 });

    if (svgScroll && svgScroll?.current && window.scrollY <= 0) {
      const position = svgScroll.current.getBoundingClientRect();

      setScrollPosition(position.y);
    }
  }, [dataLoading, sectionsDataLoading]);

  // if (!dataLoading && !sectionsDataLoading && !sectionsData) {
  //   if (lang === 'de-LS') {
  //     window.location.replace('/');
  //   } else if (lang === 'de-DGS') {
  //     window.location.replace('/gebärdensprache');
  //   }
  // }

  const handleSVGClick = () => {
    if (window.pageYOffset < scrollPosition) {
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {!dataLoading && !sectionsDataLoading ? (
        <div data-testid={'page-content-wrapper'}>
          {data?.data && (
            <>
              <HeroSwiper data={data.data} section="intro-hero" />
              <div className="svg-section">
                <svg
                  id="svg"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="40.704"
                  viewBox="0 0 24 40.704"
                  onClick={() => handleSVGClick()}
                  ref={svgScroll}
                >
                  <path
                    id="icon_arrow_right_black"
                    d="M24,3.639,20.339,0,0,20.352,20.36,40.7,24,37.066,7.28,20.352Z"
                    transform="translate(24 40.704) rotate(180)"
                    fill="#0f0900"
                  />
                </svg>
              </div>

              <Sections
                sections={textSectionContext.sections}
                hasSvg={true}
                hideInOverviewTopicStories={true}
              ></Sections>
            </>
          )}
          {isArrowUpVisibile && <ArrowUpSvg />}
        </div>
      ) : (
        <WrappedSpinner loading={true} platform={'intro'} />
      )}
    </>
  );
}

export default LandingPage;
