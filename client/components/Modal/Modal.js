import React from 'react';
import PropTypes from 'prop-types';

export const Modal = ({
  content,
  handleClose,
  isOpen,
  subtitle,
  title,
}) => {
  return isOpen ? (
    <div className="Modal-veil" onClick={handleClose}>
      <div className="Modal" onClick={e => e.stopPropagation()}>
        {title && <h2 className="Modal-title">{title}</h2>}
        {subtitle && <h3 className="Modal-subtitle">{subtitle}</h3>}
        {content}
      </div>
    </div>
  ) : (
    <></>
  );
};

Modal.propTypes = {
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
    .isRequired,
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

Modal.defaultProps = {
  isOpen: false,
  subtitle: null,
  title: null,
};
