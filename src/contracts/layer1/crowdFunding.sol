// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./hopitalFactory.sol";

contract CrowdFunding is HopitalFactory{
    event HostCrowdFunding(string  nameCrowd, uint target, uint32 endTime, string  nameDoctorHost);
    constructor(address _owner) HopitalFactory(_owner) {}
    
    struct Crowd{
        string nameCrowd;
        uint target;
        uint32 endTime;
        string nameHost;
        address adrHost;
        string scriptCrowd;
    }

    mapping(address => bool) public isFunders;
    mapping(address => uint256) public funderToAmount;
    address[] public funders;

    Crowd[] public crowds;
    mapping(uint => address) public crowdToOwner;
    mapping (address => uint) public ownerCrowdCount;

    modifier onlyDoctor(){
        require(isDoctor[msg.sender], "only doctors can call this function");
        _;
    }
    function createCrowd(string memory _nameCrowd, uint _target, uint32 _endTime,string memory _nameHost, string memory _scriptCrowd) public onlyDoctor(){
        require(ownerCrowdCount[msg.sender] <= 2, "Only 2 host for 1 doctor!");
        crowds.push(Crowd(_nameCrowd, _target, _endTime,_nameHost ,msg.sender, _scriptCrowd));
        uint id = crowds.length - 1 ;
        crowdToOwner[id] = msg.sender;
        ownerCrowdCount[msg.sender]++;
        emit HostCrowdFunding(_nameCrowd, _target, _endTime, _nameHost);
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
    function endCrowdfunding() public{
        
    }
}