import { useContext, useState, useEffect } from 'react';
import { Web3Context } from 'contexts/web3Context';

export default function usePhase(auctionContract) {
  const { web3Context } = useContext(Web3Context);
  const { active } = web3Context;
  const [phase, setPhase] = useState('');

  useEffect(() => {
    if (!active || !auctionContract) return;
    const getPhase = async () => {
      const currentPhase = await auctionContract.getPhase();
      setPhase(currentPhase);
    };
    getPhase();
  }, [active, auctionContract]);

  return { phase, setPhase };
}
