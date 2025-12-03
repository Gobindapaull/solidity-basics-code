// SPDX-License-Identifier: GPL-3.0
        
pragma solidity >=0.4.22 <0.9.0;

// This import is automatically injected by Remix
import "remix_tests.sol"; 
import "remix_accounts.sol";
import "../contracts/Voting.sol";


contract VotingTest {
    Voting votingTest;

    function beforeEach() public {
        votingTest = new Voting();
        votingTest.vote(0);
        votingTest.vote(1);
        votingTest.vote(1);
        votingTest.vote(2);
    }

    function _containsByte(string memory s, bytes1 c) internal pure returns (bool) {
        bytes memory byteS = bytes(s);
        for (uint i = 0; i < byteS.length; i++) {
            if (byteS[i] == c) {
                return true;
            }
        }
        return false;
    }

    function test_total() public {
        uint expected = 4;
        uint actual = votingTest.total();
        Assert.equal(actual, expected, "total votes mismatch");
    }

    function test_getCandidates() public {
        string memory actual = votingTest.getCandidates();
        Assert.ok(_containsByte(actual, "0"), "0 expected");
        Assert.ok(_containsByte(actual, "2"), "2 expected");
    }

    function test_shouldAnnounceWinner() public {
        (uint acutalWinner, uint acutalVotes) = votingTest.announceWinner();
        Assert.equal(acutalWinner, 1, "Incorrect winner");
        Assert.equal(acutalVotes, 2, "Incorrect winner");
    }

    function test_shouldNotAnnounceWinner() public {
        votingTest = new Voting();
        (bool success, ) = address(votingTest).call(abi.encodeWithSignature("announceWinner()"));
        Assert.equal(success, false, "Invalid candidate ID");
    }

    function test_shouldVote() public {
        votingTest.vote(1);
        (, uint votes) = votingTest.announceWinner();
        Assert.equal(votes, 3, "Vote function failed");
    }

    function test_shouldNotVote() public {
        (bool success, ) = address(votingTest).call(abi.encodeWithSignature("vote(uint8)", 9));
        Assert.equal(success, false, "Invalid candidate ID");
    }
}
    
