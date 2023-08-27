import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Modal from 'react-modal'; // Import the modal component
import '../App.css';

const supabase = createClient('https://rjmgkgtoruefbqqohelw.supabase.co', process.env.REACT_APP_SUPABASE);

const PurchaseComponent = ({ selectedServices, totalCost, gitUrl, description }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handlePurchase = async () => {
    try {
      const dataToInsert = selectedServices.map((service) => ({
        selectedServices: service,
        gitUrl,
        description,
        timestamp: new Date().toISOString(),
      }));
  
      const { data, error } = await supabase.from('purchases').insert(dataToInsert);
  
      if (error) {
        console.error('Error saving purchase:', error);
      } else {
        console.log('Purchase saved successfully:', data);
        setShowPopup(true); // Show the modal
      }
    } catch (error) {
      console.error('Error saving purchase:', error);
    }
  };

  return (
    <div>
      <button className="purchase-button" onClick={handlePurchase}>
        <span className="purchase-icon" />
        Purchase (${totalCost})
      </button>
      
      <Modal
        isOpen={showPopup}
        onRequestClose={() => setShowPopup(false)} // Close the modal when requested
        contentLabel="Popup Modal"
        className="popup-modal"
        overlayClassName="popup-overlay"
      >
        <div className="popup-content">
          <p className="popup-message">Your request has been stored in the database.</p>
          <button className="popup-close-button" onClick={() => setShowPopup(false)}>
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default PurchaseComponent;
