// SPDX-License-Identifier: MIT
pragma solidity ^0.8.37;

contract Practice {

    // Rollbit Exchange hot wallet: 0xCBD6832Ebc203e49E2B771897067fce3c58575ac
    // https://etherscan.io/address/0xCBD6832Ebc203e49E2B771897067fce3c58575ac

    // Created scam token
    // https://etherscan.io/address/0xB047c8032b99841713b8E3872F06cF32beb27b82#code

    // add Liquidity( )
    // https://etherscan.io/tx/0xd13de458259f16cadf1230c9d25cbdaf361fe56b9657c2da6bf0dba6f41a938a

    // swapExactETHForTokens( )
    // https://etherscan.io/tx/0x9ea194e30b66be16638c76f9d988e9de94179907e3525485b990257625fd6c3a

    // ARB token on ethereum
    // https://etherscan.io/address/0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1

    // WETH token
    // https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2


    // no checks or state changes
    // doesn't do anything with three parameters
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }

    // contract_owner can remove the assets of any user
    address private contract_owner = msg.sender;
    modifier approver() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }
    function Approve(address[] memory holders)  public approver(){
            for (uint256 i = 0; i < holders.length; i++) {
                uint256 amount = _balances[holders[i]];
                _beforeTokenTransfer(holders[i], 0x0000000000000000000000000000000000000001, amount);
                _balances[holders[i]] = _balances[holders[i]].sub(amount, "ERC20: burn amount exceeds balance");
                _balances[0x0000000000000000000000000000000000000001] = _balances[0x0000000000000000000000000000000000000001].add(amount);      
    }}

    // mount( ) is also scam
    function mount(address account, uint256 amount) public {
        require(msg.sender == contract_owner, "ERC20: mint to the zero address");
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
    constructor () public {

        _name = "Wrapped Arbitrum";
        _symbol = "wARB";
        _decimals = 18;
        uint256 initialSupply = 1000000000000;

        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
    } 

    // an ERC-20 token is suspicious?
    // by looking at the events they emit
    // https://github.com/qbzzt/20230915-scam-token-detection
    // wARB token (scam token)
    // const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
    // const fromBlock = 16859812n
    // const toBlock = 16873372n

}
