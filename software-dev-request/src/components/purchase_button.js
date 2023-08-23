import React from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://rjmgkgtoruefbqqohelw.supabase.co', process.env.REACT_APP_SUPABASE);

const PurchaseComponent = ({ selectedServices, gitUrl, description }) => {
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
      }
    } catch (error) {
      console.error('Error saving purchase:', error);
    }
  };

  return (
    <div>
      <button onClick={handlePurchase}>Purchase</button>
    </div>
  );
};

export default PurchaseComponent;
