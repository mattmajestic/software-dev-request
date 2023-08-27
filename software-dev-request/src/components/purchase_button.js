import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library
import '../App.css';

const supabase = createClient('https://rjmgkgtoruefbqqohelw.supabase.co', process.env.REACT_APP_SUPABASE);

const PurchaseComponent = ({ selectedServices, gitUrl, description, onSuccess }) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [purchaseId, setPurchaseId] = useState(null); // Declare purchaseId state

  const handlePurchase = async () => {
    try {
      const uniqueId = uuidv4(); // Generate a unique UUID
      const { data, error } = await supabase.from('purchases').insert([
        {
          purchase_id: uniqueId, // Use the unique UUID as the primary key
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
        setPurchaseId(uniqueId); // Store the generated purchase_id
        setShowSuccessMessage(true); // Show the success message
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
      {showSuccessMessage && (
        <p className="success-message">
          Your purchase has been stored in Supabase with purchase ID: {purchaseId}
        </p>
      )}
    </div>
  );
};

export default PurchaseComponent;
