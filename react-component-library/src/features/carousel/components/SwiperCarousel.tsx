/* eslint-disable react/jsx-key */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, EffectFade } from 'swiper';

SwiperCore.use([Navigation, Pagination, EffectFade]);

interface SwiperCarouselProps {
  data: any;
  type: 'auto' | 'pair' | 'hero';
  section: string;
  sliderComponent: React.ElementType;
}

const SwiperCarousel = (props: SwiperCarouselProps) => {
  const auto = 'auto';

  const getNavigation = () => {
    switch (props.section) {
      case 'guide-pair':
        return {
          prevEl: `.swiper-button-prev-guide-pair`,
          nextEl: `.swiper-button-next-guide-pair`,
        };
      case 'guide-auto':
        return {
          prevEl: `.swiper-button-prev-guide-auto`,
          nextEl: `.swiper-button-next-guide-auto`,
        };
      case 'topics-pair':
        return {
          prevEl: `.swiper-button-prev-topics-pair`,
          nextEl: `.swiper-button-next-topics-pair`,
        };
      case 'topics-auto':
        return {
          prevEl: `.swiper-button-prev-topics-auto`,
          nextEl: `.swiper-button-next-topics-auto`,
        };
      case 'research-pair':
        return {
          prevEl: `.swiper-button-prev-research-pair`,
          nextEl: `.swiper-button-next-research-pair`,
        };

      case 'research-auto':
        return {
          prevEl: `.swiper-button-prev-research-auto`,
          nextEl: `.swiper-button-next-research-auto`,
        };
      default:
        return {
          prevEl: `.swiper-button-prev`,
          nextEl: `.swiper-button-next`,
        };
    }
  };

  const getSliderSettings = () => {
    if (props.type === 'hero') {
      return {
        spaceBetween: 16,
        resizeObserver: true,
        watchOverflow: true,
        slidesPerView: 1,
        navigation: { ...getNavigation() },
        effect: 'fade' as any,
        fadeEffect: { crossFade: true },
        speed: 1000,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          type: 'bullets' as any,
        },
        paginationelement: 'button',
      };
    } else if (props.type === 'pair') {
      return {
        spaceBetween: 16,
        resizeObserver: true,
        watchOverflow: true,
        slidesPerView: 1,
        navigation: { ...getNavigation() },
        breakpoints: {
          // when window width is >= 500px
          '500': {
            slidesPerView: 2,
            spaceBetween: 24,
          },
        },
      };
    } else {
      return {
        spaceBetween: 16,
        resizeObserver: true,
        watchOverflow: true,
        slidesPerView: 1,
        navigation: { ...getNavigation() },
        breakpoints: {
          // when window width is >= 500px
          '500': {
            slidesPerView: auto as any,
            spaceBetween: 24,
          },
        },
      };
    }
  };

  const getSwiperClassName = (): string => {
    if (props.type === 'hero') return 'swiper-outter-conatiner--hero';
    return props.type === 'auto' ? 'swiper-slide-auto' : '';
  };

  return (
    <div className={`swiper-outter-conatiner ${getSwiperClassName()}`}>
      {props.type !== 'hero' && (
        <div
          className={`swiper-button-prev swiper-button-prev-${props.section}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="40.704"
            viewBox="0 0 24 40.704"
          >
            <path
              id="icon_arrow_right_black"
              d="M24,3.639,20.339,0,0,20.352,20.36,40.7,24,37.066,7.28,20.352Z"
              fill="currentColor"
            />
          </svg>
        </div>
      )}
      <Swiper
        {...{
          ...getSliderSettings(),
          a11y: { enabled: true },
        }}
      >
        {props.data &&
          props.data.map((child: any, index: number) => {
            return (
              <SwiperSlide key={index}>
                <props.sliderComponent {...child} />
              </SwiperSlide>
            );
          })}
      </Swiper>
      {props.type !== 'hero' && (
        <div
          className={`swiper-button-next swiper-button-next-${props.section}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="40.704"
            viewBox="0 0 24 40.704"
          >
            <path
              id="icon_arrow_right_black"
              d="M24,3.639,20.339,0,0,20.352,20.36,40.7,24,37.066,7.28,20.352Z"
              transform="translate(24 40.704) rotate(180)"
              fill="currentColor"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
export default SwiperCarousel;
