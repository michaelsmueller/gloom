# Avoiding common attacks

Measure to avoid common attacks in Gloom are as follows:

## Checks-effects-interactions to prevent reentrancy

State changes are performed before message calls, with particular note to the withdrawal functions in the Escrow contract. In particular, first both seller and buyer must have completed their inbound transfers and the contract must be in the Withdraw phase (checks), second the caller's balance is deducted from the state variable (effects) and finally the ETH transfer (to the seller) or token transfer (to the buyer) is carried out (interactions).

## Lack of mathematical operations

Mathematical operations are minimized, with seller and buyers only able to transfer ETH and token balances or commit a specific bid amount. Addition and subtraction only relate to sent balances which provides a natural impediment to integer overflow and underflow (they can't actually send over 2 ^ 256 - 1 ETH or tokens).

## Use of safe transfer

In order to future-proof the contracts against a chancge in gas prices, the Escrow contract uses msg.sender.call.value(amount) instead of transfer.

## Transaction ordering

The seller is able to step the Auction contract through its phases over time, providing a speed bump or impediment to transactions being executed out of order. For example, it is not possible to enter the Withdraw phase until the Deliver phase (depositing ETH payment and token balances into escrow) is complete.

## Withdrawal pattern against denial of service

The final sellerWithdraw and buyerWithdraw are isolated from one another, such that either buyer or seller may withdraw their tokens or proceeds once the previous escrow conditions are satisfied. As such, neither seller nor buyer can prevent the other party from withdrawing using a failed call, for example, on their own withdrawal, they will simply fail to withdraw their own tokens or proceeds.
