/* eslint-disable no-console */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Fieldset, FieldsetTitle, Label } from 'styles/formStyles';
import Button from 'styles/buttonStyles';

export default function BidderInvites({ onSubmit }) {
  const [indexes, setIndexes] = useState([]);
  const [counter, setCounter] = useState(0);
  const { register, handleSubmit, errors } = useForm();
  console.log('BidderInvites form errors', errors);

  const addBidder = () => {
    setIndexes(prevIndexes => [...prevIndexes, counter]);
    setCounter(prevCounter => prevCounter + 1);
  };

  const removeBidder = index => () => {
    setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
    setCounter(prevCounter => prevCounter - 1);
  };

  const clearBidders = () => {
    setIndexes([]);
    setCounter(0);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset>
        <FieldsetTitle>Bidder deposit</FieldsetTitle>
        <Label htmlFor='bidder-deposit'>
          Amount (ETH):
          <input type='number' step='0.001' min='0' id='bidder-deposit' name='bidderDeposit' ref={register} />
        </Label>
      </Fieldset>

      <Fieldset>
        <FieldsetTitle>Bidders</FieldsetTitle>
        {indexes.map(index => {
          const fieldName = `bidders[${index}]`;
          const last = indexes.length - 1;
          return (
            <div name={fieldName} key={fieldName}>
              <Label htmlFor='account'>
                <span>{index + 1}.&nbsp;</span>
                Account:
                <input type='text' id='account' name={`${fieldName}.account`} ref={register} />
                {index === last && (
                  <button type='button' onClick={removeBidder(index)}>
                    <i className='material-icons-round'>delete</i>
                  </button>
                )}
              </Label>
            </div>
          );
        })}
        <Button type='button' onClick={addBidder}>
          Add bidder
        </Button>
        <Button type='button' onClick={clearBidders}>
          Clear bidders
        </Button>
      </Fieldset>

      <Button type='submit'>Invite bidders</Button>
    </form>
  );
}
