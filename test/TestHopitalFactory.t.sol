// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {DeployedHopitalFactory} from "script/DeployedHopitalFactory.s.sol";
import {HopitalFactory} from "src/contracts/layer1/hopitalFactory.sol";
import {DataTransfer} from "src/contracts/layer2/dataTransfer.sol";
import {DeployedDataTransfer} from "script/DeployedDataTransfer.s.sol";


contract TestHopitalFactory is Test {
    HopitalFactory hopitalFactory;
    DataTransfer dataTransfer;
    DeployedHopitalFactory deployerHopitalFactory;
    DeployedDataTransfer deployerDataTransfer;
    uint constant AMOUNT_OF_PATIENT = 10 ether;
    uint constant AMOUNT_OF_DOCTOR = 10 ether;
    uint constant AMOUNT_OF_OWNER = 10 ether;
    address patient = makeAddr("patient");
    address doctor = makeAddr("doctor");
    address owner = makeAddr("owner");
    function setUp() external{
        vm.prank(owner);
        deployerHopitalFactory = new DeployedHopitalFactory();
        hopitalFactory = deployerHopitalFactory.run(owner);
        
        vm.prank(owner);
        deployerDataTransfer = new DeployedDataTransfer();
        dataTransfer = deployerDataTransfer.run();
        
        vm.prank(owner);
        hopitalFactory.setDataTransferAddress(address(dataTransfer));

        deal(patient, AMOUNT_OF_PATIENT);
        deal(doctor, AMOUNT_OF_DOCTOR);
        deal(owner, AMOUNT_OF_OWNER);
    }

    

    function test_createMember() public {
        vm.startPrank(patient);
        hopitalFactory.createProfilePatient("Kien", 21);
        vm.stopPrank();
        (string memory name, uint age, ) = hopitalFactory.patients(0);
        console.log("Name new patient is: ", name);

        vm.startPrank(doctor);
        hopitalFactory.createProfileDoctor(100001, "Dr Vu", 31);
        vm.stopPrank();
    }

    // function test_storeRecord() public {
    //     test_createMember();
    //     vm.startPrank(patient);
    //     string memory hashToStore = "MaHoSoOfKien";
    //     hopitalFactory.storeRecord(1, hashToStore);
    //     vm.stopPrank();
    //     // Kiểm tra xem hash đã được lưu trong DataTransfer hay chưa
    //     (uint id, string memory ipfsHash,,) = dataTransfer.records(patient);
    //     console.log("Retrieved Hash from DataTransfer: ", ipfsHash);
    //     assertEq(ipfsHash, hashToStore, "The stored hash does not match the expected hash.");

    //     assertEq(id, 1, "The stored ID does not match the expected ID.");
    // }

    function test_storeRecordL2() public{
        test_createMember();
        vm.startPrank(patient);
        string memory hashToStore = "MaHoSoOfKien";
        hopitalFactory.storeRecord(1, hashToStore);
        vm.stopPrank();
        (uint id, string memory ipfsHash,,) = dataTransfer.records(0);
        console.log("This is ipfsHash", ipfsHash);
        console.log("This is IdNumber: ", id);
        assertEq(ipfsHash, hashToStore, "The stored hash does not match the expected hash.");
        assertEq(id, 1, "The stored ID does not match the expected ID.");
    }

    function test_grantAccess() public {
        test_storeRecordL2();
        vm.prank(patient);
        hopitalFactory.grantAccess(doctor);

        (uint id, string memory ipfsHash,address adrDoctor ,) = dataTransfer.records(0);
        console.log("Doctor will health: ", adrDoctor);
        assertEq(adrDoctor, doctor);
    }

    function test_doctorGetIpfsHash() public {
        test_grantAccess();
        vm.prank(doctor);
        string memory ipfs123 = hopitalFactory.getIpfsHash(address(hopitalFactory));

        (uint id, string memory ipfsHash,address adrDoctor ,) = dataTransfer.records(0);
        assertEq(ipfsHash, ipfs123);
    }
}