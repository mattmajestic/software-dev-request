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
  const [account, setAccount] = useState(null); // Connected wallet address from MetaMask
  const [gitUrl, setGitUrl] = useState(''); // GitHub repository URL
  const [description, setDescription] = useState(''); // Description entered by the user

  const handleServiceToggle = (serviceName) => {
    setSelectedServices((prevServices) =>
      prevServices.includes(serviceName)
        ? prevServices.filter((service) => service !== serviceName)
        : [...prevServices, serviceName]
    );
  };

  const handlePurchaseSuccess = () => {
    // Reset form data after successful purchase
    setSelectedServices([]);
    setGitUrl('');
    setDescription('');
  };

  return (
    <div className="App">
      <Snowfall
        snowflakeCount={100}
        snowflakeSize={[5, 10]}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      />
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
                  onChange={() => handleServiceToggle(service.name)}
                />
                {service.name} - ${service.price}
              </label>
            ))}
          </div>
          <GitHubInput onChangeGitUrl={setGitUrl} />
          <div>
            <h2>Description:</h2>
            <textarea
              className="description-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: '100%', height: '120px' }}
            />
          </div>
          <div className="total-cost">
            <h2>Total Cost:</h2>
            <p className="cost">${selectedServices.reduce((total, serviceName) => {
              const service = servicesData.find((s) => s.name === serviceName);
              return total + (service ? service.price : 0);
            }, 0)}</p>
          </div>
          <PurchaseComponent
            selectedServices={selectedServices}
            account={account}
            gitUrl={gitUrl}
            description={description}
            onSuccess={handlePurchaseSuccess}
          />
          <MetaMaskConnect onAccountChange={setAccount} />
        </form>
      </div>
    </div>
  );
};

export default App;
