const Escrow = artifacts.require('Escrow');
const MikeToken = artifacts.require('MikeToken');
const truffleAssert = require('truffle-assertions');
const { BN } = web3.utils;

contract('Escrow', accounts => {
  let escrowInstance;
  const admin = accounts[0];
  const seller = accounts[1];
  const buyer = accounts[2];
  const auction = accounts[8];
  const attacker = accounts[9];

  const WINNING_BID = web3.utils.toWei('1', 'ether');
  const WINNING_BID_HEX = web3.utils.numberToHex(WINNING_BID);
  const WINNING_BID_HEX_PADDED = web3.utils.padLeft(WINNING_BID_HEX, 64);
  const WINNING_BID_BN = new BN(WINNING_BID);

  const TOKENS = new BN(100);
  const DECIMALS = new BN(18);
  const TEN = new BN(10);
  const tokenAmount = TOKENS.mul(TEN.pow(DECIMALS));

  before(async () => {
    mikeToken = await MikeToken.deployed();
    escrowInstance = await Escrow.new({ from: auction });
    await mikeToken.transfer(seller, tokenAmount, { from: admin });
    await escrowInstance.initialize(seller, buyer, tokenAmount, mikeToken.address, WINNING_BID_HEX_PADDED, {
      from: auction,
    });
    await mikeToken.approve(escrowInstance.address, tokenAmount, { from: seller });
  });

  it('should allow seller and buyer to check winning bid', async () => {
    const winningBid1 = await escrowInstance.getWinningBid({ from: buyer });
    assert(winningBid1.eq(WINNING_BID_BN), 'incorrect winning bid amount');
    const winningBid2 = await escrowInstance.getWinningBid({ from: seller });
    assert(winningBid2.eq(WINNING_BID_BN), 'incorrect winning bid amount');
  });

  it('should not allow someone other than seller or buyer to check winning bid', async () => {
    await truffleAssert.reverts(escrowInstance.getWinningBid({ from: attacker }), 'Sender not authorized');
  });

  it('should accept correct payment from the buyer', async () => {
    const tx = await escrowInstance.buyerPayment({ from: buyer, value: WINNING_BID_HEX_PADDED });
    let amount;
    truffleAssert.eventEmitted(tx, 'LogBuyerPaid', event => {
      amount = event.amount;
      return event.buyer === buyer;
    });
    assert(amount.eq(WINNING_BID_BN), 'incorrect payment amount');
  });

  it('should not accept payment from someone other than buyer', async () => {
    await truffleAssert.reverts(
      escrowInstance.buyerPayment({ from: attacker, value: WINNING_BID_HEX_PADDED }),
      'Sender not authorized',
    );
  });

  it('should not show both ok after only buyer payment', async () => {
    const bothOk = await escrowInstance.bothOk({ from: buyer });
    assert(!bothOk, 'Both are ok');
  });

  it('should accept correct token transfer from the seller', async () => {
    const tx = await escrowInstance.sellerDelivery({ from: seller });
    truffleAssert.eventEmitted(tx, 'LogSellerDelivered', event => {
      assert.deepEqual(event.tokenAmount, tokenAmount, 'incorrect transfer amount');
      return event.seller === seller;
    });
  });

  it('seller and buyer can confirm find bothOk after payment and token delivery', async () => {
    const bothOk1 = await escrowInstance.bothOk({ from: seller });
    const bothOk2 = await escrowInstance.bothOk({ from: buyer });
    assert(bothOk1 && bothOk2, 'Both are not ok');
  });

  it('should not allow someone other than seller or buyer to check bothOk', async () => {
    await truffleAssert.reverts(escrowInstance.bothOk({ from: attacker }), 'Sender not authorized');
  });

  it('should allow seller to withdraw winning bid payment', async () => {
    await escrowInstance.startWithdraw({ from: auction });
    const tx = await escrowInstance.sellerWithdraw({ from: seller });
    let amount;
    truffleAssert.eventEmitted(tx, 'LogSellerWithdrew', event => {
      amount = event.amount;
      return event.seller == seller;
    });
    assert(amount.eq(WINNING_BID_BN), 'incorrect payment amount');
  });

  it('should allow buyer to withdraw tokens', async () => {
    await escrowInstance.startWithdraw({ from: auction });
    const tx = await escrowInstance.buyerWithdraw({ from: buyer });
    let amount;
    truffleAssert.eventEmitted(tx, 'LogBuyerWithdrew', event => {
      amount = event.tokenAmount;
      return event.buyer == buyer;
    });
    assert(amount.eq(tokenAmount), 'incorrect payment amount');
  });
});
