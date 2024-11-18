// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "lib/openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
contract ProfilePatient is ERC721URIStorage {
    constructor (string memory name, string memory symbol) ERC721(name, symbol) {

    }

    function createProfilePatient(uint256 patientID, string memory tokenURI) public {
        _safeMint(msg.sender, patientID);
        _setTokenURI(patientID, tokenURI);
    }
}