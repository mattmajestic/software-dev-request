import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library
import '../App.css';

const supabase = createClient('https://rjmgkgtoruefbqqohelw.supabase.co', process.env.REACT_APP_SUPABASE);

const PurchaseComponent = ({ selectedServices, gitUrl, description, onSuccess }) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [purchaseId, setPurchaseId] = useState(null);

  const servicesData = [
    { name: 'Code Review', price: 100 },
    { name: 'Coding', price: 300 },
    { name: 'Pull Request', price: 500 },
  ];

  const totalCost = selectedServices.reduce((total, serviceName) => {
    const service = servicesData.find((s) => s.name === serviceName);
    return total + (service ? service.price : 0);
  }, 0);

  const handlePurchase = async () => {
    try {
      const uniqueId = uuidv4();
      const { data, error } = await supabase.from('purchases').insert([
        {
          purchase_id: uniqueId,
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
        setPurchaseId(uniqueId);
        setShowSuccessMessage(true);
        onSuccess();
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
          <br />
          Total Cost: ${totalCost}
        </p>
      )}
    </div>
  );
};

export default PurchaseComponent;
