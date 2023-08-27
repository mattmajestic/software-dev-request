import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid'; // Import the UUID library
import '../App.css';

const supabase = createClient('https://rjmgkgtoruefbqqohelw.supabase.co', process.env.REACT_APP_SUPABASE);

const PurchaseComponent = ({ selectedServices, gitUrl, description, totalCost, onSuccess }) => {
  const handlePurchase = async () => {
    try {
      const uniqueId = uuidv4(); // Generate a unique UUID
      const { data, error } = await supabase.from('purchases').upsert([
        {
          id: uniqueId, // Use the unique UUID as the primary key
          selectedServices,
          gitUrl,
          description,
          timestamp: new Date().toISOString(),
        },
      ], { onConflict: ['id'] }); // Specify the primary key for conflict resolution

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
        Purchase (${totalCost})
      </button>
    </div>
  );
};

export default PurchaseComponent;
