// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract YUL {
    uint public a = 11; // slot 0
    uint public b = 12; // slot 1
    uint public c = 13; // slot 2

    uint128 e = 55; // slot 3
    uint128 f = 66; // slot 3


    uint128 g; // slot 4

    function setValue(uint v) external {
        a = v;
    }

    function getYULVal() external view returns(uint r) {
        assembly {
            r := sload(a.slot)
        }
    }

    function getValueBySlotIndex(uint slotIndex) external view returns(uint d) {
       assembly {
        d := sload(slotIndex)
       }
    }

    function getValueBySlotIndexBYTES32(uint slotIndex) external view returns(bytes32 i) {
       assembly {
        i := sload(slotIndex)
       }
    }

    function setValueBySlotIndexAndVal(uint slotIndex, uint val) external {
        assembly {
            sstore(slotIndex, val)
        }
    }

    function getSlot() external pure returns(uint slot) {
        assembly {
            slot := g.slot
        }
    }

}
