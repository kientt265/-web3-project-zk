// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
contract Patient {
    address public s_owner;

    constructor () {
        s_owner = msg.sender;
    }

    mapping (address => uint256) patients;

    function getPatientId(address _patient) public view returns(uint256) {
        require(msg.sender == s_owner);
        return patients[_patient];
    }

    function addPatient(address _patient, uint256 _id) public returns(bool){
        require(msg.sender == s_owner);
        if(patients[_patient] == 0 ){
            patients[_patient] = _id;
            return true;
        }

        return false;
    }
}