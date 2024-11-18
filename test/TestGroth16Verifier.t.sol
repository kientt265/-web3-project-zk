// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
// import {DeployG16Verify} from "../script/DeployGroth16Verifier.s.sol";
import {Groth16Verifier} from "../src/hopital/Groth16Verifier.sol";

contract TestGroth16Verifier is Test {
    Groth16Verifier public groth16Verifier;
    // DeployG16Verify public deployG16Verify;

    uint256 constant AMOUNT_OF_OWNER = 10 ether;
    address owner = makeAddr("owner");

    function setUp() external {
    // Fund the owner with Ether
    deal(owner, AMOUNT_OF_OWNER);

    // Deploy the Groth16Verifier contract using the deployment script
    vm.startPrank(owner); // Giả lập hành động từ "owner"
        groth16Verifier = new Groth16Verifier();
    vm.stopPrank(); // Kết thúc giả lập
}


    function testVerifyProof() external {
        // Example inputs to the verifyProof function
        uint256[2] memory pA = [
            uint256(0x0963c8a867a2f2b83a4822ed15791fc1f7561e2bd0fbc284be2c7f25a91f1ad8), 
            uint256(0x100c5b0e0b752c2726d02ed1146059acca0b70d452229454dce71ae94d8dedd2)
        ];
        uint256[2][2] memory pB = [
            [uint256(0x04a95792b8328f8292b702505d1cbe54b0edb58067bdc60771c22d5b64b240ad), uint256(0x204358ea6ac6ad0749179029ffb986bee5ceaab0cd8f0a271459bd86fe9dc53a)],
            [uint256(0x05d51efb503aa7876a977c78b8df73345d26d25e90cd467b55e8e7c0acf7998d), uint256(0x27aa3ca28935f9c1a4e8f893b4f4003d34fe1e654dc1a81c40db8ef46f3ee3d0)]
        ];
        uint256[2] memory pC = [
            uint256(0x109d20179174845bb77569f9f38b5cd2bc1fb10ad062c97cf3a2b3e5c2849109), 
            uint256(0x19b1b4e227facba3e014b144524052d2fb8d62cd1cf6b91727b18a706781fea2)
        ];
        uint256[1] memory pubSignals = [uint256(0x0000000000000000000000000000000000000000000000000000000000000007)];

        // Call the verifyProof function
        vm.startPrank(owner);
        bool result = groth16Verifier.verifyProof(pA, pB, pC, pubSignals);
        vm.stopPrank();

        // Assert the result is as expected (this depends on your setup and valid proof)
        assertEq(result, true, "verifyProof should return true for valid proof");
    }
}
