import React, { useState } from 'react';
import Snowfall from 'react-snowfall';
import GitHubInput from './components/github_input';
import './App.css';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const supabase = createClient('https://rjmgkgtoruefbqqohelw.supabase.co', process.env.REACT_APP_SUPABASE);

const App = () => {
  const servicesData = [
    { name: 'Code Review', price: 100 },
    { name: 'Coding', price: 300 },
    { name: 'Pull Request', price: 500 },
  ];

  const [selectedServices, setSelectedServices] = useState([]);
  const [gitUrl, setGitUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isPurchaseSuccess, setPurchaseSuccess] = useState(false);

  const toggleService = (serviceName) => {
    setSelectedServices((prevServices) =>
      prevServices.includes(serviceName)
        ? prevServices.filter((service) => service !== serviceName)
        : [...prevServices, serviceName]
    );
  };

  const handlePurchase = async () => {
    const purchaseId = uuidv4();

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
        setPurchaseSuccess(true); // Set purchase success state to true
      }
    } catch (error) {
      console.error('Error saving purchase:', error);
    }
  };

  const totalCost = selectedServices.reduce((total, serviceName) => {
    const service = servicesData.find((s) => s.name === serviceName);
    return total + (service ? service.price : 0);
  }, 0);

  return (
    <div className="App">
      <Snowfall snowflakeCount={100} snowflakeSize={[5, 10]} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      <div className="form-container">
        <h1 className="app-title">Software Dev Request</h1>
        <form>
          <div className="services-container">
            <h2>Select Services:</h2>
            {servicesData.map((service) => (
              <label key={service.name} className="service-label">
                <input
                  type="checkbox"
                  className="service-input"
                  value={service.name}
                  checked={selectedServices.includes(service.name)}
                  onChange={() => toggleService(service.name)}
                />
                {service.name} - ${service.price}
              </label>
            ))}
          </div>
          <GitHubInput setGitUrl={setGitUrl} setDescription={setDescription} />
          <div className="total-cost">
            <h2>Total Cost:</h2>
            <p className="cost">${totalCost}</p>
          </div>
          <button className="purchase-button" onClick={handlePurchase}>
            <span className="purchase-icon" />
            Purchase
          </button>
          {isPurchaseSuccess && (
            <p className="success-message">
              Your purchase has been completed.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default App;
