// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// storage - data is stored on the blockchain
// memory - data is cleared out after a function call
// transient storage - data is cleared out after a transaction

contract TestStorage {
    uint256 public val;

    function test() public {
        val = 123;
        msg.sender.call("");
    }
}

interface ITest {
    function val() external view returns (uint256);
    function test() external;
}

contract TestTransientStorage {
    bytes32 constant SLOT = 0;

    function test() public {
        assembly {
            tstore(SLOT, 321)
        }
        msg.sender.call("");
    }

    function val() public view returns (uint256 v) {
        assembly {
            v := tload(SLOT)
        }
    }
}

contract Callback {
    uint256 public val;
    fallback() external {
        val = ITest(msg.sender).val();
    }
    function test(address target) external {
        ITest(target).test();
    } 
}
