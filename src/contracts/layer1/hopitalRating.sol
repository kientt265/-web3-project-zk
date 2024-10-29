// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./crowdFunding.sol";

contract HopitalRating is CrowdFunding{
    constructor() CrowdFunding() {}
    struct DoctorInfo {
        uint8 totalRating;
        uint8 numberOfRatings;
    }
    mapping(address => DoctorInfo) public doctorRatings;
    mapping(address => mapping(address => bool)) public doctorPatientRecords;
    
    function diagnose( address _walletAddressDoctor)  public {
        require(_walletAddressDoctor != address(0), "Invalid doctor address");
        doctorPatientRecords[msg.sender][_walletAddressDoctor] = true;
    }

    function ratingDoctor(address _walletAddressDoctor, uint8 _rating) public {
        require(_rating>=1 && _rating <=5, "Only rate from 1 to 5");
        require(doctorPatientRecords[msg.sender][_walletAddressDoctor], "You haven't been treated by this doctor");


        doctorRatings[_walletAddressDoctor].totalRating += _rating;
        doctorRatings[_walletAddressDoctor].numberOfRatings += 1;

        doctorPatientRecords[msg.sender][_walletAddressDoctor] = false;

        uint index = profileToOwner[_walletAddressDoctor];
        DoctorInfo memory info = doctorRatings[_walletAddressDoctor];
        require(info.numberOfRatings == 0);
        doctors[index].rating = info.totalRating / info.numberOfRatings;
    }
}