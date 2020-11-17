/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useWeb3Context } from 'web3-react';
import { Contract } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';
import SimpleStorageContract from './contracts/SimpleStorage.json';

export default function Auction() {
  const context = useWeb3Context();
  const [storageValue, setStorageValue] = useState(0);
  const [contract, setContract] = useState(null);
  useEffect(() => context.setFirstValidConnector(['MetaMask']), [context]);
  const { active, error, account } = context;

  if (!active && !error) return <div>loading</div>;
  if (error) return <div>error</div>;

  const instantiate = () => {
    const ethers = context.library;
    const { networkId } = context;
    const deployedNetwork = SimpleStorageContract.networks[networkId];
    const provider = new Web3Provider(ethers.provider);
    const signer = provider.getSigner();
    const instance = new Contract(deployedNetwork.address, SimpleStorageContract.abi, signer);
    console.log('instance', instance);
    setContract(instance);
  };

  const runExample = async () => {
    await contract.set(13);
    const response = await contract.get();
    setStorageValue(JSON.parse(response));
  };

  return (
    <div>
      <h1>Auction</h1>
      <p>account: {account}</p>
      storage {storageValue}
      <button type='button' onClick={instantiate}>
        instantiate contract
      </button>
      <button type='button' onClick={runExample}>
        run example
      </button>
    </div>
  );
}
