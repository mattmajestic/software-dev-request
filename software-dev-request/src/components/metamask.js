import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import '../App.css';

const MetaMaskConnect = () => {
  const [metaMaskAddress, setMetaMaskAddress] = useState(null);

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setMetaMaskAddress(accounts[0]);
      } catch (error) {
        console.log('Error connecting to MetaMask:', error);
      }
    } else {
      console.log('MetaMask extension not detected');
    }
  };

  return (
    <div>
      {metaMaskAddress ? (
        <p>Connected Account: {metaMaskAddress}</p>
      ) : (
        <button className="connect-button" onClick={connectToMetaMask}>
          <FontAwesomeIcon icon={faEthereum} className="github-icon" />
          Connect to MetaMask
        </button>
      )}
    </div>
  );
};

export default MetaMaskConnect;
