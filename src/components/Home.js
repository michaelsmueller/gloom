/* eslint-disable no-console */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuctionFactory from 'contracts/AuctionFactory.json';
import { Contract } from '@ethersproject/contracts';
import { Web3Context } from 'contexts/web3Context';
import { getSigner } from 'utils/web3Library';
import Button from 'styles/buttonStyles';

export default function Home() {
  const history = useHistory();
  const { web3Context } = useContext(Web3Context);
  const { active, error, library, chainId } = web3Context;
  const [factoryContract, setFactoryContract] = useState(null);
  const [auctionAddress, setAuctionAddress] = useState('');

  useEffect(() => {
    console.log('useEffect 1');
    if (!active) return;
    console.log('active');
    const signer = getSigner(library);
    const { address } = AuctionFactory.networks[chainId];
    const factoryInstance = new Contract(address, AuctionFactory.abi, signer);
    setFactoryContract(factoryInstance);
  }, [active, library, chainId]);

  useEffect(() => {
    console.log('useEffect 2');
    if (!active || !factoryContract) return;
    console.log('active');
    const getAuction = async () => {
      console.log('getAuction');
      const auction = await factoryContract.getAuctionBy();
      if (auction !== '0x0000000000000000000000000000000000000000') setAuctionAddress(auction);
    };
    getAuction();
  }, [active, auctionAddress, factoryContract]);

  if (!active && !error) return <div>loading</div>;
  if (error) return <div>Error {error.message}</div>;

  const goToAuctionSetup = () => history.push('/auctions/new');
  const goToAuctionDetails = () => history.push(`/auctions/${auctionAddress}`);

  return (
    <div>
      <h1>Gloom</h1>
      {!auctionAddress ? (
        <Button type='button' onClick={goToAuctionSetup}>
          New auction
        </Button>
      ) : null}
      {auctionAddress ? (
        <Button type='button' onClick={goToAuctionDetails}>
          View auction
        </Button>
      ) : null}
    </div>
  );
}
