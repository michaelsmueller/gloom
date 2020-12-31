import { useContext, useState, useEffect } from 'react';
import { Web3Context } from 'contexts/web3Context';

export default function useAsset(auctionContract) {
  const { web3Context } = useContext(Web3Context);
  const { active } = web3Context;
  const [tokenAmount, setTokenAmount] = useState(0);
  const [tokenContract, setTokenContract] = useState('');

  useEffect(() => {
    if (!active || !auctionContract) return;
    const getAsset = async () => {
      const assetDetails = await auctionContract.getAsset();
      if (assetDetails.length) {
        setTokenAmount(assetDetails[0]);
        setTokenContract(assetDetails[1].toString());
      }
    };
    getAsset();
  }, [active, auctionContract]);

  return { tokenAmount, tokenContract };
}
