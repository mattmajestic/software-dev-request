import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [services, setServices] = useState([
    { name: 'Code Review', price: 100 },
    { name: 'Coding', price: 300 },
    { name: 'Pull Request', price: 500 },
  ]);

  const [selectedServices, setSelectedServices] = useState([]);
  const [gitUrl, setGitUrl] = useState('');
  const [error, setError] = useState(false);

  const handleServiceChange = (serviceName) => {
    setSelectedServices((prevServices) => {
      if (prevServices.includes(serviceName)) {
        return prevServices.filter((service) => service !== serviceName);
      }
      return [...prevServices, serviceName];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!gitUrl.trim()) {
      setError(true);
      return;
    } else {
      setError(false);
    }

    console.log('Selected Services:', selectedServices);
    console.log('Git URL:', gitUrl);
    // Add logic for payment processing here
  };

  const totalCost = selectedServices.reduce((total, serviceName) => {
    const service = services.find((s) => s.name === serviceName);
    return total + (service ? service.price : 0);
  }, 0);

  return (
    <div className="App">
      <div className="form-container">
        <h1 className="app-title">Code Review App</h1>
        <form onSubmit={handleSubmit}>
          <div className="services-container">
            <h2>Select Services:</h2>
            {services.map((service) => (
              <label key={service.name} className="service-label">
                <input
                  type="checkbox"
                  className="service-input"
                  value={service.name}
                  checked={selectedServices.includes(service.name)}
                  onChange={() => handleServiceChange(service.name)}
                />
                {service.name} - ${service.price}
              </label>
            ))}
          </div>
          <div>
            <h2>Git URL:</h2>
            <input
              type="text"
              className="git-input"
              value={gitUrl}
              onChange={(e) => setGitUrl(e.target.value)}
            />
          </div>
          <div className="total-cost">
            Total Cost: ${totalCost}
          </div>
          <button type="submit" className="purchase-button">
            Purchase
          </button>
          {error && (
            <div className="popup">
              <p className="error-message">Git URL is required</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default App;
