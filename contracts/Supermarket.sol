// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Supermarket {
    mapping(address => uint256) public bonusCoins;
    uint256 public discountThreshold = 10; 
    string public customerName = "Vaibhavi Shreya";
    uint256 public newprice ;
    uint256 public funds;
    uint public supercoins;
    mapping(address => uint256) public balances;
    
    function Addmoney(address _customer, uint256 _amount) public {
        balances[_customer] += _amount;
        funds += _amount;
    }
    function BuyItem(address _customer, uint256 _amount) public {
        require(balances[_customer] >= _amount, "Insufficient balance.");
        balances[_customer] -= _amount;
        funds -= _amount;
        if (_amount > 50) {
            bonusCoins[_customer] += 5;
            supercoins=bonusCoins[_customer];
        }

    }
    function checkDiscount(address _customer) public  view  returns(uint256) {
        if (bonusCoins[_customer] >= discountThreshold) {
            return (1);
        } else {
            return (0);
        }
    }
    function DiscountPrice(address _customer,uint _amount)public{
            uint256  discountPercentage = bonusCoins[_customer];
         if (bonusCoins[_customer] >= discountThreshold) {
            uint256 discount = (_amount * discountPercentage) / 100;
            newprice=_amount - discount;

        }
    }
    function getBonusCoins() public view returns (uint256) {
        return supercoins;
    }
  function getDiscountPrice() public view returns (uint256) {
        return newprice;
    }
    function getFunds() public view returns (uint256) {
        return funds;
    }
    function getName() public view returns(string memory) {
        return customerName;
    }

}

