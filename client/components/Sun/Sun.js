import React from 'react';

// Credit: https://codepen.io/thebabydino/pen/dvEEqO
export const Sun = () => {
  return (
    <svg className="osc" viewBox="-208 -208 500 500">
      <defs>
        <line id="ray" x1="-2" x2="20"></line>
      </defs>
      <path
        id="cloud"
        d="M-28 113
                    a52 52 0 1 1 12-103
                    a70 70 0 0 1 120-8
                    a58 58 0 1 1 23 111z"
      ></path>
      <mask id="m">
        <circle r="500"></circle>
        <use xlinkHref="#cloud"></use>
      </mask>
      <g id="sun">
        <circle r="500" stroke="none"></circle>
        <g className="osc">
          <circle r="65"></circle>
          <g id="rays">
            <g transform="rotate(330)">
              <use xlinkHref="#ray" x="85"></use>
            </g>
            <g transform="rotate(300)">
              <use xlinkHref="#ray" x="85"></use>
            </g>
            <g transform="rotate(270)">
              <use xlinkHref="#ray" x="85"></use>
            </g>
            <g transform="rotate(240)">
              <use xlinkHref="#ray" x="85"></use>
            </g>
            <g transform="rotate(210)">
              <use xlinkHref="#ray" x="85"></use>
            </g>
            <g transform="rotate(180)">
              <use xlinkHref="#ray" x="85"></use>
            </g>
            <g transform="rotate(150)">
              <use xlinkHref="#ray" x="85"></use>
            </g>
            <g transform="rotate(120)">
              <use xlinkHref="#ray" x="85"></use>
            </g>
            <g transform="rotate(90)">
              <use xlinkHref="#ray" x="85"></use>
            </g>
            <g transform="rotate(60)">
              <use xlinkHref="#ray" x="85"></use>
            </g>
            <g transform="rotate(30)">
              <use xlinkHref="#ray" x="85"></use>
            </g>
            <g transform="rotate(0)">
              <use xlinkHref="#ray" x="85"></use>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

Sun.propTypes = {};
