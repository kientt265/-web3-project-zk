// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import {Script, console} from "forge-std/Script.sol";
import {DataTransfer} from "src/contracts/layer2/dataTransfer.sol";

contract DeployedDataTransfer is Script{
    DataTransfer dataTransfer;
    function run() external returns(DataTransfer){
        vm.startBroadcast();
        dataTransfer = new DataTransfer();
        vm.stopBroadcast();
        return dataTransfer;
    }
}