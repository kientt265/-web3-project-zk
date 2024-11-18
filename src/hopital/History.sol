// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract History {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    mapping (address => string[]) historyProof; 
    mapping (address => bool[]) historyResult; 

    function addHistory(address candidate, string memory proof, bool result) public {
        require(msg.sender == owner);
        historyProof[candidate].push(proof);
        historyResult[candidate].push(result);
    }

    function getHistoryProof(address candidate) public view returns (string[] memory) {
        return historyProof[candidate];
    }

    function getHistoryResult(address candidate) public view returns (bool[] memory) {
        return historyResult[candidate];
    }
}