// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

contract Main {
    address public delegateContract;
    address[] public previousDelegates;

    uint256 public total;
    event DelegateChanged(address oldAddress, address newAddress);

    constructor(address _delegateContract) {
        delegateContract = _delegateContract;
    }

    function changeDelegateContract(address _newDelegate) public returns (bool) {
        if(_newDelegate != delegateContract) {
            previousDelegates.push(delegateContract);
            address oldDelegate = delegateContract;
            delegateContract = _newDelegate;
            emit DelegateChanged(oldDelegate, _newDelegate);
            return true;
        }
        return false;
    }

    function delegateAdd(uint256 num1, uint256 num2) public {
        (bool success, ) = delegateContract.delegatecall(abi.encodeWithSignature("add(uint256,uint256)", num1, num2));
        require(success, "delegateAdd failed");
    }

    function callAdd(uint256 num1, uint256 num2) public {
        (bool success, ) = delegateContract.call(abi.encodeWithSignature("add(uint256,uint256)", num1, num2));
        require(success, "callAdd failed");
    }
}
