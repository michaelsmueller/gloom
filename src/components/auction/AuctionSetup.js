/* eslint-disable no-console */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuctionFactory from 'contracts/AuctionFactory.json';
import { Contract } from '@ethersproject/contracts';
import { Web3Context } from 'contexts/web3Context';
import { getSigner } from 'utils/web3Library';
import { parseLocalDateTime, getLocalDateTime } from 'utils/dateTime';
import { BackButton, AuctionSetupForm } from 'components';
import Button from 'styles/buttonStyles';

export default function AuctionSetup() {
  const history = useHistory();
  const { web3Context } = useContext(Web3Context);
  const { active, error, library, chainId } = web3Context;
  const [factoryContract, setFactoryContract] = useState(null);
  const [auctionAddresses, setAuctionAddresses] = useState([]);

  useEffect(() => {
    if (!active) return;
    const signer = getSigner(library);
    const { address } = AuctionFactory.networks[chainId];
    const factoryInstance = new Contract(address, AuctionFactory.abi, signer);
    setFactoryContract(factoryInstance);
  }, [active, library, chainId]);

  if (!active && !error) return <div>loading</div>;
  if (error) return <div>Error {error.message}</div>;

  const getAuctions = async () => {
    const response = await factoryContract.getAddresses();
    setAuctionAddresses(response);
  };

  const createAuction = async ({ amount, token, startDate, endDate }) => {
    const tx = await factoryContract.createAuction(amount, token, startDate, endDate);
    const receipt = await tx.wait();
    console.log('tx', tx);
    console.log('receipt', receipt);
    factoryContract.on('AuctionCreated', event => console.log('AuctionCreated event', event));
    factoryContract.once(tx, transaction => {
      console.log('transaction mined', transaction);
      getAuctions();
    });
  };

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

  const goToSellerDeposit = () => history.push(`/auctions/${auctionAddresses[0]}/seller-deposit`);

  const { address } = factoryContract || '';
  return (
    <div>
      {/* <h2>Auction factory</h2>
      <Button type='button' onClick={getAuctions}>
        Get auction addresses
      </Button> */}
      <pre>factory address: {address}</pre>
      <pre>
        Auction addresses:
        <br />
        {JSON.stringify(auctionAddresses, null, 2)}
      </pre>
      <br />
      <hr />

      <BackButton />
      <h1>Set up auction</h1>
      <AuctionSetupForm onSubmit={setupAuction} />
      {auctionAddresses.length ? (
        <Button type='button' onClick={goToSellerDeposit}>
          Make deposit
        </Button>
      ) : null}
    </div>
  );
}
