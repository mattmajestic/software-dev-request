import React from 'react';
import '../App.css';

const PopupMessage = ({ show, onClose }) => {
  return (
    <div className={`popup ${show ? 'show' : ''}`}>
      <div className="popup-content">
        <p className="popup-message">Your request has been stored in the database.</p>
        <button className="popup-close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PopupMessage;
