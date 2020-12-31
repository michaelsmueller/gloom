import React from 'react';
import { useForm } from 'react-hook-form';
import { Fieldset, FieldsetTitle, Label, Input } from 'styles/formStyles';
import { Button } from 'styles/buttonStyles';

export default function SellerDeposit({ onSubmit }) {
  const { register, handleSubmit, errors } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset>
        <FieldsetTitle>Seller deposit</FieldsetTitle>
        <Label htmlFor='amount'>
          <div>Amount (ETH):</div>
          <Input
            type='number'
            step='1'
            min='0'
            id='seller-deposit'
            name='sellerDeposit'
            ref={register({ required: 'You must specify an amount' })}
          />
          {errors.sellerDeposit && <p>{errors.sellerDeposit.message}</p>}
        </Label>
      </Fieldset>
      <Button type='submit'>Fund deposit</Button>
    </form>
  );
}
