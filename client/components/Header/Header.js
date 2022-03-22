import React from 'react';
import PropTypes from 'prop-types';

export const Header = ({ location, zip }) => {
  return (
    <div className="Header">
      <div className="Header-inner">
        <h1>Toast Weather</h1>
        {zip && (
          <p>
            Displaying weather for: {zip}
            {location && ` (${location})`}
          </p>
        )}
      </div>
    </div>
  );
};

Header.propTypes = {
  location: PropTypes.string,
  zip: PropTypes.string,
};

Header.defaultProps = {
  location: null,
  zip: null,
};
