import React, { useContext } from 'react';
import { useDeployedContract } from 'hooks';
import { LoadingContext } from 'contexts/loadingContext';
import AuctionFactory from 'contracts/AuctionFactory.json';
import Auction from 'contracts/Auction.json';
import { parseUnits } from '@ethersproject/units';
import { DECIMALS } from 'data/constants';
import { TokenForm } from 'components';
import { toast } from 'react-toastify';

export default function SellerSummary() {
  const factoryContract = useDeployedContract(AuctionFactory);
  const logicContract = useDeployedContract(Auction);
  const { setIsLoading } = useContext(LoadingContext);

  const createAuction = async ({ amount, token }) => {
    setIsLoading(true);
    try {
      await factoryContract.createAuction(logicContract.address, parseUnits(amount, DECIMALS), token);
      toast.info('Submitted transaction to create auction ');
      factoryContract.once('error', error =>
        toast.error(`Error creating auction: ${error.data?.message || error.message}`),
      );
      factoryContract.once('LogAuctionCreated', (auction, seller) =>
        toast.success(`Auction ${auction} created by ${seller}`),
      );
    } catch (error) {
      toast.error(`Error: ${error.data?.message || error.message}`);
    }
    setIsLoading(false);
  };

  const setupAuction = ({ amount, token }) => createAuction({ amount, token });

  return <TokenForm onSubmit={setupAuction} />;
}
