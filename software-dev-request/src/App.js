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

  const [selectedServices] = useState([]);
  const [gitUrl, setGitUrl] = useState(''); // Track gitUrl
  const [description, setDescription] = useState(''); // Track description
  const [success, setSuccess] = useState(false);

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
        <form>
          {/* ... Select Services input */}
          
          <GitHubInput onUrlSubmit={setGitUrl} />{/* Update gitUrl */}
          
          {/* Description input */}
          <textarea
            className="description-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: '100%', height: '120px' }} // Adjust the width and height as needed
          />
          
          {success && (
            <p className="success-message">Your request was sent.</p>
          )}
          <div className="total-cost">
            <h2>Total Cost:</h2>
            <p className="cost">${totalCost}</p>
          </div>
          <PurchaseComponent
            selectedServices={selectedServices}
            totalCost={totalCost}
            gitUrl={gitUrl} // Pass gitUrl
            description={description} // Pass description
            onSuccess={handlePurchaseSuccess}
          />
          <MetaMaskConnect />
        </form>
      </div>
    </div>
  );
};

export default App;
