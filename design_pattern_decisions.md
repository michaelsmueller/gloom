# Design Pattern decisions

Some smart contract design patterns used in Gloom are as follows:

## Restricting access

Access to all variables and functions has been restricted to the maximum extent possible. All functions and variables are declared private and internal unless additional access is needed.

## Circuit breaker

AuctionFactory includes a circuit breaker pattern implemented with OpenZeppelin's Pausable contract to stop the ability to deploy new Auction instances.

## State machine

The Auction contract tracks the auction state through the phase enum (Setup, Commit, Reveal, Deliver, Withdraw) with functions that are limited by modifiers as to when they may be executed.

## Fail early and fail loud

Almost all functions are restricted in terms of access with require statements (sometimes multiple) that aim to present unauthorized or unexpected access or use of the contracts.

## Minimal proxy

A minimal proxy pattern was implemented to deploy new Auction contracts in order to minimize gas costs. This reduced the deployment cost on new Auction contracts by over 50% relative to replicating the entire bytecode of the logic contract with each auction.

## Using "tried and true" contracts

Gloom inherits from OpenZeppelin's Pausable, ProxyFactory, Initializable and IERC20 interface contracts. Usage of "battle tested" contracts is preferable to developing your own.
