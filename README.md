

# Supermarket DApp

This project is a decentralized application (DApp) for managing a virtual supermarket on the Ethereum blockchain. Customers can add money to their account, buy items, and keep track of their transactions. The project includes a smart contract written in Solidity and a frontend developed with React.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js and npm installed
- MetaMask extension installed in your browser
- An Ethereum wallet with test ETH (Rinkeby, Ropsten, or any test network)

## Installation

1. Clone the repository

2. Install the dependencies:
    ```
    npm i
    ```

## Deployment

1. Deploy the smart contract to a local Hardhat network:
    ```
    npx hardhat node
    ```

2. In a new terminal, run the deployment script:
    ```
    npx hardhat run scripts/deploy.js --network localhost
    ```

3. Note the deployed contract address from the output.

## Frontend Setup



1. Start the development server:
    ```
    npm run dev
    ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Usage

1. Connect your MetaMask wallet to the application.
2. Use the provided interface to:
    - Add money to your account
    - Buy items using your balance
    - View your transaction history

## Contract Methods

### Addmoney

```solidity
function Addmoney(address _customer, uint256 _amount) public
```

- Adds funds to the customer's balance.
- Updates the total funds available in the contract.

**Parameters:**
- `_customer`: The address of the customer.
- `_amount`: The amount to add to the customer's balance.

### BuyItem

```solidity
function BuyItem(address _customer, uint256 _amount) public
```

- Allows a customer to buy an item if they have sufficient balance.
- Deducts the item's price from the customer's balance.
- Reduces the total funds in the contract.
- Awards bonus coins if the spent amount is greater than 50.

**Parameters:**
- `_customer`: The address of the customer.
- `_amount`: The price of the item being purchased.

### checkDiscount

```solidity
function checkDiscount(address _customer) public view returns(uint256)
```

- Checks if the customer is eligible for a discount.
- Returns `1` if eligible, otherwise returns `0`.

**Parameters:**
- `_customer`: The address of the customer.

**Returns:**
- `uint256`: `1` if eligible for a discount, `0` otherwise.

### DiscountPrice

```solidity
function DiscountPrice(address _customer, uint _amount) public
```

- Calculates the discounted price of an item based on the customer's bonus coins.
- Updates the `newprice` with the discounted amount.

**Parameters:**
- `_customer`: The address of the customer.
- `_amount`: The original price of the item.

### getBonusCoins

```solidity
function getBonusCoins() public view returns (uint256)
```

- Returns the bonus coins of the customer after the last purchase.

**Returns:**
- `uint256`: The number of bonus coins.

### getDiscountPrice

```solidity
function getDiscountPrice() public view returns (uint256)
```

- Returns the discounted price of an item after applying the discount.

**Returns:**
- `uint256`: The discounted price.

### getFunds

```solidity
function getFunds() public view returns (uint256)
```

- Returns the total funds available in the supermarket contract.

**Returns:**
- `uint256`: The total funds.

### getName

```solidity
function getName() public view returns(string memory)
```

- Returns the stored customer name.

**Returns:**
- `string`: The customer's name.

## Usage

1. **Add Money:** Use the `Addmoney` function to deposit funds into a customer's account.
2. **Buy Item:** Use the `BuyItem` function to purchase an item. If the amount spent is greater than 50, the customer earns 5 bonus coins.
3. **Check Discount:** Use the `checkDiscount` function to see if the customer qualifies for a discount.
4. **Calculate Discounted Price:** Use the `DiscountPrice` function to calculate the price after applying the discount.
5. **Retrieve Details:** Use the `getBonusCoins`, `getDiscountPrice`, `getFunds`, and `getName` functions to retrieve the respective details.



## Help

### Common Issues
- **Compilation Errors:** Ensure the Solidity version specified matches the version set in the Hardhat compiler.
- **Deployment Errors:** Make sure the selected network is correct and the contract is compiled without errors.
- **Interaction Errors:** Ensure the address and value inputs are valid and that sufficient balance exists for buying items.

For detailed debugging and assistance, refer to the Hardhat documentation or community forums.

## Authors
  [Vaibhavi Sherya]

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
