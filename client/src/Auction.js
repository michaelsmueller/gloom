/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useWeb3Context } from 'web3-react';
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
    console.log('instantiate');

    const web3 = context.library;
    console.log('web3', web3);
    console.log(Object.keys(web3));
    console.log(web3.eth);

    const { networkId } = context;
    console.log('networkId', networkId);
    const deployedNetwork = SimpleStorageContract.networks[networkId];
    console.log('Address in Auction', deployedNetwork.address);
    const instance = new web3.eth.Contract(SimpleStorageContract.abi, deployedNetwork && deployedNetwork.address);
    console.log('instance', instance);
    setContract(instance);
  };

  const runExample = async () => {
    console.log('run example');
    await contract.methods.set(13).send({ from: context.account });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    setStorageValue(response);
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
