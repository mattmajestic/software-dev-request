import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import '../App.css';

const supabase = createClient('https://rjmgkgtoruefbqqohelw.supabase.co', process.env.REACT_APP_SUPABASE);

const PurchaseComponent = ({ selectedServices, gitUrl, description }) => {
  const handlePurchase = async () => {
    const purchaseId = uuidv4();

    try {
      const { data, error } = await supabase.from('purchases').insert([
        {
          purchase_id: purchaseId,
          selected_services: selectedServices,
          git_url: gitUrl,
          description: description,
          timestamp: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error('Error saving purchase:', error);
      } else {
        console.log('Purchase saved successfully:', data);
      }
    } catch (error) {
      console.error('Error saving purchase:', error);
    }
  };

  return (
    <div>
      <button className="purchase-button" onClick={handlePurchase}>
        <span className="purchase-icon" />
        Purchase
      </button>

      {/* Display the success message */}
      <p className="success-message">
        Your purchase has been completed.
      </p>
    </div>
  );
};

export default PurchaseComponent;
