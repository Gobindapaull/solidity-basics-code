// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {
    uint256 public count;

    function inc() public returns (uint256) {
        count += 1;
        return count;
    }
}

contract YulCall {
    function yul_call(address addr, bytes calldata data) external returns (bytes memory) {
        assembly {
            let p := mload(0x40)
            calldatacopy(p, data.offset, data.length)
            let ok := call(gas(), addr, 0, p, data.length, 0, 0)
            if iszero(ok) {
                revert(0, 0)
            }
            let return_data_size := returndatasize()
            mstore(p, 0x20)
            mstore(add(p, 0x20), return_data_size)
            returndatacopy(add(p, 0x40), 0, return_data_size)
            return (p, add(0x40, return_data_size))
        }
    }
}

contract Test {
    function test_inc(address yul, address counter) public returns (uint256 count) {
        bytes memory res = YulCall(yul).yul_call(counter, abi.encodeCall(Counter.inc, ()));
        count = abi.decode(res, (uint256));
    } 
}
