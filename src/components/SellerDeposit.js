/* eslint-disable no-console */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Contract } from '@ethersproject/contracts';
import { parseEther } from '@ethersproject/units';
import { Web3Context } from '../contexts/web3Context';
import Auction from '../contracts/Auction.json';
import { SellerDepositForm } from '.';
import Button from '../styles/buttonStyles';
import { getSigner } from '../utils/web3Library';

export default function SellerDeposit() {
  const history = useHistory();
  const { id: auctionAddress } = useParams();
  const { web3Context } = useContext(Web3Context);
  const { account, active, error, library } = web3Context;
  const [auctionContract, setAuctionContract] = useState(null);

  useEffect(() => {
    if (!active) return;
    const signer = getSigner(library);
    const auctionInstance = new Contract(auctionAddress, Auction.abi, signer);
    setAuctionContract(auctionInstance);
  }, [active, library, auctionAddress]);

  if (!active && !error) return <div>loading</div>;
  if (error) return <div>error</div>;

  const fundDeposit = async ({ sellerDeposit }) => {
    const overrides = { from: account, value: parseEther(sellerDeposit) };
    auctionContract.receiveSellerDeposit(overrides);
  };

  const goToBidders = () => history.push(`/auctions/${auctionAddress}/bidder-invites`);

  return (
    <div>
      <h1>Fund deposit</h1>
      <SellerDepositForm onSubmit={fundDeposit} />
      <Button type='button' onClick={goToBidders}>
        Invite bidders
      </Button>
    </div>
  );
}
