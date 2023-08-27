import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import '../App.css';

const supabase = createClient('https://rjmgkgtoruefbqqohelw.supabase.co', process.env.REACT_APP_SUPABASE);

const PurchaseComponent = ({ selectedServices, gitUrl, description, onSuccess }) => {
  const [isPurchaseSuccess, setPurchaseSuccess] = useState(false);
  const purchaseId = uuidv4();

  const handlePurchase = async () => {
    try {
      const { error } = await supabase.from('purchases').insert([
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
        console.log('Purchase saved successfully');
        setPurchaseSuccess(true);
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

      {isPurchaseSuccess && (
        <p className="success-message">
          Your purchase has been completed with ID: {purchaseId}
        </p>
      )}
    </div>
  );
};

export default PurchaseComponent;
