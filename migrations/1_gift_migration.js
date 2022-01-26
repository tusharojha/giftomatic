const GiftToken = artifacts.require("GiftToken.sol")
const Gift = artifacts.require("Gift.sol")

module.exports = async function (deployer) {

  await deployer.deploy(GiftToken)

  const giftToken = await GiftToken.deployed()

  await deployer.deploy(Gift, giftToken.address)

  const gift = await Gift.deployed()

  await giftToken.transferOwner(gift.address)

};
