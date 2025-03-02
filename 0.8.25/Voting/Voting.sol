// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Voting {

    struct Candidate {
        string name;
        uint256 voteCount;
    }

    struct Voter {
        bool hasVoted;
        uint256 votedCandidateId;
    }

    address public admin;

    mapping(address => Voter) public voters;

    Candidate[] public candidates;

    event CandidateRegistered(string name, uint256 candidateId);
    event Voted(address indexed voter, uint256 candidateId);

    modifier onlyAdmin {
        require(msg.sender == admin, "Only admin can call this");
        _;
    }

    modifier hasNotVoted {
        require(!voters[msg.sender].hasVoted, "Already voted");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function registerCandidate(string memory _name) public onlyAdmin {
        candidates.push(Candidate({
            name: _name,
            voteCount: 0
        }));
        emit CandidateRegistered(_name, candidates.length -1);
    }

    function vote(uint256 _candidateId) public hasNotVoted {
        require(_candidateId < candidates.length, "Invalid candidate ID");
        voters[msg.sender] = Voter({
            hasVoted: true,
            votedCandidateId: _candidateId
        });

        candidates[_candidateId].voteCount += 1;

        emit Voted(msg.sender, _candidateId);
    }

    function getCandidate(uint256 _candidateId) public view returns (string memory name, uint256 voteCount) {
        require(_candidateId < candidates.length, "Invalid candidate ID");
        Candidate storage candidate = candidates[_candidateId];
        return (candidate.name, candidate.voteCount);
    }

    function getAllCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function getWinner() public view returns (string memory winnerName, uint256 winnerVotes) {
        require(candidates.length > 0, "No candidate registered");
        uint256 maxVotes = 0;
        uint256 winnerIndex = 0;

        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].voteCount > maxVotes) {
                maxVotes = candidates[i].voteCount;
                winnerIndex = i;
            }
        }
        return (candidates[winnerIndex].name, candidates[winnerIndex].voteCount);
    }

}
