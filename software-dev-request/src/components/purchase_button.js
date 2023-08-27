import React from 'react';
import { createClient } from '@supabase/supabase-js';
import '../App.css'; // Import the CSS file

const supabase = createClient('https://rjmgkgtoruefbqqohelw.supabase.co', process.env.REACT_APP_SUPABASE);

const PurchaseComponent = ({ selectedServices, account, gitUrl, description, onSuccess }) => {
  const handlePurchase = async () => {
    try {
      const { data, error } = await supabase.from('purchases').insert([
        {
          selectedServices,
          account, // Include the connected wallet address
          gitUrl,
          description,
          timestamp: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error('Error saving purchase:', error);
      } else {
        console.log('Purchase saved successfully:', data);
        onSuccess(); // Call the success handler
      }
    } catch (error) {
      console.error('Error saving purchase:', error);
    }
  };

  return (
    <div>
      <button className="purchase-button" onClick={handlePurchase}>
        Purchase
      </button>
    </div>
  );
};

export default PurchaseComponent;
