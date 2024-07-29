// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Factory {
    bytes32 immutable salt;
    event Deployed(address to);

    constructor(bytes memory _salt) {
        salt = bytes32(bytes(_salt));
    }

    function deploy() external {
        address to = address(
            new Target{salt: salt}()
        );
        emit Deployed(to);
    }

    function calculateAddress() external view returns (address) {
        bytes32 h = keccak256(
            abi.encodePacked(
                bytes1(0xff),
                address(this),
                salt,
                keccak256(getBytecode())
            )
        );
        return address(uint160(uint256(h)));
    }

    function getBytecode() public pure returns (bytes memory) {
        bytes memory bc = type(Target).creationCode;
        return abi.encodePacked(bc);
    }

    receive() external payable {

    }
}

contract Target {
    address public parent;
    uint public a;

    constructor() {
        parent = msg.sender;
    }

    function withdraw(address _to) external {
        (bool ok, ) = _to.call{value: address(this).balance}("");
        require(ok, "failed");
    }

    function setA(uint _a) external {
        a = _a;
    }

    function destroy() external {
        selfdestruct(payable(parent));
    }

    receive() external payable {

    }
}
