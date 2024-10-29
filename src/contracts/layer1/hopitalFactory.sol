// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Ownable} from "lib/openzeppelin-contracts/contracts/access/Ownable.sol";
contract HopitalFactory is Ownable{

    event NewUser(uint patientId, string name, uint age);
    struct Patient {
        string name;
        uint8 age;
        address walletAddress;
    }

    struct Doctor {
        uint idDoctor;
        string name;
        uint8 age;
        address walletAddress;
        uint8 rating;
    }

    Patient[] public patients;
    Doctor[] public doctors;

    mapping(address => bool) internal isDoctor;
    mapping (address => uint) public profileToOwner;
    mapping (address => uint) ownerProfileCount;

    constructor() Ownable(msg.sender) {}
    
    function createProfilePatient(string memory _name, uint8 _age ) public {
        require(ownerProfileCount[msg.sender] == 0, "You already have a patient profile");
        patients.push(Patient(_name, _age, msg.sender)); 
        uint id = patients.length - 1;
        profileToOwner[msg.sender] = id;
        ownerProfileCount[msg.sender]++;
        emit NewUser(id, _name, _age);

    }

    function createProfileDoctor(uint _idDoctor, string memory _name, uint8 _age) public {
        require(ownerProfileCount[msg.sender] == 0, "You already have a patient profile");
        require(_idDoctor > 10000, "Take id form hopital");
        doctors.push(Doctor(_idDoctor , _name, _age, msg.sender, 0));
        uint id = doctors.length - 1;
        profileToOwner[msg.sender] = id;
        ownerProfileCount[msg.sender]++;
        isDoctor[msg.sender] = true;
        emit NewUser(id, _name, _age);

    }
}