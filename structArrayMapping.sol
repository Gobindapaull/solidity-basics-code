// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.7;

contract Mapping {
    
    struct Order {
         string name;
         uint buy;
         uint sell;
    }

    mapping (uint => Order) public OrderMapping;

    Order[] internal OrderArray;

    function createOrder(uint index, string memory _name, uint _buy, uint _sell) external {
        Order memory newOrder = Order( _name, _buy, _sell);
        OrderMapping[index] = newOrder;
        OrderArray.push(newOrder);

    }

  function getAllArray() external view returns(Order[] memory) { 
        return OrderArray;
    }

}
