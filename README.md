![Gloom logo](https://github.com/michaelsmueller/gloom-interface/blob/main/public/gloom-logo-large.png?raw=true)

# Gloom

_Transactions outside the light of day_

## Overview

Gloom lets you conduct a private auction of ERC-20 tokens. The process is as follows:

1. **Setup**: seller configures the type and amount of tokens, makes an ETH deposit into the auction contract, invites bidders (Ethereum addresses) and sets a bidder ETH deposit requirement.
2. **Commit**: bidders deposit into the auction contract and present their bids (in ETH) for the tokens. Bids are hidden (salted and hashed) and recorded on the blockchain.
3. **Reveal**: bidders reveal their bids (only if they match the earlier commits), with the winner determined and an escrow contract deployed.
4. **Deliver**: seller and winning bidder deliver tokens and payment, respectively, to the escrow contract.
5. **Withdraw**: seller and winning bidder withdraw proceeds and tokens, respectively, from the escrow contract. Everyone withdraws their deposits from the auction contract.

## Video demo

[Video demo walkthrough](https://vimeo.com/493971676)

## Requirements

You will need the following (my version noted):

- Node (recommended v14.15.1)
- Yarn (recommended v1.22.10)
- Ganache CLI (v6.12.1)
- Truffle (v5.1.58)
- [MetaMask](https://metamask.io/) wallet (browser extension)

## Installation

Clone this mono repo, which contains both the Gloom Core (Solidity smart contracts) and Gloom Interface (React app) projects. If you are running a local blockchain instance (Ganache CLI) you will need to install Gloom Core before launching Gloom Interface. If you want to run the interface off the Kovan testnet, skip to Gloom Interface installation.

### Gloom Core installation

In the Gloom Core directory, create a `.env` file (check `.env-example` as an example) and save your mnemonic and Infura project id.

```
cd gloom-core
touch .env
```

Install package dependencies:

```
yarn install
```

To run on localhost, launch Ganache CLI on network / chain id 1337 (it should default to port 8545):

```
ganache-cli --networkId 1337 --chainId 1337
```

I recommend launching Ganache with the same mnemonic every time (add `-m "put your mnemonic words here"`) so you can track your test ETH, test tokens, etc.

Migrate the contracts to the Ganache blockchain running locally (on `http://127.0.0.1:8545`):

```
truffle migrate --reset
```

The contract ABIs build into the `../gloom-interface/src/contracts` directory.

### Gloom Interface installation

In the Gloom Interface directory, install package dependencies:

```
cd gloom-interface
yarn install
```

To launch on localhost, run:

```
yarn start
```

Unless you have configured a different port, the React app should launch on `http://localhost:3000/`

## Get testnet tokens

To use Gloom, you will need to get some tokens to auction, either MIKE tokens (local blockchain) or testnet tokens (Kovan blockchain):

### Auction MIKE tokens on localhost (Ganache)

If you are running the Ganache blockchain locally, the migration in Gloom Core will mint 1 million **MIKE** ERC-20 tokens into the deployer address (first Ganache address, `accounts[0]`). Gloom Interface will read the contract address of this locally deployed token, and you may test auction them. To see them in your MetaMask wallet you will need to add them manually there:

1. Copy the MikeToken contract address that appears in the console after executing `truffle migrate --reset`
2. In MetaMask select Add Token (at bottom of Assets), Cutom Token, and paste the contract address, add the symbol MIKE and specify 18 decimals.
3. You should now see the 1 million MIKE token balance in your account. You will need to repeat the same procedure for other accounts (e.g. if you auction the tokens to another address) to see them there as well.

### Auction tokens on testnet (Kovan)

The contracts have been deployed to the **Kovan** testnet (see `deployed_addresses.txt`). The contract ABIs in the `src/contracts` directory should allow you to interact on Kovan.

For KETH (Kovan testnet ETH), please check:

- [Kovan testnet faucet](https://gitter.im/kovan-testnet/faucet#) - request testnet ETH for Kovan
- [MyCrypto faucet](https://app.mycrypto.com/faucet) - get testnet ETH for various networks

For Kovan testnet ERC-20 tokens, please check:

- [Uniswap Interface](https://app.uniswap.org/) - swap KETH into Kovan DAI, MKR, UNI or WETH
- [Chainlink faucet](https://kovan.chain.link/) - get 100 Kovan LINK
- [AAVE v2 faucet](https://testnet.aave.com/faucet) - mint various tokens here

To see your testnet ERC-20 tokens in MetaMask, you will need to add them as Custom Tokens using the Kovan token contract addresses:

- UNI `0x1f9840a85d5af5bf1d1762f925bdaddc4201f984`
- LINK `0xa36085F69e2889c224210F603D836748e7dC0088`
- SNX `0x7fdb81b0b8a010dd4ffc57c3fecbf145ba8bd947`
- YFI `0xb7c325266ec274feb1354021d27fa3e3379d840d`

## Using Gloom

Now that you have some tokens, go to the [app homepage](http://localhost:3000/) and conduct an auction:

- From the homa, click Auction tokens
- Click TOKEN from the menu, enter the number and type of token and Set up auction.
- Click DEPOSIT, enter an amount and Fund deposit
- Click BIDDERS, enter a bidder deposit, Add bidder addresses and Invite bidders
- Click Commit to move to the commit phase.

Using others accounts that have been invited as bidders:

- From the home, click Bid on auction
- Click COMMIT BID, enter a Bid amount and password and Commit bid. Repeat for other bidders.

As seller:

- Click Reveal to move to Reveal phase

As bidders:

- Click REVEAL BID, enter the original Bid amount and password and Reveal bid. Repeat for other bidders.

As seller:

- Click Deliver to move to Deliver phase. The winner should be revealed.
- Click the TRANSFER tab and Approve & transfer (2 transactions, allow and transferFrom)

As winning bidder:

- Click Pay tab and Pay.

As seller:

- Click Withdraw to move to Withdraw phase.
- Click WITHDRAW tab and Withdraw deposit & bid (2 transactions, recover deposit and proceeds). Funds are yours!

As winning bidder:

- Click WITHDRAW tab and Withdraw deposit & tokens (2 transactions, recover deposit and transfer tokens). Tokens are yours! (Check wallet)

## Smart contract tests

To run the smart contract tests, from the Gloom Core directory run:

```
cd gloom-core
truffle test
```
