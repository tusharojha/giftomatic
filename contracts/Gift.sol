// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Gift {
    struct Campaign {
        string title;
        string description;
        uint256 targetAmount;
        uint256 collectedAmount;
        string image;
        string manualLink;
    }
    
    mapping(address => Campaign[]) addressCampaignMap;

    event campaignCreation(address indexed _owner, uint256 indexed _id);

    function createCampaign(string calldata _title, string calldata _description, uint256 _targetAmount, string calldata _image, string memory _link) public {
        Campaign memory _event = Campaign(
            _title,
            _description,
            _targetAmount,
            0,
            _image,
            _link
        );
        addressCampaignMap[msg.sender].push(_event);
        emit campaignCreation(msg.sender, addressCampaignMap[msg.sender].length);
    }

    function viewCampaign(address owner, uint256 _id) public view returns (Campaign memory _event) {
        return addressCampaignMap[owner][_id - 1];
    }

    function getAllCampaigns(address owner) public view returns (Campaign[] memory _campaigns) {
        return addressCampaignMap[owner];
    }

    function getCampaignCount(address owner) public view returns (uint256) {
        return addressCampaignMap[owner].length;
    }

    function addGift(address owner, uint256 _id) payable public {
        Campaign memory _event = addressCampaignMap[owner][_id - 1];
        require(_id <= addressCampaignMap[owner].length, "Not a valid campaign");
        require(_event.collectedAmount < _event.targetAmount, "Campaign is compeleted.");
        (bool sent, ) = owner.call{value: msg.value}("");
        require(sent, "Unable to donate");
        Campaign memory _tempEvent = Campaign(
        _event.title,
        _event.description,
        _event.targetAmount,
        _event.collectedAmount + msg.value,
        _event.image,
        _event.manualLink
        );
        addressCampaignMap[owner][_id - 1] = _tempEvent;
    }
}