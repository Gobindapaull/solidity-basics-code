// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract MultiSigWallet {

    address[] public owners;
    uint256 public numConfirmationRequired;

    // mapping
    mapping(address => bool) public isOwner;
    mapping(uint => mapping(address => bool)) public isConfirm;

    // modifier
    modifier onlyOwner() {
        require(isOwner[msg.sender], "not owner");
        _;
    }

    modifier txExist(uint _txIndex) {
        require(_txIndex < transactions.length, "tx does not exist");
        _;
    }

    modifier notExecuted(uint _txIndex) {
        require(!transactions[_txIndex].executed, "tx already executed");
        _;
    }

    modifier notConfirm(uint _txIndex) {
        require(!isConfirm[_txIndex][msg.sender], "tx already confirm");
        _;
    }

    // event
    event SubmitTx(
        address indexed owner,
        uint256 indexed txIndex,
        address indexed to,
        uint256 value,
        bytes32 data
    );

    event ConfirmTransaction (
        address indexed owner,
        uint indexed txIndex
    );

    // struct
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
        for (uint i = 0; i < _owners.length; i++) {
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

    function confirmTx(uint _txIndex) public onlyOwner txExist(_txIndex)
    notExecuted(_txIndex) {
        Transaction storage transaction = transactions[_txIndex];
        transaction.numConfirmation += 1;
        isConfirm[_txIndex][msg.sender] = true;

        emit ConfirmTransaction(msg.sender, _txIndex);

    }

    function executeTx() public onlyOwner {}

    function revokeTx() public onlyOwner {}
}
