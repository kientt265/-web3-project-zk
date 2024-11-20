// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {History} from "../src/hopital/History.sol";

contract DeployHistory is Script {
    History public history;
    function run() public returns(History){
        vm.startBroadcast();
        history = new History();
        vm.stopBroadcast();
        return history;
    }
}