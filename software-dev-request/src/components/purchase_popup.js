import React from 'react';
import Modal from 'react-modal';

const PopupMessageModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Popup">
      <div>
        <p>Your request has been stored in the database.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};

export default PopupMessageModal;
