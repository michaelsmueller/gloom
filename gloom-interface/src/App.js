import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyle from 'styles/globalStyles';
import AppRoute from 'AppRoute';
import { Head, Home, SellerDashboard, BidderDashboard, NotFound } from 'components';
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <Router>
      <Head />
      <GlobalStyle />
      <Switch>
        <Route exact path='/' component={Home} />
        <AppRoute exact path='/seller' component={SellerDashboard} />
        <AppRoute exact path='/bidder' component={BidderDashboard} />
        <AppRoute path='*' component={NotFound} />
      </Switch>
      <ToastContainer />
    </Router>
  );
}
