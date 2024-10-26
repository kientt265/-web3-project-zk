// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract HopitalFactory{

    struct Patient {
        uint id;
        string name;
        uint age;
        uint profileId;
        address walletAddress;
    }

    struct Doctor {
        uint id;
        string name;
        string specialty;
        address walletAddress;
    }

    Patient[] public patients;
    Doctor[] public doctors;

    mapping (uint => address) public zombieToOwner;
    mapping (address => uint) ownerZombieCount;

    mapping (uint => address) public profileToOwner;
    mapping (address => uint) ownerProfileCount;
    
}