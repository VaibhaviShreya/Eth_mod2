// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


contract Supermarket {
    uint256 public Funds;
    string public customerName = "Vaibhavi Shreya";
    mapping(address => uint256) public balances;
    uint256 previousFunds = Funds;

    function getFunds()public view returns(uint256) {
        return Funds;
    }
    function getName() public view returns(string memory) {
        return customerName;
    }

   

    function Addmoney(address _address, uint256 _amount) public {
        balances[_address] += _amount;
        Funds += _amount;
        assert(Funds == previousFunds + _amount);
    }

    function BuyItem(address _address, uint256 _amount ) public {
        balances[_address] -= _amount;
        Funds -= _amount;
        assert(Funds == previousFunds - _amount);
    }

  

   
}
