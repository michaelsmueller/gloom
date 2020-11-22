import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Web3Provider, { Connectors } from 'web3-react';
import GlobalStyle from './styles/globalStyles';
import { CreateAuction, Head } from './components';
// import SimpleStorage from './SimpleStorage';

export default function App() {
  const { InjectedConnector } = Connectors;
  const MetaMask = new InjectedConnector({ supportedNetworks: [1, 4, 13] });
  const connectors = { MetaMask };
  return (
    <Web3Provider connectors={connectors} libraryName='ethers.js'>
      <Router>
        <Head />
        <GlobalStyle />
        <Switch>
          <Route exact path='/create-auction' component={CreateAuction} />
          {/* <Route exact path='/simple-storage' component={SimpleStorage} /> */}
        </Switch>
      </Router>
    </Web3Provider>
  );
}
