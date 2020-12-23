import { useContext, useState, useEffect } from 'react';
import { Web3Context } from 'contexts/web3Context';

export default function useBidderDeposit(auctionContract) {
  const { web3Context } = useContext(Web3Context);
  const { active } = web3Context;
  const [bidderDeposit, setBidderDeposit] = useState('');

  useEffect(() => {
    if (!active || !auctionContract) return;
    const getBidderDeposit = async () => {
      const deposit = await auctionContract.getBidderDeposit();
      setBidderDeposit(deposit);
    };
    getBidderDeposit();
  }, [active, auctionContract]);

  return { bidderDeposit };
}
