import React from 'react';
import NavBar from 'styles/navStyles';

export default function SellerNav({ showing, setShowing, isWinner }) {
  const handleClick = e => setShowing(e.target.value);
  const highlighted = { fontWeight: 600, borderBottom: '2px solid var(--primary)' };
  const buttonStyle = value => (showing === value ? highlighted : null);
  const summaryButtonStyle = buttonStyle('SUMMARY');
  const tokenButtonStyle = buttonStyle('TOKEN');
  const depositButtonStyle = buttonStyle('SELLER_DEPOSIT');
  const biddersButtonStyle = buttonStyle('BIDDER_INVITES');
  const transferButtonStyle = buttonStyle('TRANSFER');
  const withdrawButtonStyle = buttonStyle('WITHDRAW');
  return (
    <NavBar>
      <button type='button' style={summaryButtonStyle} onClick={handleClick} value='SUMMARY'>
        Summary
      </button>
      <button type='button' style={tokenButtonStyle} onClick={handleClick} value='TOKEN'>
        Token
      </button>
      <button type='button' style={depositButtonStyle} onClick={handleClick} value='SELLER_DEPOSIT'>
        Deposit
      </button>
      <button type='button' style={biddersButtonStyle} onClick={handleClick} value='BIDDER_INVITES'>
        Bidders
      </button>
      {isWinner && (
        <>
          <button type='button' style={transferButtonStyle} onClick={handleClick} value='TRANSFER'>
            Transfer
          </button>
          <button type='button' style={withdrawButtonStyle} onClick={handleClick} value='WITHDRAW'>
            Withdraw
          </button>
        </>
      )}
    </NavBar>
  );
}
