// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/metatx/MinimalForwarder.sol";

contract Registry is ERC2771Context {
    event Registered(address indexed who, string message);

    mapping(address => string) public messages;

    constructor(
        MinimalForwarder forwarder // Initialize trusted forwarder
    ) ERC2771Context(address(forwarder)) {}

    function register(string memory message) public {
        messages[_msgSender()] = message;
        emit Registered(_msgSender(), message);
    }
}
