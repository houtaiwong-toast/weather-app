import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '~/components';

export const Alert = ({ event, fullText, sender, summary }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return fullText ? (
    <>
      <div className="Alert">
        <button className="Alert-button" onClick={openModal}>
          {event && `${event}: `}
          {summary}
        </button>
      </div>
      <Modal
        content={fullText}
        handleClose={closeModal}
        isOpen={modalOpen}
        title={summary}
        subtitle={`From ${sender}`}
      />
    </>
  ) : (
    <div className="Alert">
      <p className="Alert-text">{summary}</p>
    </div>
  );
};

Alert.propTypes = {
  event: PropTypes.string,
  fullText: PropTypes.string,
  sender: PropTypes.string,
  summary: PropTypes.string.isRequired,
};

Alert.defaultProps = {
  event: null,
  fullText: null,
  sender: null,
};
