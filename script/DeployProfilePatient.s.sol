// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {ProfilePatient} from "../src/chain-patient/ProfilePatient.sol";

contract Deployerc721 is Script{
    ProfilePatient public profilePatient;
    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        profilePatient = new ProfilePatient("CrossHopital", "UIT");

        vm.stopBroadcast();
    }
}