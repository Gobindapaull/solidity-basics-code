// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract AutoETH {
    address public receiverAddress = payable(0x91a7c0acef1fC528CE695513A648490C8242191A);

    receive() external payable {
        (bool success, ) = receiverAddress.call{value: address(this).balance}("");
        require(success, "ETH transfer failed");
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
