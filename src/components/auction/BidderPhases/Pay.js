import React, { useContext } from 'react';
import { useContractAt, useEscrowAddress, useWinner } from 'hooks';
import { Web3Context } from 'contexts/web3Context';
import { LoadingContext } from 'contexts/loadingContext';
import Auction from 'contracts/Auction.json';
import Escrow from 'contracts/Escrow.json';
import { formatEther } from '@ethersproject/units';
import { PayForm } from 'components';
import { toast } from 'react-toastify';

export default function Pay({ auctionAddress }) {
  const { web3Context } = useContext(Web3Context);
  const { account } = web3Context;
  const auctionContract = useContractAt(Auction, auctionAddress);
  const { escrowAddress } = useEscrowAddress(auctionContract);
  const escrowContract = useContractAt(Escrow, escrowAddress);
  const { winningBid } = useWinner(auctionContract);
  const { setIsLoading } = useContext(LoadingContext);

  const pay = async () => {
    setIsLoading(true);
    try {
      await escrowContract.buyerPayment({ from: account, value: winningBid });
      toast.info('Sending payment');
      escrowContract.once('error', error =>
        toast.error(`Error making payment: ${error.data?.message || error.message}`),
      );
      escrowContract.once('LogBuyerPaid', (buyer, amount) =>
        toast.success(`${formatEther(amount)} ETH payment completed by ${buyer}`),
      );
    } catch (error) {
      toast.error(`Error: ${error.data?.message || error.message}`);
    }
    setIsLoading(false);
  };

  return <PayForm winningBid={winningBid ? formatEther(winningBid) : ''} onSubmit={pay} />;
}
