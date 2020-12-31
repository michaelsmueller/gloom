import { useContext, useState, useEffect } from 'react';
import { Web3Context } from 'contexts/web3Context';

export default function useWinner(auctionContract) {
  const { web3Context } = useContext(Web3Context);
  const { active } = web3Context;
  const [winningBid, setWinningBid] = useState(0);
  const [winningBidder, setWinningBidder] = useState('');

  useEffect(() => {
    if (!active || !auctionContract) return;
    const getWinner = async () => {
      const [bidder, bid] = await auctionContract.getWinner();
      if (bidder !== '0x0000000000000000000000000000000000000000') {
        setWinningBidder(bidder);
        setWinningBid(bid);
      }
    };
    getWinner();
  }, [active, auctionContract]);

  return { winningBid, setWinningBid, winningBidder, setWinningBidder };
}
