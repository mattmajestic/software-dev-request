import React, { useState } from 'react';
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
  const [gitUrl, setGitUrl] = useState('');
  const [description, setDescription] = useState('');
  const [connectedAccount, setConnectedAccount] = useState(null); // State for the connected MetaMask account

  const toggleService = (serviceName) => {
    setSelectedServices((prevServices) =>
      prevServices.includes(serviceName)
        ? prevServices.filter((service) => service !== serviceName)
        : [...prevServices, serviceName]
    );
  };

  return (
    <div className="App">
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
          {/* Render your total cost component here */}
          <PurchaseComponent
            selectedServices={selectedServices}
            gitUrl={gitUrl}
            description={description}
          />
          {connectedAccount && (
          <p>Connected Account: {connectedAccount}</p>
          )}
          <MetaMaskConnect setConnectedAccount={setConnectedAccount} />
        </form>
      </div>
    </div>
  );
};

export default App;
