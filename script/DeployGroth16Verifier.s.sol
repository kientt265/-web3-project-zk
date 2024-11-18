// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Groth16Verifier} from "../src/hopital/Groth16Verifier.sol";

contract DeployG16Verify is Script {
    Groth16Verifier public groth16Verifier;



    function run() public returns(Groth16Verifier){
        vm.startBroadcast();

        groth16Verifier = new Groth16Verifier();

        vm.stopBroadcast();

        return groth16Verifier;
    }
}