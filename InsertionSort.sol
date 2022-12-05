// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract InsertionSortContract {
    function InsertionSort(uint[] memory a) external pure returns (uint[] memory) {
        for (uint i = 1; i < a.length; i++){
            uint temp = a[i];
            uint j = i;
            while((j >= 1) && (temp < a[j-1])) {
                a[j] = a[j-1];
                j--;
            }
            a[j] = temp;
        }
        return a;
    }
}

// [9, 2, 7, 1, 6, 5, 3, 4]

// 1,2,3,4,5,6,7,9
