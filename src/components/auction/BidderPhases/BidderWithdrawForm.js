import React from 'react';
import { useForm } from 'react-hook-form';
import { Fieldset, FieldsetTitle, Label, Input } from 'styles/formStyles';
import { Button } from 'styles/buttonStyles';

export default function BidderWithdrawForm({ bidderDeposit, tokenAmount, tokenContract, onSubmit }) {
  const { handleSubmit } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset>
        <FieldsetTitle>Bidder deposit</FieldsetTitle>
        <Label htmlFor='amount'>
          <div>Amount (ETH):</div>
          <Input type='number' value={bidderDeposit} id='bidder-deposit' name='bidderDeposit' readOnly />
        </Label>
      </Fieldset>
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
      <Button type='submit'>Withdraw deposit & tokens</Button>
    </form>
  );
}
