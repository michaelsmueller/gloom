/* eslint-disable no-console */

// import { Contract } from '@ethersproject/contracts';
// import { ContractFactory } from '@ethersproject/contracts';
// import { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';

import React, { useEffect, useState } from 'react';
import { useWeb3Context } from 'web3-react';
import SimpleStorageContract from './contracts/SimpleStorage.json'; // ABI

export default function SimpleStorage() {
  const context = useWeb3Context();
  const [storageValue, setStorageValue] = useState(0);
  const [contract, setContract] = useState(null);
  useEffect(() => {
    context.setFirstValidConnector(['MetaMask']);
    // const enableEthereum = async () => {
    //   await window.ethereum.request({ method: 'eth_requestAccounts' });
    // };
    // enableEthereum();
  }, [context]);
  const { account, active, error, library, networkId } = context;

  if (!active && !error) return <div>loading</div>;
  if (error) return <div>error</div>;

  const { Contract, providers } = ethers;

  const instantiate = () => {
    console.log('instantiate');
    const { networks, abi } = SimpleStorageContract;
    const { address } = networks[networkId];
    const provider = new providers.Web3Provider(library.provider);
    console.log('provider', provider);
    const signer = provider.getSigner();
    const instance = new Contract(address, abi, signer);
    setContract(instance);
  };

  // const instance = new ContractFactory(SimpleStorageContract.abi, SimpleStorageContract.bytecode, signer);
  // const newContract = await instance.deploy();
  // console.log('newContract', newContract);
  // await newContract.deployTransaction.wait();

  // console.log('address', address);
  // console.log('provider', provider);
  // console.log('signer', signer);
  // console.log('instance', instance);

  const runExample = async () => {
    const gas = await contract.estimateGas.set(42);
    console.log('gas estimate', gas.toString());
    const tx = await contract.set(42);
    const receipt = await tx.wait();
    console.log('receipt', receipt);
    const response = await contract.get();
    console.log('SimpleStorage.get response', parseInt(response, 10));
    setStorageValue(parseInt(response, 10)); // or JSON.parse()
  };

  return (
    <div>
      <h1>Simple Storage</h1>
      <ul>
        <li>networkId: {networkId}</li>
        <li>account: {account}</li>
        <li>storageValue: {storageValue}</li>
      </ul>
      <button type='button' onClick={instantiate}>
        instantiate contract
      </button>
      <button type='button' onClick={runExample}>
        run example
      </button>
      <h2>Library</h2>
      <pre>{JSON.stringify(library, null, 2)}</pre>
      {/* <h2>Ethers.js</h2> */}
      {/* <pre>{JSON.stringify(ethers, null, 2)}</pre> */}
    </div>
  );
}
