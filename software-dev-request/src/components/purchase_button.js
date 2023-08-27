import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid'; // Import the UUID library
import '../App.css';

const supabase = createClient('https://rjmgkgtoruefbqqohelw.supabase.co', process.env.REACT_APP_SUPABASE);

const PurchaseComponent = ({ selectedServices, account, gitUrl, description, onSuccess }) => {
  const [isPurchaseCompleted, setPurchaseCompleted] = useState(false);
  const purchaseId = uuidv4(); // Generate a new UUID

  const handlePurchase = async () => {
    try {
      const { data, error } = await supabase.from('purchases').insert([
        {
          purchase_id: purchaseId,
          selectedServices,
          walletAddress: account,
          gitUrl,
          description,
          timestamp: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error('Error saving purchase:', error);
      } else {
        console.log('Purchase saved successfully:', data);
        setPurchaseCompleted(true);
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
        Purchase
      </button>

      {isPurchaseCompleted && (
        <p className="success-message">
          Your purchase with ID {purchaseId} has been completed. Wallet Address: {account}
        </p>
      )}
    </div>
  );
};

export default PurchaseComponent;
