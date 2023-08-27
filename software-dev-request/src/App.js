import React, { useState } from 'react';
import Snowfall from 'react-snowfall';
import MetaMaskConnect from './components/metamask';
import PurchaseComponent from './components/purchase_button';
import './App.css';

const App = () => {
  const servicesData = [
    { name: 'Code Review', price: 100 },
    { name: 'Coding', price: 300 },
    { name: 'Pull Request', price: 500 },
  ];

  const [selectedServices, setSelectedServices] = useState([]);
  const [gitUrl, setGitUrl] = useState(''); // State for gitUrl
  const [description, setDescription] = useState(''); // State for description
  const [success, setSuccess] = useState(false);

  const handleServiceChange = (serviceName) => {
    setSelectedServices((prevServices) =>
      prevServices.includes(serviceName)
        ? prevServices.filter((service) => service !== serviceName)
        : [...prevServices, serviceName]
    );
  };

  const handleSubmit = async (e) => {
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
                  onChange={() => handleServiceChange(service.name)}
                />
                {service.name} - ${service.price}
              </label>
            ))}
          </div>
          <input
            type="text"
            className="git-input"
            placeholder="Enter Git URL"
            value={gitUrl}
            onChange={(e) => setGitUrl(e.target.value)}
          />
          <textarea
            className="description-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            style={{ width: '100%', height: '120px' }}
          />
          <PurchaseComponent
            selectedServices={selectedServices}
            gitUrl={gitUrl}
            description={description}
            totalCost={totalCost}
            onSuccess={handlePurchaseSuccess}
          />
          {success && (
            <p className="success-message">
              Your request has been sent successfully!
            </p>
          )}
          <MetaMaskConnect />
        </form>
      </div>
    </div>
  );
};

export default App;
