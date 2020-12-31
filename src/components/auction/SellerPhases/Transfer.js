import React, { useContext, useEffect, useState } from 'react';
import { useContractAt, useEscrowAddress } from 'hooks';
import { Web3Context } from 'contexts/web3Context';
import { LoadingContext } from 'contexts/loadingContext';
import Auction from 'contracts/Auction.json';
import Escrow from 'contracts/Escrow.json';
import IERC20 from 'contracts/IERC20.json';
import { formatUnits } from '@ethersproject/units';
import { TransferForm } from 'components';
import { toast } from 'react-toastify';

export default function Transfer({ auctionAddress }) {
  const { web3Context } = useContext(Web3Context);
  const { active } = web3Context;
  const auctionContract = useContractAt(Auction, auctionAddress);
  const { escrowAddress } = useEscrowAddress(auctionContract);
  const escrowContract = useContractAt(Escrow, escrowAddress);

  const [amount, setAmount] = useState(null);
  const [tokenAddress, setTokenAddress] = useState('');
  const tokenContract = useContractAt(IERC20, tokenAddress);
  const { setIsLoading } = useContext(LoadingContext);

  // TO DO FIGURE OUT WHY THIS REQUIRES RERENDER

  useEffect(() => {
    if (!active || !escrowContract) return;
    const getAmount = async () => {
      const tokenAmount = await escrowContract.getTokenAmount();
      setAmount(tokenAmount);
    };
    getAmount();
  }, [active, escrowContract]);

  useEffect(() => {
    if (!active || !escrowContract) return;
    const getTokenAddress = async () => {
      const address = await escrowContract.getTokenContractAddress();
      setTokenAddress(address);
    };
    getTokenAddress();
  }, [active, escrowContract]);

  const transfer = async () => {
    setIsLoading(true);
    try {
      await tokenContract.approve(escrowAddress, amount);
      toast.info('Approving transfer');
      await escrowContract.sellerDelivery();
      toast.info('Executing transfer');
      escrowContract.once('LogSellerDelivered', (seller, tokenAmount) =>
        toast.success(`${formatUnits(tokenAmount)} token transfer completed by ${seller}`),
      );
    } catch (error) {
      toast.error(`Error: ${error.data?.message || error.message}`);
    }
    setIsLoading(false);
  };

  return <TransferForm amount={amount ? formatUnits(amount) : ''} onSubmit={transfer} />;
}
