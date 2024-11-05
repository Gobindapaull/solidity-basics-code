// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LuckChecker {
    uint256 public lastLuckNumber;
    address public lastUser;

    event LuckChecked(address indexed user, uint256 luckNumber, string result);

    function checkMyLuck() public returns (string memory) {
        lastLuckNumber = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % 100;
        lastUser = msg.sender;

        string memory result;
        if (lastLuckNumber > 75) {
            result = "You are super lucky!";
        } else if (lastLuckNumber > 40) {
            result = "Not too shabby, moderate luck!";
        } else {
            result = "Uh-oh... maybe try again?";
        }

        emit LuckChecked(msg.sender, lastLuckNumber, result);
        return result;
    }

    function lastResult() public view returns (string memory) {
        return string(
            abi.encodePacked("Last user ", toAsciiString(lastUser), " got a luck score of ", uint2str(lastLuckNumber), ".")
        );
    }

    function toAsciiString(address x) internal pure returns (string memory) {
        bytes memory s = new bytes(40);
        for (uint256 i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint256(uint160(x)) / (2**(8 * (19 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            s[2 * i] = char(hi);
            s[2 * i + 1] = char(lo);
        }
        return string(s);
    }

    function char(bytes1 b) internal pure returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }

    function uint2str(uint256 _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) return "0";
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
            bstr[k] = bytes1(temp);
            _i /= 10;
        }
        return string(bstr);
    }
}
