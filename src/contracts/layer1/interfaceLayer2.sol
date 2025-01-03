// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface IDataTransfer {

    function storeRecord(uint id, string memory ipfsHash) external;

    
    function grantAccess(address doctor) external;


    function revokeAccess(address doctor) external;


    function getIpfsHash(address patient) external view returns (string memory);


}
