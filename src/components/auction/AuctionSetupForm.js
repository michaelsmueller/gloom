/* eslint-disable no-console */
import React from 'react';
import { useForm } from 'react-hook-form';
import { Fieldset, FieldsetTitle, Label } from 'styles/formStyles';
import Button from 'styles/buttonStyles';
import tokenList from 'data/tokenList.json';

export default function AuctionSetupForm({ onSubmit }) {
  const { register, handleSubmit, errors } = useForm();
  console.log('tokenList', tokenList);
  console.log('AuctionSetup form errors', errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset>
        <FieldsetTitle>Asset to auction</FieldsetTitle>
        <Label htmlFor='amount'>
          Amount (tokens):
          <input type='number' step='0.001' min='0' id='amount' name='amount' ref={register} />
        </Label>
        <Label htmlFor='token'>
          ERC-20 token:
          <select id='token' name='token' ref={register}>
            {tokenList.map(token => (
              <option key={token.symbol} value={token.address}>
                {token.symbol}
              </option>
            ))}
          </select>
        </Label>
      </Fieldset>

      <Fieldset>
        <FieldsetTitle>Auction period</FieldsetTitle>
        <Label htmlFor='start-date'>
          Start date & time:
          <input type='datetime-local' id='start-date' name='startDate' ref={register} />
        </Label>
        <label htmlFor='end-date'>
          End date & time:
          <input type='datetime-local' id='end-date' name='endDate' ref={register} />
        </label>
      </Fieldset>

      <Button type='submit'>Set up auction</Button>
    </form>
  );
}
