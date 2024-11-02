// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import {Script, console} from "forge-std/Script.sol";
import {HopitalFactory} from "src/contracts/layer1/hopitalFactory.sol";

contract DeployedHopitalFactory is Script{
    HopitalFactory hopitalFactory;
    function run(address _owner) external returns(HopitalFactory){
        vm.startBroadcast();
        hopitalFactory = new HopitalFactory(_owner);
        vm.stopBroadcast();
        return hopitalFactory;
    }
}