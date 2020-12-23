import React, { createContext, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
// import { NetworkConnector } from '@web3-react/network-connector';

export const Web3Context = createContext();

export default function Web3ContextProvider({ children }) {
  const web3Context = useWeb3React();
  const { activate } = web3Context;
  useEffect(() => {
    const injectedConnector = new InjectedConnector({ supportedChainIds: [42, 1337] });
    // const network = new NetworkConnector({
    //   urls: { 42: 'https://kovan.infura.io/v3/658ac54d0a4e41ddb61fbcaf9ab2c666' },
    // });
    activate(injectedConnector);
    // activate(network);
  }, [activate]);
  return <Web3Context.Provider value={{ web3Context }}>{children}</Web3Context.Provider>;
}
