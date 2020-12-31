import { useContext, useState, useEffect } from 'react';
import { Web3Context } from 'contexts/web3Context';

export default function useSellerDeposit(auctionContract) {
  const { web3Context } = useContext(Web3Context);
  const { active } = web3Context;
  const [sellerDeposit, setSellerDeposit] = useState('');

  useEffect(() => {
    if (!active || !auctionContract) return;
    const getSellerDeposit = async () => {
      const deposit = await auctionContract.getSellerDeposit();
      setSellerDeposit(deposit);
    };
    getSellerDeposit();
  }, [active, auctionContract]);

  return { sellerDeposit };
}
