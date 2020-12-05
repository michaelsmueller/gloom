import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';
import GlobalStyle from 'styles/globalStyles';
import Web3ContextProvider from 'contexts/web3Context';
import { getLibrary } from 'utils/web3Library';
import { Head, Home, AuctionSetup, AuctionDetails, SellerDeposit, BidderInvites } from 'components';

export default function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ContextProvider>
        <Router>
          <Head />
          <GlobalStyle />
          {/* <Network /> */}
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/auctions/new' component={AuctionSetup} />
            <Route exact path='/auctions/:id' component={AuctionDetails} />
            <Route exact path='/auctions/:id/seller-deposit' component={SellerDeposit} />
            <Route exact path='/auctions/:id/bidder-invites' component={BidderInvites} />
          </Switch>
        </Router>
      </Web3ContextProvider>
    </Web3ReactProvider>
  );
}
