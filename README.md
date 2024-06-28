

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

1. Compile the smart contracts:
    ```
    npx hardhat compile
    ```

2. Deploy the smart contract to a local Hardhat network:
    ```
    npx hardhat node
    ```

3. In a new terminal, run the deployment script:
    ```
    npx hardhat run scripts/deploy.js --network localhost
    ```

4. Note the deployed contract address from the output.

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

### `getFunds() public view returns(uint256)`

Returns the total funds in the supermarket.

### `getName() public view returns(string memory)`

Returns the customer's name.

### `addMoney(address _address, uint256 _amount) public`

Adds money to the specified customer's balance and updates the total funds.

### `buyItem(address _address, uint256 _amount) public`

Buys an item by deducting the specified amount from the customer's balance and the total funds.

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
