import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import '../App.css';

const MetaMaskConnect = ({ setConnectedAccount }) => {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const connectedAccount = accounts[0]; // Get the connected account
        setAccount(connectedAccount);
        setConnectedAccount(connectedAccount); // Pass the connected account to the parent component
      } catch (error) {
        setError('Error connecting to MetaMask');
      }
    } else {
      setError('MetaMask not found');
    }
  };

  return (
    <div>
      {account ? (
        <p>Connected Account: {account}</p>
      ) : (
        <div>
          <button className="connect-button" onClick={connectToMetaMask}>
            <FontAwesomeIcon icon={faEthereum} className="github-icon" />
            Connect to MetaMask
          </button>
          {error && <p>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default MetaMaskConnect;
