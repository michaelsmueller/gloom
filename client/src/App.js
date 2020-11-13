import React from 'react';
import Web3Provider, { Connectors } from 'web3-react';
import Web3 from 'web3';
import MyComponent from './MyComponent';

// import SimpleStorageContract from './contracts/SimpleStorage.json';
// import './App.css';

export default function App() {
  const { InjectedConnector } = Connectors;
  const MetaMask = new InjectedConnector({ supportedNetworks: [1, 4, 13] });
  const connectors = { MetaMask };
  return (
    <Web3Provider connectors={connectors} libraryName='web3.js' web3Api={Web3}>
      <MyComponent />
    </Web3Provider>
  );
}
