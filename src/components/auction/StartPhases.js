import React, { useContext, useEffect } from 'react';
import { useContractAt, usePhase } from 'hooks';
import { LoadingContext } from 'contexts/loadingContext';
import Auction from 'contracts/Auction.json';
import { Button } from 'styles/buttonStyles';
import { toast } from 'react-toastify';

// eslint-disable-next-line no-unused-vars
export default function StartPhases({ auctionAddress, isBidder = false, rerender }) {
  const auctionContract = useContractAt(Auction, auctionAddress);
  const { phase, setPhase } = usePhase(auctionContract);
  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (!auctionContract) return null;
    auctionContract.once('LogPhaseChangeTo', newPhase => {
      toast.success(`Phase is now ${newPhase}`);
      setPhase(newPhase);
    });
    return () => auctionContract.removeAllListeners('LogPhaseChangeTo');
  });

  const changePhase = async callback => {
    setIsLoading(true);
    try {
      await callback();
      toast.info('Changing phase');
      auctionContract.once('error', error =>
        toast.error(`Error changing phase: ${error.data?.message || error.message}`),
      );
      auctionContract.once('LogPhaseChangeTo', newPhase => {
        toast.success(`Phase is now ${newPhase}`);
        setPhase(newPhase);
      });
    } catch (error) {
      toast.error(`Error: ${error.data?.message || error.message}`);
    }
    setIsLoading(false);
  };

  const startCommit = () => {
    if (auctionContract && !isBidder) changePhase(auctionContract.startCommit);
  };

  const startReveal = () => {
    if (auctionContract && !isBidder) changePhase(auctionContract.startReveal);
  };

  const startDeliver = () => {
    if (auctionContract && !isBidder) changePhase(auctionContract.startDeliver);
  };

  const startWithdraw = () => {
    if (auctionContract && !isBidder) changePhase(auctionContract.startWithdraw);
  };

  return (
    <div>
      <Button active={phase === 'Setup' || !phase} inactive={isBidder} type='button'>
        Setup
      </Button>
      <Button type='button' active={phase === 'Commit'} inactive={isBidder} onClick={startCommit}>
        Commit
      </Button>
      <Button type='button' active={phase === 'Reveal'} inactive={isBidder} onClick={startReveal}>
        Reveal
      </Button>
      <Button type='button' active={phase === 'Deliver'} inactive={isBidder} onClick={startDeliver}>
        Deliver
      </Button>
      <Button type='button' active={phase === 'Withdraw'} inactive={isBidder} onClick={startWithdraw}>
        Withdraw
      </Button>
    </div>
  );
}
