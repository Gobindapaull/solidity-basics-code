    function handleTax(address from, address to, uint256 amount) internal returns (uint256){

        if(balanceOf(address(this)) >= swapTokensAtAmt && !isAMMPair[from] && lastSwapBackBlock + 2 <= block.number) {
            convertTaxes();
        }
        
        uint128 tax = 0;

        Taxes memory taxes;

        if (isAMMPair[to]){
            taxes = sellTax;
        } else if(isAMMPair[from]){
            taxes = buyTax;
        }
        
        if(taxes.totalTax > 0){
            TokensForTax memory tokensForTaxUpdate = tokensForTax;
            if(launchBlock == block.number){
                if (isAMMPair[from] || isAMMPair[to]){
                    tax = uint128(amount * launchTax / FEE_DIVISOR);
                }
            } else if(block.number == launchBlock + 1 || block.number == launchBlock + 2){
                if (isAMMPair[from] || isAMMPair[to]){
                    tax = uint128(amount * 4000 / FEE_DIVISOR);
                }
            } else {
                tax = uint128(amount * taxes.totalTax / FEE_DIVISOR);
            }
            tokensForTaxUpdate.tokensForLiquidity += uint80(tax * taxes.liquidityTax / taxes.totalTax / 1e9);
            tokensForTaxUpdate.tokensForMarketing += uint80(tax * taxes.marketingTax / taxes.totalTax / 1e9);
            tokensForTaxUpdate.tokensForDev += uint80(tax * taxes.devTax / taxes.totalTax / 1e9);
            tokensForTax = tokensForTaxUpdate;
            super._transfer(from, address(this), tax);
        }
        
        return tax;
    }
