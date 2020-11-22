/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useWeb3Context } from 'web3-react';
import { ethers } from 'ethers';
// import Auction from '../contracts/Auction.json';
import AuctionFactory from '../contracts/AuctionFactory.json';
import { AuctionSetup, SellerDeposit, BidderInvites } from '.';
import Button from '../styles/buttonStyles';
import { parseLocalDateTime, getLocalDateTime } from '../utils/dateTime';

export default function CreateAuction() {
  const context = useWeb3Context();
  const [factoryContract, setFactoryContract] = useState(null);
  const [auctionAddresses, setAuctionAddresses] = useState([]);
  // const [auctionContract, setAuctionContract] = useState(null);
  // const [seller, setSeller] = useState(null);

  useEffect(() => context.setFirstValidConnector(['MetaMask']), [context]);
  const { account, active, error, library, networkId } = context;
  if (!active && !error) return <div>loading</div>;
  if (error) return <div>error</div>;

  const { Contract, providers } = ethers;
  const provider = new providers.Web3Provider(library.provider);
  const signer = provider.getSigner();

  const instantiateFactory = () => {
    const { networks, abi } = AuctionFactory;
    const { address } = networks[networkId];
    const factoryInstance = new Contract(address, abi, signer);
    setFactoryContract(factoryInstance);
  };

  const getAuctions = async () => {
    const response = await factoryContract.getAddresses();
    setAuctionAddresses(response);
  };

  const createAuction = async ({ amount, token, startDate, endDate }) => {
    const tx = await factoryContract.createAuction(amount, token, startDate, endDate);
    const receipt = await tx.wait();
    console.log('tx', tx);
    console.log('receipt', receipt);
    factoryContract.on('AuctionCreated', event => {
      console.log('AuctionCreated event', event);
    });
    factoryContract.once(tx, transaction => {
      console.log('transaction mined', transaction);
      getAuctions();
    });
  };

  // const instantiateAuction = () => {
  //   const deployedNetwork = Auction.networks[networkId];
  //   const auctionInstance = new Contract(auctionAddresses[0], Auction.abi, signer);
  //   setAuctionContract(auctionInstance);
  // };

  // const getSeller = async () => {
  //   const response = await auctionContract.getSeller();
  //   console.log('response', response);
  //   setSeller(response);
  // };

  const setupAuction = ({ amount, token, startDate, endDate }) => {
    const data = {
      amount,
      token,
      startDate: parseLocalDateTime(startDate),
      endDate: parseLocalDateTime(endDate),
    };
    console.log('parsed data sent to createAuction', data);
    console.log('checking parsed startDate', getLocalDateTime(data.startDate));
    console.log('checking parsed endDate', getLocalDateTime(data.endDate));
    // console.log('difference between two dates', data.endDate - data.startDate);
    createAuction(data);
  };

  const fundDeposit = ({ sellerDeposit }) => {
    console.log('sellerDeposit', sellerDeposit);
  };

  const inviteBidders = ({ bidderDeposit, bidders }) => {
    console.log('bidderDeposit', bidderDeposit);
    console.log('bidders', bidders);
  };

  const { address } = factoryContract || '';
  return (
    <div>
      <h2>Network</h2>
      <ul>
        <li>networkId: {networkId}</li>
        <li>account: {account}</li>
      </ul>
      <h2>Auction Factory</h2>
      <Button type='button' onClick={instantiateFactory}>
        Instantiate factory
      </Button>
      <Button type='button' onClick={getAuctions}>
        Get auction addresses
      </Button>
      <pre>factory address: {address}</pre>
      <pre>
        Auction addresses:
        <br />
        {JSON.stringify(auctionAddresses, null, 2)}
      </pre>
      <br />
      <hr />

      <h2>Set up auction</h2>
      <AuctionSetup onSubmit={setupAuction} />
      <br />
      <hr />
      <h2>Fund deposit</h2>
      <SellerDeposit onSubmit={fundDeposit} />
      <br />
      <hr />
      <h2>Invite bidders</h2>
      <BidderInvites onSubmit={inviteBidders} />
    </div>
  );
}
