import React, { useContext } from 'react';
import { useContractAt, useEscrowAddress, useBidderDeposit, useAsset } from 'hooks';
import { LoadingContext } from 'contexts/loadingContext';
import Auction from 'contracts/Auction.json';
import Escrow from 'contracts/Escrow.json';
import { formatEther, formatUnits } from '@ethersproject/units';
import { DECIMALS } from 'data/constants';
import { BidderWithdrawForm } from 'components';
import { toast } from 'react-toastify';

export default function BidderWithdraw({ auctionAddress }) {
  const auctionContract = useContractAt(Auction, auctionAddress);
  const { escrowAddress } = useEscrowAddress(auctionContract);
  const escrowContract = useContractAt(Escrow, escrowAddress);
  const { bidderDeposit } = useBidderDeposit(auctionContract);
  const { tokenAmount, tokenContract } = useAsset(auctionContract);
  const { setIsLoading } = useContext(LoadingContext);

  const withdrawDeposit = async () => {
    try {
      await auctionContract.withdrawBidderDeposit();
      toast.info('Withdrawing deposit');
      auctionContract.once('error', error =>
        toast.error(`Error withdrawing deposit: ${error.data?.message || error.message}`),
      );
      auctionContract.once('LogBidderDepositWithdrawn', (bidder, deposit) =>
        toast.success(`${formatEther(deposit)} ETH withdrawal completed by ${bidder}`),
      );
    } catch (error) {
      toast.error(`Error: ${error.data?.message || error.message}`);
    }
  };

  const withdrawTokens = async () => {
    try {
      await escrowContract.buyerWithdraw();
      toast.info('Withdrawing tokens');
      escrowContract.once('error', error =>
        toast.error(`Error withdrawing tokens: ${error.data?.message || error.message}`),
      );
      escrowContract.once('LogBuyerWithdrew', (buyer, amount) =>
        toast.success(`${formatUnits(amount, DECIMALS)} token withdrawal completed by ${buyer}`),
      );
    } catch (error) {
      toast.error(`Error: ${error.data?.message || error.message}`);
    }
  };

  const withdraw = async () => {
    setIsLoading(true);
    await withdrawDeposit();
    await withdrawTokens();
    setIsLoading(false);
  };

  return (
    <BidderWithdrawForm
      bidderDeposit={bidderDeposit ? formatEther(bidderDeposit) : ''}
      tokenAmount={tokenAmount ? formatUnits(tokenAmount, DECIMALS) : ''}
      tokenContract={tokenContract}
      onSubmit={withdraw}
    />
  );
}
