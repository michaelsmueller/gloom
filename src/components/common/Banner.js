import React, { useContext } from 'react';
import { Web3Context } from 'contexts/web3Context';
import { useHistory } from 'react-router-dom';
import { Container, Content, Logo, Account, Network } from 'styles/bannerStyles';
import { ConnectButton } from 'styles/buttonStyles';

const networks = {
  1: 'Ethereum Mainnet',
  3: 'Ropsten Test Network',
  4: 'Rinkeby Test Network',
  5: 'Goerli Test Network',
  42: 'Kovan Test Network',
};

const getNetwork = chainId => {
  if (chainId in networks) return networks[chainId];
  return 'Custom Network';
};

export default function Banner() {
  const { web3Context } = useContext(Web3Context);
  const { account, chainId } = web3Context;
  const history = useHistory();
  const reload = () => history.go(0);
  return (
    <Container>
      <Content>
        <a href='/'>
          <Logo src='gloom-logo.png' alt='Gloom logo' />
        </a>
        <div>
          {chainId && (
            <Network>
              {getNetwork(chainId)} (chain ID {chainId})
            </Network>
          )}
          <Account>{account || <ConnectButton onClick={() => reload()}>connect account</ConnectButton>}</Account>
        </div>
      </Content>
    </Container>
  );
}
