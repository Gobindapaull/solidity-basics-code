// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract IDO is Ownable{
    using SafeMath for uint;
    IERC20 public token;

    uint public price;
    uint public tokenSold;

    event TokenPurchase(address buyer, uint price, uint tokenQty);

    address payable public seller;

    constructor(IERC20 _tokenAddress, uint _price) {
        token = _tokenAddress;
        price = _price;
        seller = payable(_msgSender());
    }
    
    receive() external payable {
        buy();
    }

    function tokenForSale() public view returns (uint) {
        return token.allowance(seller, address(this));
    }

    function buy() public payable returns (bool) {
        require(_msgSender() != address(0), "zero address");
        uint _tokenQty = msg.value.mul(price);
        require(_tokenQty <= tokenForSale(), "buy less");
        seller.transfer(address(this).balance);
        token.transferFrom(seller, _msgSender(), _tokenQty);
        tokenSold += _tokenQty;
        emit TokenPurchase(_msgSender(), price, _tokenQty);
        return true;
    }

    function setPrice(uint newPrice) public onlyOwner {
        price = newPrice;
    }

    function newSeller(address payable _newSeller) public onlyOwner {
        seller = payable(_newSeller);
    }

    function withdrawToken(IERC20 _token) public onlyOwner {
        uint tokenBalance = _token.balanceOf(address(this));
        _token.transfer(seller, tokenBalance);
    }

    function withdraw() public onlyOwner {
        seller.transfer(address(this).balance);
    }
}
