import { useContext, useState, useEffect } from 'react';
import { Web3Context } from 'contexts/web3Context';

export default function useBidders(auctionContract) {
  const { web3Context } = useContext(Web3Context);
  const { active } = web3Context;
  const [bidders, setBidders] = useState([]);

  useEffect(() => {
    if (!active || !auctionContract) return;
    const getBidders = async () => {
      const bidderAddresses = await auctionContract.getBidders();
      setBidders(bidderAddresses);
    };
    getBidders();
  }, [active, auctionContract]);

  return { bidders };
}
