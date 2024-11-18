// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.13;
// import "lib/forge-std/src/console.sol";
// import {Ownable} from "lib/openzeppelin-contracts/contracts/access/Ownable.sol";
// // import "hardhat/console.sol";

// interface Verifier {
//     function verifyProof(
//         uint256[2] calldata a,
//         uint256[2][2] calldata b,
//         uint256[2] calldata c,
//         uint256[1] calldata input
//     ) external view returns (bool);
// }

// contract AgeVerification is Ownable {
//     Verifier public verifierContract;

//     // Khởi tạo hợp đồng với địa chỉ của verifier
//     constructor(address _verifierAddress) {
//         verifierContract = Verifier(_verifierAddress);
//     }

//     // Hàm xác minh proof
//     function verifyAgeProof(
//         uint256[2] calldata a,
//         uint256[2][2] calldata b,
//         uint256[2] calldata c,
//         uint256[1] calldata input
//     ) external view returns (bool) {
//         // Gọi hàm verifyProof từ Verifier contract
//         return verifierContract.verifyProof(a, b, c, input);
//     }
// }
