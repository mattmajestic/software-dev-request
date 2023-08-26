import React, { useState } from 'react';
import Snowfall from 'react-snowfall';
import MetaMaskConnect from './components/metamask';
import GitHubInput from './components/github_input';
import PurchaseComponent from './components/purchase_button';
import './App.css';

const App = () => {
  const servicesData = [
    { name: 'Code Review', price: 100 },
    { name: 'Coding', price: 300 },
    { name: 'Pull Request', price: 500 },
  ];

  const [selectedServices, setSelectedServices] = useState([]);
  const [success, setSuccess] = useState(false);

  const toggleService = (serviceName) => {
    setSelectedServices((prevServices) =>
      prevServices.includes(serviceName)
        ? prevServices.filter((service) => service !== serviceName)
        : [...prevServices, serviceName]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  const handlePurchaseSuccess = () => {
    setSuccess(true);
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
        <form onSubmit={handleSubmit}>
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
          <GitHubInput />
          {/* Description input */}
          <PurchaseComponent
            selectedServices={selectedServices}
            onSuccess={handlePurchaseSuccess}
          />
          {success && (
            <p className="success-message">
              {/* Success message */}
            </p>
          )}
          <div className="total-cost">
            <h2>Total Cost:</h2>
            <p className="cost">${totalCost}</p>
          </div>
          <MetaMaskConnect />
        </form>
      </div>
    </div>
  );
};

export default App;
