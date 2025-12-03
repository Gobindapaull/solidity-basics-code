// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract Voting {
    uint8[3] candidates;
    bool votingStarted;

    function getCandidates() public pure returns (string memory) {
        return "0 = John, 1 = Rick, 2 = Nick";
    }

    function vote(uint8 _candidateId) public {
        require(_candidateId < candidates.length, "Candidates should not more than 3");
        candidates[_candidateId]++;
        votingStarted = true;
    }

    function announceWinner() public view returns (uint8, uint8) {
        require(votingStarted, "Voting has not started");
        uint8 winnerIndex = 0;
        for (uint8 i = 0; i < candidates.length; i++) {
            if (candidates[i] > candidates[winnerIndex]) {
                winnerIndex = i;
            }
        }
        return (winnerIndex, candidates[winnerIndex]);
    }

    function total() public view returns(uint8) {
        uint8 count = 0;
        for (uint8 i = 0; i < candidates.length; i++) {
            count += candidates[i];
        }
        return count;
    }
} 
