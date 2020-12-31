import React from 'react';
import { Fieldset, FieldsetTitle, Label, Input } from 'styles/formStyles';

export default function SellerSummaryForm({ data }) {
  const { tokenAmount, tokenContract, sellerDeposit, winningBid, winningBidder, bidderDeposit, bidders } = data;
  return (
    <form>
      <Fieldset>
        <FieldsetTitle>Auctioned asset</FieldsetTitle>
        <Label htmlFor='amount'>
          <div>Amount (tokens):</div>
          <Input type='number' value={tokenAmount} id='amount' name='amount' readOnly />
        </Label>
        <Label htmlFor='tokenAddress'>
          <div>Contract address:</div>
          <Input type='text' value={tokenContract} id='token-address' name='tokenAddress' readOnly />
        </Label>
      </Fieldset>
      <Fieldset>
        <FieldsetTitle>Seller deposit</FieldsetTitle>
        <Label htmlFor='sellerDeposit'>
          <div>Amount (ETH):</div>
          <Input type='number' value={sellerDeposit} id='seller-deposit' name='sellerDeposit' readOnly />
        </Label>
      </Fieldset>
      <Fieldset>
        <FieldsetTitle>Winning bid</FieldsetTitle>
        <Label htmlFor='winningBid'>
          <div>Amount (ETH):</div>
          <Input type='number' value={winningBid} id='winning-bid' name='winningBid' readOnly />
        </Label>
        <Label htmlFor='tokenAddress'>
          <div>Winning bidder:</div>
          <Input type='text' value={winningBidder} id='winning-bidder' name='winningBidder' readOnly />
        </Label>
      </Fieldset>
      <Fieldset>
        <FieldsetTitle>Bidder deposit</FieldsetTitle>
        <Label htmlFor='bidderDeposit'>
          <div>Amount (ETH):</div>
          <Input type='number' value={bidderDeposit} id='bidder-deposit' name='bidderDeposit' readOnly />
        </Label>
      </Fieldset>
      <Fieldset>
        <FieldsetTitle>Invited bidders</FieldsetTitle>
        {bidders.map(bidder => {
          return (
            <div name='bidder' key={bidder}>
              <Label htmlFor='account'>
                <div>Address:</div>
                <Input type='text' value={bidder} id='bidder' name='bidder' readOnly />
              </Label>
            </div>
          );
        })}
      </Fieldset>
    </form>
  );
}
