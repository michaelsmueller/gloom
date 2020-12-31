/* eslint-disable no-console */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Auction from 'contracts/Auction.json';
import { Contract } from '@ethersproject/contracts';
import { formatUnits, parseEther } from '@ethersproject/units';
import { Web3Context } from 'contexts/web3Context';
import { getSigner } from 'utils/web3Library';
import { BackButton, SellerDepositForm } from 'components';
import Button from 'styles/buttonStyles';

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
    await auctionContract.receiveSellerDeposit(overrides);
    auctionContract.on('ReceiveSellerDeposit', (seller, deposit) => {
      console.log('ReceiveSellerDeposit event, seller', seller);
      console.log('ReceiveSellerDeposit event, sellerDeposit', formatUnits(deposit));
    });
  };

  const goToBidders = () => history.push(`/auctions/${auctionAddress}/bidder-invites`);

  return (
    <div>
      <BackButton />
      <h1>Fund deposit</h1>
      <SellerDepositForm onSubmit={fundDeposit} />
      <Button type='button' onClick={goToBidders}>
        Invite bidders
      </Button>
    </div>
  );
}
