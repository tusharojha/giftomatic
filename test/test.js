const GiftToken = artifacts.require('./GiftToken.sol')
const Gift = artifacts.require('./Gift.sol')


const { assert } = require('chai')
const truffleAssert = require('truffle-assertions')

contract("Gift Tokens", ([deployer, user]) => {
    it("Should not transfer", async () => {
        let giftToken = await GiftToken.new()
        let response = await giftToken.transfer(user, 100)
        assert.equal(response, false)
    })
})

contract("GiftoMatic tests", ([deployer, user]) => {
    let giftToken, gift, tx

    beforeEach(async () => {
        giftToken = await GiftToken.new()
        gift = await Gift.new(giftToken.address)
        await giftToken.transferOwner(gift.address)

        tx = await gift.createCampaign("A test title", "A test description", 10 ** 6, "test_image_url", "test_external_url")
    })

    it("should create a new campaign", async () => {
        await truffleAssert.eventEmitted(tx, 'CampaignCreated', (ev) => {
            return ev.creator.toString() === deployer && ev.collectedAmount.toString() == "0";
        });
    })

    it("should fetch campaigns", async () => {

        let campaign = await gift.getCampaignsByCreator(deployer)
        assert.equal(campaign[0].title, "A test title")

        campaign = await gift.getCampaign(deployer, 0)
        assert.equal(campaign.title, "A test title")
    })

    describe("should gift to campaings", async () => {

        it("should not gift to self", async () => {

            await truffleAssert.reverts(gift.gift(deployer, 0), "You cannot gift to yourself")
        })

        it("should gift to other campaigns", async () => {
            await gift.gift(deployer, 0, { from: user, value: 10 ** 3 })

            let camp = await gift.getCampaign(deployer, 0)
            assert.equal(camp.collectedAmount, 10 ** 3)

            let balance = await giftToken.balanceOf(user)
            assert.equal(balance.toString(), 10 ** 3)
        })
    })
})
