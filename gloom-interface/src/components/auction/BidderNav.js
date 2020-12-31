import React from 'react';
import NavBar from 'styles/navStyles';

export default function BidderNav({ showing, setShowing, isWinner }) {
  const handleClick = e => setShowing(e.target.value);
  const highlighted = { fontWeight: 600, borderBottom: '2px solid var(--primary)' };
  const buttonStyle = value => (showing === value ? highlighted : null);
  const summaryButtonStyle = buttonStyle('SUMMARY');
  const revealButtonStyle = buttonStyle('REVEAL_BID');
  const commitButtonStyle = buttonStyle('COMMIT_BID');
  const payButtonStyle = buttonStyle('PAY');
  const withdrawButtonStyle = buttonStyle('WITHDRAW');
  return (
    <NavBar>
      <button type='button' style={summaryButtonStyle} onClick={handleClick} value='SUMMARY'>
        Summary
      </button>
      <button type='button' style={commitButtonStyle} onClick={handleClick} value='COMMIT_BID'>
        Commit bid
      </button>
      <button type='button' style={revealButtonStyle} onClick={handleClick} value='REVEAL_BID'>
        Reveal bid
      </button>
      {isWinner && (
        <>
          <button type='button' style={payButtonStyle} onClick={handleClick} value='PAY'>
            Pay
          </button>
          <button type='button' style={withdrawButtonStyle} onClick={handleClick} value='WITHDRAW'>
            Withdraw
          </button>
        </>
      )}
    </NavBar>
  );
}
