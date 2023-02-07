// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract MultiSigWallet {
    address[] public owners;
    uint256 public numConfirmationRequired;
    mapping(address => bool) public isOwner;

    modifier onlyOwner() {
        require(isOwner[msg.sender], "not owner");
        _;
    }

    event SubmitTx(
        address indexed owner,
        uint256 indexed txIndex,
        address indexed to,
        uint256 value,
        bytes32 data
    );

    struct Transaction {
        address to;
        uint256 value;
        bytes data;
        bool executed;
        uint256 numConfirmations;
    }

    Transaction[] public transactions;

    constructor(address[] memory _owners, uint256 _numConfirmationRequired) {
        require(_owners.length > 0, "owners required");
        require(
            _numConfirmationRequired > 0 &&
                _numConfirmationRequired <= _owners.length,
            "Invalid number of confirmations"
        );
        for (uint256 i = 0; i < _owners.length; i++) {
            owners = _owners[i];
            require(owners != address(0), "Invalid owners");
            require(!isOwner[owner], "owners not unique");
            isOwner[owner] = true;
            owners.push(owner);
        }
        numConfirmationRequired = _numConfirmationRequired;
    }

    function submitTx(
        address _to,
        uint256 _value,
        bytes memory _data
    ) public onlyOwner {
        uint256 txIndex = transactions.length;
        transactions.push(
            Transaction({
                to: _to,
                value: _value,
                data: _data,
                executed: false,
                numConfirmations: 0
            })
        );
        emit SubmitTx(msg.sender, txIndex, _to, _value, _data);
    }

    function confirmTx() public onlyOwner {}

    function executeTx() public onlyOwner {}

    function revokeTx() public onlyOwner {}
}
