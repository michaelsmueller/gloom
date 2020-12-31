import React, { useContext } from 'react';
import { useContractAt, useEscrowAddress, useSellerDeposit, useWinner } from 'hooks';
import { LoadingContext } from 'contexts/loadingContext';
import Auction from 'contracts/Auction.json';
import Escrow from 'contracts/Escrow.json';
import { formatEther } from '@ethersproject/units';
import { SellerWithdrawForm } from 'components';
import { toast } from 'react-toastify';

export default function SellerWithdraw({ auctionAddress }) {
  const auctionContract = useContractAt(Auction, auctionAddress);
  const { escrowAddress } = useEscrowAddress(auctionContract);
  const escrowContract = useContractAt(Escrow, escrowAddress);
  const { sellerDeposit } = useSellerDeposit(auctionContract);
  const { winningBid } = useWinner(auctionContract);
  const { setIsLoading } = useContext(LoadingContext);

  const withdrawDeposit = async () => {
    try {
      await auctionContract.withdrawSellerDeposit();
      toast.info('Withdrawing deposit');
      auctionContract.once('error', error =>
        toast.error(`Error withdrawing deposit: ${error.data?.message || error.message}`),
      );
      auctionContract.once('LogSellerDepositWithdrawn', (seller, deposit) =>
        toast.success(`${formatEther(deposit)} ETH deposit withdrawal completed by ${seller}`),
      );
    } catch (error) {
      toast.error(`Error: ${error.data?.message || error.message}`);
    }
  };

  const withdrawBid = async () => {
    try {
      await escrowContract.sellerWithdraw();
      toast.info('Withdrawing payment');
      auctionContract.once('error', error =>
        toast.error(`Error withdrawing payment: ${error.data?.message || error.message}`),
      );
      escrowContract.once('LogSellerWithdrew', (seller, amount) =>
        toast.success(`${formatEther(amount)} ETH payment withdrawal completed by ${seller}`),
      );
    } catch (error) {
      toast.error(`Error: ${error.data?.message || error.message}`);
    }
  };

  const withdraw = async () => {
    setIsLoading(true);
    await withdrawDeposit();
    await withdrawBid();
    setIsLoading(false);
  };

  return (
    <SellerWithdrawForm
      sellerDeposit={sellerDeposit ? formatEther(sellerDeposit) : ''}
      winningBid={winningBid ? formatEther(winningBid) : ''}
      onSubmit={withdraw}
    />
  );
}
