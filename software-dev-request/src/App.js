import React, { useState } from 'react';
import Snowfall from 'react-snowfall';
import MetaMaskConnect from './components/metamask';
import GitHubInput from './components/github_input';
import PurchaseComponent from './components/purchase_button';
import './App.css';

const App = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [gitUrl, setGitUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isPurchaseSuccess, setPurchaseSuccess] = useState(false);

  const handlePurchaseSuccess = () => {
    setPurchaseSuccess(true);
  };

  return (
    <div className="App">
      <Snowfall
        snowflakeCount={100}
        snowflakeSize={[5, 10]}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
      <div className="form-container">
        <h1 className="app-title">Software Dev Request</h1>
        <form>
          <div className="services-container">
            <h2>Select Services:</h2>
            <label>
              <input
                type="checkbox"
                value="Code Review"
                checked={selectedServices.includes('Code Review')}
                onChange={() =>
                  setSelectedServices((prevServices) =>
                    prevServices.includes('Code Review')
                      ? prevServices.filter((service) => service !== 'Code Review')
                      : [...prevServices, 'Code Review']
                  )
                }
              />
              Code Review - $100
            </label>
            {/* Repeat similar code for other services */}
          </div>
          <GitHubInput setGitUrl={setGitUrl} setDescription={setDescription} />
          <MetaMaskConnect />
          <PurchaseComponent
            selectedServices={selectedServices}
            gitUrl={gitUrl}
            description={description}
            onSuccess={handlePurchaseSuccess}
          />
          {isPurchaseSuccess && (
            <p className="success-message">
              Your purchase has been completed successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default App;
