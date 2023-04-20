import React, { ReactElement } from 'react';

import './arrow-up.scss';

function ArrowUpSvg(): ReactElement {
  const handleClick = (): any => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <button className="arrow-up" onClick={handleClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40.704"
          height="24"
          viewBox="0 0 40.704 24"
        >
          <path
            id="icon_arrow_right_black"
            d="M24,3.639,20.339,0,0,20.352,20.36,40.7,24,37.066,7.28,20.352Z"
            transform="translate(40.704) rotate(90)"
            fill="#fff"
          />
        </svg>
      </button>
    </>
  );
}

export default ArrowUpSvg;
