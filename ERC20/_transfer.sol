    uint256 public maxTransfer = 1000;
    uint256 public maxWallet = 1000;
    
    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(from, to, amount);

        uint256 fromBalance = _balances[from];
        require(fromBalance >= amount, "ERC20: transfer amount exceeds balance");

        require(amount <= maxTransfer, "transfer amount have to low");
        require(amount + balanceOf(to) <= maxWallet, "wallet amount exceeds");

    unchecked {
        _balances[from] = fromBalance - amount;
        _balances[to] += amount;
    }

        emit Transfer(from, to, amount);

        _afterTokenTransfer(from, to, amount);
    }
