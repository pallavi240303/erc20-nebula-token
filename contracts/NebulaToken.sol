//contracts/NebulaToken.sol
// SPDX-License-Identifier: MIT

/*
Token design : 
1. intial supply : 70% - 7,000,000  [Done]
2. max supply(capped) : 10,000,000 [Done]
3. make token burnable : [Done]
burning enables users or the contract owner to "burn" (destroy) a specified amount of tokens they own.
burning the tokens reduces the total supply, making the remaining tokens more valuable by increasing scarcity.
4. create block reward to distribute new supply to miners - blockReward , _minMinerReward [Done]
 */

pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract NebulaToken is ERC20Capped, ERC20Burnable {
    address payable public owner;
    uint256 public blockReward;

    constructor(uint256 cap , uint256 reward) ERC20("NebulaToken" , "NBT") ERC20Capped(cap * (10 ** decimals())){
        owner  = payable(msg.sender);
        _mint(owner, 7000000 * (10 ** decimals())); //minting : creating a new token and assigning them to a specific address
        blockReward = reward * (10 ** decimals());
    }

    modifier OnlyOwner {
        require(msg.sender == owner , "Only the owner can call this function");
        _;
    }

    function _mintMinerReward() internal {
        _mint(block.coinbase , blockReward);
    }

    function _update(address from, address to, uint256 value) internal virtual override(ERC20 ,ERC20Capped) {
            super._update(from, to, value);
            if(from != address(0) && to != block.coinbase && block.coinbase != address(0)) {
            _mintMinerReward();
        }     
    }

    function setBlockReward(uint256 reward) public OnlyOwner {
        blockReward = reward * (10 ** decimals());
    }

}
