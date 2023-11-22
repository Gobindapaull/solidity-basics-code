// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

interface IERC20 {

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(address indexed owner, address indexed spender, uint256 value);

    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address to, uint256 amount) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

contract Staking  {
    IERC20 public stakingToken;
    IERC20 public rewardToken;

    uint256 public REWARD_RATE = 1;
    uint256 public totalStakedTokens;
    uint256 public rewardPerTokenStored;
    uint256 public lastUpdateTime;

    mapping(address => uint256) public stakedBalance;
    mapping(address => uint256) public rewards;
    mapping(address=>uint) public userRewardPerTokenPaid;

    event Staked(address indexed user, uint256 indexed amount);
    event Withdrawn(address indexed user, uint256 indexed amount);
    event RewardsClaimed(address indexed user, uint256 indexed amount);

    constructor(address _stakingToken, address _rewardToken) {
        stakingToken = IERC20(_stakingToken);
        rewardToken = IERC20(_rewardToken);
    }

    function rewardPerToken() public view returns (uint256) {
        if(totalStakedTokens == 0) {
            return rewardPerTokenStored;
        }
        uint256 totalTime = block.timestamp - (lastUpdateTime);
        uint256 totalRewards = REWARD_RATE * (totalTime);
        return rewardPerTokenStored + (totalRewards * (1e18) / (totalStakedTokens));
    }

    function earned(address account) public view returns (uint256) {
        return stakedBalance[account] * (rewardPerToken() - (userRewardPerTokenPaid[account]))/ (1e18) + (rewards[account]);
    }

    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;
        rewards[account] = earned(account);
        userRewardPerTokenPaid[account] = rewardPerTokenStored;
        _;
    }

    function stake(uint256 amount) external updateReward(msg.sender) {
        require(amount > 0, "should be greater than 0");
        totalStakedTokens = totalStakedTokens+(amount);
        stakedBalance[msg.sender] = stakedBalance[msg.sender]+(amount);
        emit Staked(msg.sender, amount);
        bool success = stakingToken.transferFrom(msg.sender, address(this), amount);
        require(success, "transfer failed");
    }

    function withdrawStakedTokens(uint256 amount) external updateReward(msg.sender) {
        require(amount > 0, "should be greater than 0");
        require(stakedBalance[msg.sender] >= amount, "should be greater than amount");
        totalStakedTokens = totalStakedTokens - (amount);
        stakedBalance[msg.sender] = stakedBalance[msg.sender] - (amount);
        emit Withdrawn(msg.sender, amount);
        bool success = stakingToken.transfer(msg.sender, amount);
        require(success, "withdraw failed");
    }

    function claimReward() external updateReward(msg.sender) {
        uint256 reward = rewards[msg.sender];
        require(reward > 0, "no claim amount found");
        rewards[msg.sender] = 0;
        emit RewardsClaimed(msg.sender, reward);
        bool success = rewardToken.transfer(msg.sender, reward);
        require(success, "claim failed");
    }
}
