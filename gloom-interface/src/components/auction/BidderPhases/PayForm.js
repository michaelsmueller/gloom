import React from 'react';
import { useForm } from 'react-hook-form';
import { Fieldset, FieldsetTitle, Label, Input } from 'styles/formStyles';
import { Button } from 'styles/buttonStyles';

export default function PayForm({ winningBid, onSubmit }) {
  const { handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset>
        <FieldsetTitle>Winning Bid</FieldsetTitle>
        <Label htmlFor='winning-bid'>
          <div>Amount (ETH):</div>
          <Input type='number' value={winningBid} id='winning-bid' name='winningBid' readOnly />
        </Label>
      </Fieldset>
      <Button type='submit'>Pay</Button>
    </form>
  );
}
