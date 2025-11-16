   const feeData = await provider.getFeeData();
    // Dynamic gas: 2×
    const maxPriority = feeData.maxPriorityFeePerGas * 2n;
    const maxFee = feeData.maxFeePerGas * 2n;

    const tx = await token.transfer(recipient, balance, {
        gasLimit: 100000,
        maxFeePerGas: maxPriority,
        maxPriorityFeePerGas: maxFee
    });
