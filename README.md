![Gloom logo](https://github.com/michaelsmueller/gloom-interface/blob/main/public/gloom-logo-large.png?raw=true)

# Gloom (core)

_Transactions outside the light of day_

## Overview

Gloom lets you conduct a private auction of ERC-20 tokens. The process is as follows:

1. **Setup**: seller configures the type and amount of tokens, makes an ETH deposit into the auction contract, invites bidders (Ethereum addresses) and sets a bidder ETH deposit requirement.
2. **Commit**: bidders deposit into the auction contract and present their bids (in ETH) for the tokens. Bids are hidden (salted and hashed) and recorded on the blockchain.
3. **Reveal**: bidders reveal their bids (only if they match the earlier commits), with the winner determined and an escrow contract deployed.
4. **Deliver**: seller and winning bidder deliver tokens and payment, respectively, to the escrow contract.
5. **Withdraw**: seller and winning bidder withdraw proceeds and tokens, respectively, from the escrow contract. Everyone withdraws their deposits from the auction contract.

## Requirements

You will need the following to install and launch Gloom Core (my version noted):

- Node (recommended v14.15.1)
- Yarn (recommended v1.22.10)
- Ganache CLI (v6.12.1)
- Truffle (v5.1.58)

## Installation

Clone this repository and the [Gloom Interface](https://github.com/michaelsmueller/gloom-interface) repository into the same parent directory.

### Gloom Core installation

In the Gloom Core directory, configure a `.env` file with your mnemonic and Infura project id.

Install package dependencies:

```
yarn install
```

To run on localhost, launch Ganache CLI on network / chain id 1337 (it should default to port 8545):

```
ganache-cli --networkId 1337 --chainId 1337
```

I'd recommend launching Ganache with the same mnemonic every time (add `-m "put your mnemonic words here"`) so you can track your test ETH, test tokens, etc.

Migrate the contracts to the Ganache local blockchain:

```
truffle migrate --reset
```

The contract ABIs build into the `gloom-interface/src/contracts` directory.

Please see the [Gloom Interface](https://github.com/michaelsmueller/gloom-interface) repository for instructions on installing and launching the interface.

## Auction MIKE tokens on localhost (Ganache)

If you are running Ganache CLI blockchain locally, the migration in Gloom Core will mint 1 million **MIKE** ERC-20 tokens into the deployer address (first Ganache address, `accounts[0]`). Gloom Interface will read the contract address of this locally deployed token, and you may test auction them. To see them in your MetaMask wallet you will need to add them manually there:

1. Copy the MikeToken contract address that appears in the console after executing `truffle migrate --reset`
2. In MetaMask select Add Token (at bottom of Assets), Cutom Token, and paste the contract address, add the symbol MIKE and specify 18 decimals.
3. You should now see the 1 million MIKE token balance in your account. You will need to repeat the same procedure for other accounts (e.g. if you auction the tokens to another address) to see them there as well.

## Auction tokens on testnet (Kovan)

The contracts have been deployed to the **Kovan** testnet (see `deployed_addresses.txt`). See the [Gloom Interface](https://github.com/michaelsmueller/gloom-interface) for info on acquiring Kovan testnet ERC-20 tokens and interacting with the frontend.

## Testing

To run the tests, run:

```
truffle test
```
