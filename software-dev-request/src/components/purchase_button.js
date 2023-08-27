import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import '../App.css';

const supabase = createClient('https://rjmgkgtoruefbqqohelw.supabase.co', process.env.REACT_APP_SUPABASE);

const PurchaseComponent = ({ selectedServices, totalCost, gitUrl, description, onSuccess }) => {
  const [requestSent, setRequestSent] = useState(false);

  const handlePurchase = async () => {
    try {
      const { data, error } = await supabase.from('purchases').insert([
        {
          selectedServices,
          gitUrl,
          description,
          timestamp: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error('Error saving purchase:', error);
      } else {
        console.log('Purchase saved successfully:', data);
        setRequestSent(true);
        onSuccess();
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
      
      {requestSent && <p className="success-message">Your request was sent.</p>}
    </div>
  );
};

export default PurchaseComponent;
