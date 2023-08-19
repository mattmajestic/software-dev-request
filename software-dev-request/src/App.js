import React, { useState } from 'react';
import Snowfall from 'react-snowfall';
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
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleServiceChange = (serviceName) => {
    setSelectedServices((prevServices) => {
      if (prevServices.includes(serviceName)) {
        return prevServices.filter((service) => service !== serviceName);
      }
      return [...prevServices, serviceName];
    });
  };

  const handleGitUrlChange = (url) => {
    setGitUrl(url);
    setError(false);
    setSuccess(false); // Clear success message when Git URL changes
  };

  const totalCost = selectedServices.reduce((total, serviceName) => {
    const service = servicesData.find((s) => s.name === serviceName);
    return total + (service ? service.price : 0);
  }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!gitUrl.trim()) {
      setError(true);
      return;
    } else {
      setError(false);
      setSuccess(true); // Set success message
    }

    const dataToStore = {
      gitUrl: gitUrl,
      selectedServices: selectedServices,
      description: description,
    };

    console.log('Data to store:', dataToStore);
    // You can send dataToStore to a server, save it to a file, or use any desired storage mechanism

    // Add logic for payment processing here
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
            <h2>Git URL:</h2>
            <input
              type="text"
              className="git-input"
              value={gitUrl}
              onChange={(e) => handleGitUrlChange(e.target.value)}
            />
            {error && (
              <p className="error-message">Git URL is required</p>
            )}
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
