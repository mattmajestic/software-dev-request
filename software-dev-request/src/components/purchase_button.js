import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import '../App.css';

const supabase = createClient('https://rjmgkgtoruefbqqohelw.supabase.co', process.env.REACT_APP_SUPABASE);

const PurchaseComponent = ({ selectedServices, gitUrl, description, onSuccess }) => {
  const [isPurchaseClicked, setIsPurchaseClicked] = useState(false);
  const purchaseId = uuidv4();

  const handlePurchase = async () => {
    try {
      const { data, error } = await supabase.from('purchases').insert([
        {
          purchase_id: purchaseId,
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
        setIsPurchaseClicked(true); // Set the purchase clicked state to true
        onSuccess(); // Call the onSuccess callback to show the success message in App component
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

      {/* Display the success message only if the purchase button is clicked */}
      {isPurchaseClicked && (
        <p className="success-message">
          Your purchase with ID {purchaseId} has been completed.
        </p>
      )}
    </div>
  );
};

export default PurchaseComponent;
