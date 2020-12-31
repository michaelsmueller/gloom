/* eslint-disable no-console */
import React, { useContext } from 'react';
import { Web3Context } from '../contexts/web3Context';

export default function Network() {
  const { web3Context } = useContext(Web3Context);
  const { account, active, error, chainId } = web3Context;

  if (!active && !error) return <div>loading</div>;
  if (error) return <div>Error {error.message}</div>;

  return (
    <div>
      <h1>Network</h1>
      <ul>
        <li>chainId: {chainId}</li>
        <li>account: {account}</li>
      </ul>
    </div>
  );
}
