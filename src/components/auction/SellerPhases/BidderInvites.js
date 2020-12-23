import React, { useContext } from 'react';
import { useContractAt } from 'hooks';
import { LoadingContext } from 'contexts/loadingContext';
import Auction from 'contracts/Auction.json';
import { parseEther } from '@ethersproject/units';
import { BidderInvitesForm } from 'components';
import { toast } from 'react-toastify';

export default function BidderInvites({ auctionAddress }) {
  const auctionContract = useContractAt(Auction, auctionAddress);
  const { setIsLoading } = useContext(LoadingContext);

  const inviteBidders = async ({ bidderDeposit, bidders }) => {
    setIsLoading(true);
    try {
      const bidderAddresses = bidders.map(bidder => bidder.account);
      await auctionContract.setupBidders(parseEther(bidderDeposit), bidderAddresses);
      toast.info('Inviting bidders');
      auctionContract.once('error', error =>
        toast.error(`Error inviting bidders: ${error.data?.message || error.message}`),
      );
      auctionContract.on('LogBidderInvited', bidder => toast.success(`Bidder ${bidder} invited`));
    } catch (error) {
      toast.error(`Error: ${error.data?.message || error.message}`);
    }
    setIsLoading(false);
  };

  return <BidderInvitesForm onSubmit={inviteBidders} />;
}
