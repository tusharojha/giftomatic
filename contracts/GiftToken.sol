// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GiftToken is ERC20 {
    address public owner;

    event TransferOwner(address indexed from, address indexed to);

    constructor() ERC20("Gift", "GFT") {
        owner = msg.sender;
        _mint(msg.sender, 100000 * 10**18);
    }

    function mint(address to, uint256 amount) public {
        require(msg.sender == owner, "Only owner can mint");
        _mint(to, amount);
    }

    function transferOwner(address to) public returns (bool) {
        require(msg.sender == owner, "Only owner can transfer ownership");
        owner = to;

        emit TransferOwner(owner, to);
        return true;
    }

    function transfer(address, uint256) public pure override returns (bool) {
        // Gift tokens are non-transferrable.
        return false;
    }
}
