import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Fieldset, FieldsetTitle, Label, Input } from 'styles/formStyles';
import { Button } from 'styles/buttonStyles';
import { getPasswordStrength } from 'utils/validate';

export default function CommitBidForm({ bidderDeposit, onSubmit }) {
  const { register, handleSubmit, watch, errors } = useForm();
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordShown, setPasswordShown] = useState(false);
  const password = useRef({});
  password.current = watch('password', '');

  const handlePasswordChange = ({ target }) => setPasswordStrength(getPasswordStrength(target.value));
  const togglePasswordVisiblity = () => setPasswordShown(!passwordShown);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset>
        <FieldsetTitle>Bidder deposit</FieldsetTitle>
        <Label htmlFor='bidder-deposit'>
          <div>Amount (ETH):</div>
          <Input type='number' value={bidderDeposit} id='bidder-deposit' name='bidderDeposit' readOnly />
        </Label>
      </Fieldset>

      <Fieldset>
        <FieldsetTitle>Bid</FieldsetTitle>
        <Label htmlFor='bid'>
          <div>Amount (ETH):</div>
          <Input
            type='number'
            step='1'
            min='0'
            id='bid'
            name='bid'
            ref={register({ required: 'You must specify a bid' })}
          />
          {errors.bid && <p>{errors.bid.message}</p>}
        </Label>
      </Fieldset>

      <Fieldset>
        <FieldsetTitle>Password</FieldsetTitle>
        <Label htmlFor='password'>
          <div>Password:</div>
          <Input
            type={passwordShown ? 'text' : 'password'}
            id='password'
            name='password'
            onChange={handlePasswordChange}
            ref={register({
              required: 'You must specify a password',
              validate: value => getPasswordStrength(value) > 2 || 'Password is too weak',
            })}
          />
          <i
            role='button'
            onClick={togglePasswordVisiblity}
            onKeyDown={e => {
              if (e.key !== 'Tab') togglePasswordVisiblity();
            }}
            tabIndex={0}
            className='material-icons-round'
          >
            visibility
          </i>
          <pre>strength: {passwordStrength}</pre>
          {errors.password && <p>{errors.password.message}</p>}
        </Label>
        <Label htmlFor='password-repeat'>
          <div>Repeat password:</div>
          <Input
            type='password'
            id='password-repeat'
            name='passwordRepeat'
            ref={register({ validate: value => value === password.current || 'Passwords do not match' })}
          />
          {errors.passwordRepeat && <p>{errors.passwordRepeat.message}</p>}
        </Label>
      </Fieldset>
      <Button type='submit'>Commit bid</Button>
    </form>
  );
}
