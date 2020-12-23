import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Logo, Headline, SellingProposition, Buttons } from 'styles/homeStyles';
import { Button } from 'styles/buttonStyles';

export default function Home() {
  const history = useHistory();
  return (
    <Container>
      <header>
        <a href='/'>
          <Logo src='gloom-logo-large.png' alt='Gloom logo' />
        </a>
      </header>
      <Headline>Transactions outside the light of day</Headline>
      <SellingProposition>
        You backed the protocol and own a ton of tokens. You want to cash out but without hurting the project. Gloom
        lets you conduct a private, invite-only auction from the security of the blockchain. Exit gracefully, earn what
        you deserve.
      </SellingProposition>
      <Buttons>
        <Button type='button' large onClick={() => history.push('/seller')}>
          Auction tokens
        </Button>
        <Button type='button' large onClick={() => history.push('/bidder')}>
          Bid on auction
        </Button>
      </Buttons>
    </Container>
  );
}
