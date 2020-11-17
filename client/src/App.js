import React from 'react';
import Web3Provider, { Connectors } from 'web3-react';
import Auction from './Auction';

export default function App() {
  const { InjectedConnector } = Connectors;
  const MetaMask = new InjectedConnector({ supportedNetworks: [1, 4, 13] });
  const connectors = { MetaMask };
  return (
    <Web3Provider connectors={connectors} libraryName='ethers.js'>
      <Auction />
    </Web3Provider>
  );
}
