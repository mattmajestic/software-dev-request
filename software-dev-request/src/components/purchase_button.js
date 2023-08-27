import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import '../App.css';

const supabase = createClient('https://rjmgkgtoruefbqqohelw.supabase.co', process.env.REACT_APP_SUPABASE);

const PurchaseComponent = ({ selectedServices, gitUrl, description, onSuccess }) => {
  const [isPurchaseButtonClicked, setIsPurchaseButtonClicked] = useState(false);
  const [purchaseId, setPurchaseId] = useState('');

  const handlePurchase = async () => {
    try {
      const newPurchaseId = uuidv4();
      const { data, error } = await supabase.from('purchases').insert([
        {
          purchase_id: newPurchaseId,
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
        setIsPurchaseButtonClicked(true);
        setPurchaseId(newPurchaseId);
        onSuccess();
      }
    } catch (error) {
      console.error('Error saving purchase:', error);
    }
  };

  return (
    <div>
      <button className="purchase-button" onClick={handlePurchase} disabled={isPurchaseButtonClicked}>
        <span className="purchase-icon" />
        Purchase
      </button>

      {isPurchaseButtonClicked && (
        <p className="success-message">
          Your purchase with ID {purchaseId} has been completed.
        </p>
      )}
    </div>
  );
};

export default PurchaseComponent;
