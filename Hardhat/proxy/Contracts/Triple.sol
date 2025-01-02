// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;


import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract Triple is Initializable {
    function initialize() public initializer{

    }

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }
    
    function triple(uint256 _number) public pure returns (uint256) {
        // it's a mistake
        return _number * 2;
    }
}
