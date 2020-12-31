import React from 'react';
import { useForm } from 'react-hook-form';
import { Fieldset, FieldsetTitle, Label, Input } from 'styles/formStyles';
import { Button } from 'styles/buttonStyles';

export default function SellerWithdrawForm({ sellerDeposit, winningBid, onSubmit }) {
  const { handleSubmit } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset>
        <FieldsetTitle>Seller deposit</FieldsetTitle>
        <Label htmlFor='amount'>
          <div>Amount (ETH):</div>
          <Input type='number' value={sellerDeposit} id='seller-deposit' name='sellerDeposit' readOnly />
        </Label>
      </Fieldset>
      <Fieldset>
        <FieldsetTitle>Winning bid</FieldsetTitle>
        <Label htmlFor='bid'>
          <div>Amount (ETH):</div>
          <Input type='number' value={winningBid} id='winning-bid' name='winningBid' readOnly />
        </Label>
      </Fieldset>
      <Button type='submit'>Withdraw deposit & bid</Button>
    </form>
  );
}
