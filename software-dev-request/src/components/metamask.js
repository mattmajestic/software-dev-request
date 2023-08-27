import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import '../App.css';

const MetaMaskConnect = () => {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
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
