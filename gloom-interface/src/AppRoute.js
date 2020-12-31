import React from 'react';
import { Route } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';
import Web3ContextProvider from 'contexts/web3Context';
import { getLibrary } from 'utils/web3Library';
import { Banner } from 'components';
import LoadingContextProvider from 'contexts/loadingContext';

export default function AppRoute({ exact, path, component: Component }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ContextProvider>
        <LoadingContextProvider>
          <Route
            exact={exact}
            path={path}
            component={() => (
              <>
                <Banner />
                <Component />
              </>
            )}
          />
        </LoadingContextProvider>
      </Web3ContextProvider>
    </Web3ReactProvider>
  );
}
