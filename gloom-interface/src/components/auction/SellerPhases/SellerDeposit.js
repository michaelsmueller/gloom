import React, { useContext } from 'react';
import { useContractAt } from 'hooks';
import { Web3Context } from 'contexts/web3Context';
import { LoadingContext } from 'contexts/loadingContext';
import Auction from 'contracts/Auction.json';
import { formatEther, parseEther } from '@ethersproject/units';
import { SellerDepositForm } from 'components';
import { toast } from 'react-toastify';

export default function SellerDeposit({ auctionAddress }) {
  const { web3Context } = useContext(Web3Context);
  const { account } = web3Context;
  const auctionContract = useContractAt(Auction, auctionAddress);
  const { setIsLoading } = useContext(LoadingContext);

  const fundDeposit = async ({ sellerDeposit }) => {
    setIsLoading(true);
    try {
      await auctionContract.receiveSellerDeposit({ from: account, value: parseEther(sellerDeposit) });
      toast.info('Sending deposit');
      auctionContract.once('error', error =>
        toast.error(`Error sending deposit: ${error.data?.message || error.message}`),
      );
      auctionContract.once('LogSellerDepositReceived', (seller, deposit) =>
        toast.success(`${formatEther(deposit)} ETH deposit completed by ${seller}`),
      );
    } catch (error) {
      toast.error(`Error: ${error.data?.message || error.message}`);
    }
    setIsLoading(false);
  };

  return <SellerDepositForm onSubmit={fundDeposit} />;
}
