import { useContext, useState, useEffect } from 'react';
import { Web3Context } from 'contexts/web3Context';

export default function useEscrowAddress(auctionContract) {
  const { web3Context } = useContext(Web3Context);
  const { active } = web3Context;
  const [escrowAddress, setEscrowAddress] = useState('');

  useEffect(() => {
    if (!active || !auctionContract) return;
    const getEscrow = async () => {
      const escrow = await auctionContract.getEscrow();
      setEscrowAddress(escrow);
    };
    getEscrow();
  }, [active, auctionContract]);

  return { escrowAddress };
}
