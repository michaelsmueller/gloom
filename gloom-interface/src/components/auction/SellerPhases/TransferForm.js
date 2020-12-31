import React from 'react';
import { useForm } from 'react-hook-form';
import { Fieldset, FieldsetTitle, Label, Input } from 'styles/formStyles';
import { Button } from 'styles/buttonStyles';

export default function TransferForm({ amount, onSubmit }) {
  const { handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset>
        <FieldsetTitle>Asset to transfer</FieldsetTitle>
        <Label htmlFor='amount'>
          <div>Amount (tokens):</div>
          <Input type='number' value={amount} id='amount' name='amount' readOnly />
        </Label>
      </Fieldset>
      <Button type='submit'>Approve & transfer</Button>
    </form>
  );
}
