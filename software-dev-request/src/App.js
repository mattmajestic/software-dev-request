import React, { useState } from 'react';
import Snowfall from 'react-snowfall';
import MetaMaskConnect from './components/metamask';
import GitHubUser from './components/github_user';
import GitHubInput from './components/github_input';
import GitHubAuth from './components/github_auth';
import PurchaseComponent from './components/purchase_button';
import './App.css';

const App = () => {
  const servicesData = [
    { name: 'Code Review', price: 100 },
    { name: 'Coding', price: 300 },
    { name: 'Pull Request', price: 500 },
  ];

  const [selectedServices, setSelectedServices] = useState([]);
  const [gitUrl] = useState('');
  const [description, setDescription] = useState('');
  const [ setError] = useState(false);
  const [success, setSuccess] = useState(false);
  //const [accessToken, setAccessToken] = useState(process.env.REACT_APP_GITHUB_TOKEN);
  const [repoUrl, setRepoUrl] = useState('');

  const handleUrlSubmit = (url) => {
    setRepoUrl(url);
  };

  const handleServiceChange = (serviceName) => {
    setSelectedServices((prevServices) => {
      if (prevServices.includes(serviceName)) {
        return prevServices.filter((service) => service !== serviceName);
      }
      return [...prevServices, serviceName];
    });
  };

  const totalCost = selectedServices.reduce((total, serviceName) => {
    const service = servicesData.find((s) => s.name === serviceName);
    return total + (service ? service.price : 0);
  }, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!gitUrl.trim()) {
      setError(true);
      return;
    } else {
      setError(false);
      setSuccess(false); // Reset success message
    }
  
    try {
      const response = await fetch('https://software-dev-request-server.vercel.app/save-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedServices,
          gitUrl,
          description,
        }),
      });
  
      if (response.ok) {
        console.log('Data saved successfully');
        setSuccess(true); // Set success message
      } else {
        console.error('Failed to save data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  
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
          <div>
          <GitHubInput onUrlSubmit={handleUrlSubmit} />{repoUrl && <GitHubUser accessToken={process.env.REACT_APP_GITHUB_TOKEN} repoUrl={repoUrl} />}
          </div>
          <div>
            <h2>Description:</h2>
            <textarea
              className="description-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: '100%', height: '120px' }} // Adjust the width and height as needed
            />
          </div>
          <div className="total-cost">
            <h2>Total Cost:</h2>
            <p className="cost">${totalCost}</p>
          </div>
          <button type="submit" className="purchase-button">
            Purchase
          </button>
          <MetaMaskConnect />
          <PurchaseComponent selectedServices={selectedServices}gitUrl={gitUrl}description={description}/>
          <GitHubUser accessToken={process.env.REACT_APP_GITHUB_TOKEN} />
          {success && (
            <p className="success-message">
              <span className="highlight">Success!</span> You have purchased the following checkboxes for ${totalCost} dollars:
              {selectedServices.map((serviceName) => (
                <span key={serviceName}> {serviceName},</span>
              ))}
              <br />
              URL: {gitUrl}
              <br />
              Description: {description}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default App;
