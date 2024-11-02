// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {DeployedHopitalFactory} from "script/DeployedHopitalFactory.s.sol";
import {HopitalFactory} from "src/contracts/layer1/hopitalFactory.sol";
import {DataTransfer} from "src/contracts/layer2/dataTransfer.sol";
import {DeployedDataTransfer} from "script/DeployedDataTransfer.s.sol";


contract TestHopitalFactory is Test {
    HopitalFactory hopitalFactory;
    DeployedHopitalFactory deployer;
    function setUp() external{
        deployer = new DeployedHopitalFactory();
        hopitalFactory = deployer.run();
    }
}