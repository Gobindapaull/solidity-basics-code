// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

contract Bytes {
    // bytes is used to store raw binary data.
    bytes public data = "Hello World"; // 0x48656c6c6f20576f726c64
    string public message = "Hello";
    bytes public storeData;

    bytes32 public data1 = keccak256("hello World");
    // 0x079813c47d3d4ab9abf0c0747f5b5cdf90e0e264ae09ea44fb2509c559b72ac1

    // Length
    function getLength() public view returns (uint) {
        return data.length; // 1
    }

    // String to bytes
    function toBytes() public view returns (bytes memory) {
        return bytes(message); // 0x48656c6c6f
    }

    // Store data
    function saveData(bytes calldata _data) public {
        storeData = _data;
    }

    // Convert address to bytes32
    function addressToBytes32(address _addr) public pure returns (bytes32) {
        return bytes32(uint256(uint160(_addr)));
        // 0x000000000000000000000000ab8483f64d9c6d1ecf9b849ae677dd3315835cb2
    }

    // Hashing bytes
    function hashData(bytes memory _data) public pure returns (bytes32) {
        return keccak256(_data);
        // 0x592fa743889fc7f92ac2a37bb1f5ba1daf2a5c84741ca0e0061d243a2e6707ba
    }

    // ABI Encoding
    function encodeData(address user, uint256 amount) public pure returns (bytes memory) {
        return abi.encode(user, amount);
        // 0x000000000000000000000000ab8483f64d9c6d1ecf9b849ae677dd3315835cb20000000000000000000000000000000000000000000000000000000000003039
    }

    // Function selector
    function getSelector() public pure returns (bytes4) {
        return bytes4(keccak256("transfer(address,uint256)")); // 0xa9059cbb
    }

    // Decode Bytes
    function decode(bytes memory _data) public pure returns (address, uint256) {
        return abi.decode(_data, (address, uint256));
        // 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
        // 12345
    }

}
