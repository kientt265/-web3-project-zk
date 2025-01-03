// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {IDataTransfer} from "./interfaceLayer2.sol";
import {Ownable} from "lib/openzeppelin-contracts/contracts/access/Ownable.sol";
contract HopitalFactory is Ownable {

    IDataTransfer public dataTransfer;

    event NewUser(uint patientId, string name, uint age);
    event RecordStored(address indexed patient, string ipfsHash);
    event AccessGranted(address indexed patient, address indexed doctor);
    event AccessRevoked(address indexed patient, address indexed doctor);

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
    struct DoctorInfo {
        uint8 totalRating;
        uint8 numberOfRatings;
    }
    Patient[] public patients;
    Doctor[] public doctors;

    mapping(address => bool) internal isDoctor;
    mapping (address => uint) public profileToOwner;
    mapping (address => uint) ownerProfileCount;
    //
    mapping(address => DoctorInfo) public doctorRatings;
    mapping(address => mapping(address => bool)) public doctorPatientRecords;
    //
    constructor(address _owner) Ownable(msg.sender) {}

    function setDataTransferAddress(address _address) public  {
    dataTransfer =  IDataTransfer(_address);
    }
    
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

    function storeRecord(uint _id, string memory ipfsHash) public {
        require(profileToOwner[msg.sender] < patients.length, "You are not a registered patient.");
        dataTransfer.storeRecord(_id, ipfsHash);
        emit RecordStored(msg.sender, ipfsHash);
    }


    function grantAccess(address doctor) public {
        require(isDoctor[doctor], "Address is not a doctor.");
        dataTransfer.grantAccess(doctor);
        emit AccessGranted(msg.sender, doctor);
        require(doctor != address(0), "Invalid doctor address");
        doctorPatientRecords[msg.sender][doctor] = true;
    }


    function revokeAccess(address doctor) public {
        require(isDoctor[doctor], "Address is not a doctor.");
        dataTransfer.revokeAccess(doctor);
        emit AccessRevoked(msg.sender, doctor);
    }


    function getIpfsHash(address patient) public view returns (string memory) {
        require(isDoctor[msg.sender], "Only doctors can view records.");
        return dataTransfer.getIpfsHash(patient);
    }


    function ratingDoctor(address _walletAddressDoctor, uint8 _rating) public {
        require(_rating >= 1 && _rating <= 5, "Only rate from 1 to 5");
        require(doctorPatientRecords[msg.sender][_walletAddressDoctor], "You haven't been treated by this doctor");

        doctorRatings[_walletAddressDoctor].totalRating += _rating;
        doctorRatings[_walletAddressDoctor].numberOfRatings += 1;

        doctorPatientRecords[msg.sender][_walletAddressDoctor] = false;

        uint index = profileToOwner[_walletAddressDoctor];
        DoctorInfo memory info = doctorRatings[_walletAddressDoctor];
        

        if (info.numberOfRatings > 0) {
            doctors[index].rating = info.totalRating / info.numberOfRatings;
        }
    }

    
}
