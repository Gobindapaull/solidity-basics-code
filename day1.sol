
                                  // Day 1

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract FirstContract {
    string public GM = "Good Morning";
}

// contract address = 0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8

                                // Day 2

contract SimpleStorage {
    uint storeData = 5;

    function setStoreData(uint x) public {
        storeData = x;
    }
    function getStoreData() public view returns(uint) {
        return storeData;
    }
}

// contract address = 0xD7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B

contract MyPoem {
    string poem = "work daily 12 hours";
    string poet = "Paul";

    function getDetails() public view returns(string memory, string memory) {
        return (poem, poet);
    }
}

// contract address = 0xDA0bab807633f07f013f94DD0E6A4F96F8742B53

                    // Day 3


contract DataTypes {
    string public hello = "hello world";
    uint public number;
    uint public num1;
    int public num2;
    int public minnum2 = type(int).min;
    uint public minnum1 = type(uint).min;
    int public maxnum2 = type(int).max;
    uint public maxnum1 = type(uint).max;
    bool public isPaused;
    address public myAddress = msg.sender;
    bytes public value;
    mapping( address => uint ) public balance;
    string[] public Arrays;

            // add name
    function pushNames(string memory _name) public {
        Arrays.push(_name);
    }
            // delete name
    function popName() public {
        Arrays.pop();
    }

    // function encode() public view returns(bytes memory) {
    //     bytes memory encode = abi.encode("Hello");
    //     value = encode;
    // }
      

      // add by 1
    function increment() public {
        number++;
    }

    // delete by 1
    function decrement() public {
        number--;
    }

    // change boolean to true or false

    function changeBoolean(bool _trueORfalse) public {
        isPaused = _trueORfalse;
    } 

        // add Balance
    function addToBalance(address _addr, uint _amount) public {
        balance[_addr] += _amount;
    } 

    // Read Balance 
    function readBalance(address _addr) public view returns(uint) {
        return balance[_addr];
    }

}


// contract address = 0x9D7f74d0C41E726EC95884E0e97Fa6129e3b5E99
