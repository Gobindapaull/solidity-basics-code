// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

contract Pausable {
    bool private _paused = false;

    function paused() public view virtual returns(bool) {
        return _paused;
    }

    modifier whenNotPaused() {
        require(!paused(), "paused");
        _;
    }

    modifier whenPaused() {
        require(paused(), "not paused");
        _;
    }

    function _pause() internal virtual whenNotPaused() {
        _paused = true;
    }

    function _unpause() internal virtual whenPaused() {
        _paused = false;
    }


}

contract Reva is Pausable {
    string public name = "Reva";
    string public symbol = "RXV";
    uint8 public decimals = 18;
    uint public totalSupply = 30_000_000_000 * 10 ** decimals;
    mapping( address => uint) public _balances;

    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "BEP20: mint to the zero address");
        _balances[account] += amount;
    }

    address public owner;
    
    constructor( address _owner ) {
        owner = _owner;
    }

    address public teamWallet;
    address public airdropWallet;
    address public presaleWallet;
    
    uint256 public duration = 2628000; // 1 months
    
    bool public lockInitStatus;
    bool public lockStatus;
    
    struct lockData {
        uint256 duration;
        uint256 initialDeadline;
        uint256 instalmentDeadline;
        uint256 lockedBalances;
        uint256 totalUnlock;
    }
    
    mapping (address => lockData) public lockDuration;
    
    function lockInit(address _teamWallet,address _airdropWallet,address _presaleWallet) public  {
        require(msg.sender == owner, "not owner");
        require(!lockInitStatus, "already init");

        teamWallet = _teamWallet;
        airdropWallet = _airdropWallet;
        presaleWallet = _presaleWallet;
        // 63072000 = 2 years
        lockDuration[teamWallet] = lockData(63072000, (block.timestamp + 63072000),(block.timestamp + 63072000),  8750000e18,0);
        lockDuration[presaleWallet] = lockData(5256000, (block.timestamp + 5256000),(block.timestamp + 5256000), 20000000e18,0);
        
        _mint(address(this),58750000e18);
        _mint(airdropWallet,2500000e18);
        lockInitStatus = true;
    }
    
    function lockStatusUpdate(bool status) public {
        require(msg.sender == owner, "not owner");
        lockStatus = status;
    }

    function pause() public {
        require(msg.sender == owner, "not owner");
        _pause();
    }

    function unpause() public {
        require(msg.sender == owner, "not owner");
        _unpause();
    }

}
