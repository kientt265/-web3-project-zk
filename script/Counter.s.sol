// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import {Script, console} from "forge-std/Script.sol";
import {Counter} from "../src/contracts/Counter.sol";

contract CounterScript is Script {
    Counter public counter;

    function setUp() public {}
    //Code nào nằm bên trong thì chạy trong mạng blockchain
    function run() public returns(Counter){
        vm.startBroadcast();

        counter = new Counter();

        vm.stopBroadcast();
        return counter;
    }
    
}
