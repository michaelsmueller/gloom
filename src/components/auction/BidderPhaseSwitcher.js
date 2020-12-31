import React, { useContext, useEffect, useState } from 'react';
import { useContractAt, useBidderDeposit, useWinner } from 'hooks';
import { Web3Context } from 'contexts/web3Context';
import Auction from 'contracts/Auction.json';
import { BidderNav, StartPhases, BidderSummary, CommitBid, RevealBid, Pay, BidderWithdraw } from 'components';
import { toast } from 'react-toastify';

export default function BidderPhaseSwitcher({ auctionAddress }) {
  const { web3Context } = useContext(Web3Context);
  const { account, active } = web3Context;
  const auctionContract = useContractAt(Auction, auctionAddress);
  const { bidderDeposit } = useBidderDeposit(auctionContract);
  const { winningBidder, setWinningBidder } = useWinner(auctionContract);
  const [showing, setShowing] = useState('SUMMARY');

  useEffect(() => {
    if (!active || !auctionContract) return null;
    auctionContract.once('LogSetWinner', bidder => {
      if (account === bidder) toast.success(`Congratulations, you won the auction`);
      else toast.dark(`Sorry, you lost the auction`);
      setWinningBidder(bidder);
    });
    return () => auctionContract.removeAllListeners('LogSetWinner');
  });

  return (
    <div>
      <h2>Bid</h2>
      <BidderNav showing={showing} setShowing={setShowing} isWinner={winningBidder === account} />
      <StartPhases auctionAddress={auctionAddress} isBidder rerender={winningBidder} />
      {showing === 'SUMMARY' && <BidderSummary auctionAddress={auctionAddress} rerender={winningBidder} />}
      {showing === 'COMMIT_BID' && <CommitBid auctionAddress={auctionAddress} bidderDeposit={bidderDeposit} />}
      {showing === 'REVEAL_BID' && <RevealBid auctionAddress={auctionAddress} />}
      {showing === 'PAY' && <Pay auctionAddress={auctionAddress} />}
      {showing === 'WITHDRAW' && <BidderWithdraw auctionAddress={auctionAddress} />}
    </div>
  );
}
