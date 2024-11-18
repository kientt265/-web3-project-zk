// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {DeployG16Verify} from "../script/DeployGroth16Verifier.s.sol";
import {Groth16Verifier} from "../src/hopital/Groth16Verifier.sol";

contract TestGroth16Verifier is Test {
    Groth16Verifier public groth16Verifier;
    DeployG16Verify public deployG16Verify;

    uint256 constant AMOUNT_OF_OWNER = 10 ether;
    address owner = makeAddr("owner");

    function setUp() external {
    // Fund the owner with Ether
    deal(owner, AMOUNT_OF_OWNER);
    // Deploy the Groth16Verifier contract using the deployment script
    vm.startPrank(owner);
    deployG16Verify = new DeployG16Verify();
    groth16Verifier = deployG16Verify.run();
    // groth16Verifier = deployG16Verify.groth16Verifier();
    vm.stopPrank();
}




    function testVerifyProof() external {
        // Example inputs to the verifyProof function
        uint256[2] memory pA = [uint256(1), uint256(2)];
        uint256[2][2] memory pB = [[uint256(1), uint256(2)], [uint256(3), uint256(4)]];
        uint256[2] memory pC = [uint256(5), uint256(6)];
        uint256[1] memory pubSignals = [uint256(7)];

        // Call the verifyProof function
        vm.startPrank(owner);
        bool result = groth16Verifier.verifyProof(pA, pB, pC, pubSignals);
        vm.stopPrank();

        // Assert the result is as expected (this depends on your setup and valid proof)
        assertEq(result, false, "verifyProof should return false for invalid proof");
    }
}
