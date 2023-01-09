// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract FallbackInputOutput {
    address immutable target;

    constructor(address _target) {
        target = _target;
    }

    fallback(bytes calldata data) external payable returns (bytes memory) {
        (bool ok, bytes memory response ) = target.call{ value: msg.value }(data); 
        require(ok, "call failed");
        return response;
    }
}
contract Counter {
    uint public count;

    function inc() external returns (uint) {
        count += 1;
        return count;
    }
}

contract TestContractInputOutput {
    event Log(bytes response);
    function test(address _fallback, bytes calldata data) external {
        (bool ok, bytes memory response ) = _fallback.call(data);
        require(ok, "call failed");
        emit Log(response);
    } 
    function getTestData() external pure returns (bytes memory) {
        return abi.encodeCall(Counter.inc, ());
    }
}
