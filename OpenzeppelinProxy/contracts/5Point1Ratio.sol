// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract FivePointOneRatio is Initializable, ERC20Upgradeable, OwnableUpgradeable {
    uint256 private constant TOTAL_SUPPLY = 9_000_000 * 1e18;

    address public treasury;
    address public liquidity;
    address public devWallet;
    address public founder;

    uint256 public constant TAX_PERCENT = 55; // 5.5% (in tenths of a percent)
    mapping(address => bool) public isTaxExempt;

    event TaxApplied(address from, address to, uint256 amount);

    function initialize(
        address _treasury,
        address _liquidity,
        address _devWallet,
        address _founder,
        address _owner
    ) public initializer {
        __ERC20_init("5Point1Ratio", "$RATIO");
        __Ownable_init(_owner);

        treasury = _treasury;
        liquidity = _liquidity;
        devWallet = _devWallet;
        founder = _founder;

        _mint(_owner, TOTAL_SUPPLY);

        isTaxExempt[_owner] = true;
        isTaxExempt[treasury] = true;
        isTaxExempt[liquidity] = true;
        isTaxExempt[devWallet] = true;
        isTaxExempt[founder] = true;

        _transferOwnership(_owner);
    }

    function setTaxExempt(address account, bool exempt) external onlyOwner {
        isTaxExempt[account] = exempt;
    }

    function transfer(address recipient, uint256 amount) public override returns (bool) {
        _customTransfer(_msgSender(), recipient, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public override returns (bool) {
        _spendAllowance(sender, _msgSender(), amount);
        _customTransfer(sender, recipient, amount);
        return true;
    }

    function _customTransfer(address from, address to, uint256 amount) internal {
        if (isTaxExempt[from] || isTaxExempt[to]) {
            _transfer(from, to, amount);
            return;
        }

        uint256 taxAmount = (amount * TAX_PERCENT) / 1000;
        uint256 remaining = amount - taxAmount;

        uint256 stakingPortion = (taxAmount * 200) / 550;
        uint256 treasuryPortion = (taxAmount * 100) / 550;
        uint256 liquidityPortion = (taxAmount * 100) / 550;
        uint256 devPortion = (taxAmount * 100) / 550;
        uint256 founderPortion = taxAmount - (stakingPortion + treasuryPortion + liquidityPortion + devPortion);

        _transfer(from, treasury, treasuryPortion);
        _transfer(from, liquidity, liquidityPortion);
        _transfer(from, devWallet, devPortion);
        _transfer(from, founder, founderPortion);
        // stakingPortion is unallocated for now

        _transfer(from, to, remaining);

        emit TaxApplied(from, to, taxAmount);
    }
}
