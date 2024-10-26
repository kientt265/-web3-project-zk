// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./hopitalFactory.sol";

contract CrowdFunding is HopitalFactory{
    event HostCrowdFunding(string  nameCrowd, uint target, uint32 endTime, string  nameDoctorHost);
    constructor() HopitalFactory() {}
    struct Crowd{
        string nameCrowd;
        uint target;
        uint32 endTime;
        string nameHost;
        address adrHost;
    }

    mapping(address => bool) public isFunders;
    mapping(address => uint256) public funderToAmount;
    address[] public funders;

    Crowd[] public crowds;
    mapping(uint => address) public crowdToOwner;
    mapping (address => uint) public ownerCrowdCount;
    function createCrowd(string memory _nameCrowd, uint _target, uint32 _endTime) public {
        require(ownerCrowdCount[msg.sender] <= 2, "Only 2 host for 1 doctor!");
        crowds.push(Crowd(_nameCrowd, _target, _endTime, "Doctor K",msg.sender));
        uint id = crowds.length - 1 ;
        crowdToOwner[id] = msg.sender;
        ownerCrowdCount[msg.sender]++;
        emit HostCrowdFunding(_nameCrowd, _target, _endTime, "Doctor K");
    }
    receive() external payable {
        fundToCrowd();
    }

    fallback() external payable {
        fundToCrowd();
    }

    function fundToCrowd() public payable {
        funderToAmount[msg.sender] += msg.value;
        bool isFunded = isFunders[msg.sender];

        if (!isFunded) {
            funders.push(msg.sender);
            isFunders[msg.sender] = true;
        }
    }
    function withDraw() public onlyOwner{

    }
}