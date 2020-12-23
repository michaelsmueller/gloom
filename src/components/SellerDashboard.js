import React, { useContext, useEffect, useState } from 'react';
import { useDeployedContract } from 'hooks';
import { Web3Context } from 'contexts/web3Context';
import AuctionFactory from 'contracts/AuctionFactory.json';
import { BackButton, SellerPhaseSwitcher } from 'components';
import Container from 'styles/dashboardStyles';

export default function SellerDashboard() {
  const { web3Context } = useContext(Web3Context);
  const { active, error } = web3Context;
  const factoryContract = useDeployedContract(AuctionFactory);
  const [auctionAddress, setAuctionAddress] = useState('');

  useEffect(() => {
    if (!active || !factoryContract) return;
    const getAuction = async () => {
      const auction = await factoryContract.getAuctionBy();
      if (auction !== '0x0000000000000000000000000000000000000000') setAuctionAddress(auction);
    };
    getAuction();
  }, [active, factoryContract]);

  useEffect(() => {
    if (!active || !factoryContract) return null;
    factoryContract.on('LogAuctionCreated', auction => {
      setAuctionAddress(auction);
    });
    return () => factoryContract.removeAllListeners('LogAuctionCreated');
  });

  if (!active && !error) return <div>loading</div>;
  if (error) return <div>Error {error.message}</div>;

  return (
    <Container>
      <BackButton />
      <h1>Seller dashboard</h1>
      <SellerPhaseSwitcher auctionAddress={auctionAddress} />
    </Container>
  );
}
