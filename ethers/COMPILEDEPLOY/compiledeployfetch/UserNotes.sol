// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract UserNotes {
    mapping(address => string) private notes;

    event NoteSaved(address indexed user, string note);

    function saveNote(string calldata _note) public {
        notes[msg.sender] = _note;
        emit NoteSaved(msg.sender, _note);
    }

    function getMyNote() public view returns (string memory) {
        return notes[msg.sender];
    }
}
