import { useContext, useState, useEffect } from 'react';
import { Contract } from '@ethersproject/contracts';
import { Web3Context } from 'contexts/web3Context';
import { getSigner } from 'utils/web3Library';

export default function useContractAt(contract) {
  const { web3Context } = useContext(Web3Context);
  const { active, library, chainId } = web3Context;
  const [instance, setInstance] = useState(null);
  const address = contract.networks[chainId]?.address;

  useEffect(() => {
    if (!active || !contract) return;
    const signer = getSigner(library);
    const newInstance = new Contract(address, contract.abi, signer);
    setInstance(newInstance);
  }, [contract, active, address, library, chainId]);

  return instance;
}
