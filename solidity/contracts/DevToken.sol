// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/metatx/MinimalForwarder.sol";

error DevToken__MaxTokenLimitReached();
error DevToken__MaxHoldLimitReached(uint256 userBalance);

contract DevToken is ERC20, ERC2771Context {
    uint256 public immutable i_maxTokenLimit;
    uint256 public immutable i_maxHoldLimit;

    event TokenMinted(address to, uint256 amount);

    constructor(
        uint256 maxTokenLimit,
        uint256 maxHoldLimit,
        MinimalForwarder forwarder
    ) ERC2771Context(address(forwarder)) ERC20("DevToken", "DT") {
        i_maxTokenLimit = maxTokenLimit;
        i_maxHoldLimit = maxHoldLimit;
    }

    function mint(uint256 amount) public {
        if (amount > i_maxHoldLimit) revert DevToken__MaxHoldLimitReached(balanceOf(_msgSender()));

        if (totalSupply() + amount > i_maxTokenLimit) revert DevToken__MaxTokenLimitReached();

        _mint(_msgSender(), amount);

        emit TokenMinted(_msgSender(), amount);
    }

    function _msgSender() internal view override(Context, ERC2771Context) returns (address) {
        return ERC2771Context._msgSender();
    }

    function _msgData() internal view override(Context, ERC2771Context) returns (bytes memory) {
        return ERC2771Context._msgData();
    }

    fallback() external payable {}

    receive() external payable {}
}
