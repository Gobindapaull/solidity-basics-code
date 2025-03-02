// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

contract Counter {
    uint256 public count;

    function inc() public returns (uint256) {
        count += 1;
        return count;
    }
}

contract YulCall {
    function yul_call(address addr, bytes calldata data) external 
    returns (bytes memory) {
        assembly {
            // Load free memory pointer
            let p := mload(0x40)
            // Copy calldata to memory
            calldatacopy(p, data.offset, data.length)
            // Call counter
            let ok := call(gas(), addr, 0, p, data.length, 0, 0)
            // Revert if call is not successful
            if iszero(ok) {
                revert (0, 0)
            }
            // Get return data size
            let return_data_size := returndatasize()
            // Return data as ABI encoded bytes
            // Store offset
            mstore(p, 0x20)
            // Store length
            mstore(add(p, 0x20), return_data_size)
            // Copy data from returndata
            returndatacopy(add(p, 0x40), 0, return_data_size)
            // Return data
            return(p, add(0x40, return_data_size))
        }
    }
}

contract Test {
    function test_inc(address yul, address counter) public 
    returns (uint256 count) {
        bytes memory res = YulCall(yul).yul_call(counter, abi.encodeCall(Counter.inc, ()));
        count = abi.decode(res, (uint256));
    }
}
