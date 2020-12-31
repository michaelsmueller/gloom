/* eslint-disable no-console */
import React from 'react';
import { useForm } from 'react-hook-form';
import { Fieldset, FieldsetTitle, Label } from '../styles/formStyles';
import Button from '../styles/buttonStyles';

export default function SellerDeposit({ onSubmit }) {
  const { register, handleSubmit, errors } = useForm();
  console.log('SellerDeposit form errors', errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset>
        <FieldsetTitle>Seller deposit</FieldsetTitle>
        <Label htmlFor='amount'>
          Amount (ETH):
          <input type='number' step='0.001' min='0' id='seller-deposit' name='sellerDeposit' ref={register} />
        </Label>
      </Fieldset>
      <Button type='submit'>Fund deposit</Button>
    </form>
  );
}
