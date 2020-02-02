### Technologies
- React.js
- Truffle (a framework for deploying smart contracts to the Ethereum blockchain)
- Solidity (Ethereum's smart contract language)
- Web3.js (javascript library facilitating connection to the Ethereum blockchain)

### Quick Note
Users can only interact with the application is the have MetaMask installed as a browser extension. If you do not have it installed by want to see how it works, refer to this video I created: link.

#### Why I built this
Cryptocurrency wallets require one thing to validate a transaction, a signature initiated by the private key. 

### How It Works

### Sequence of Events
- Pick which network you want (Ropsten test network or Main ethereum network)

### To create a new smart contract wallet
- Navigate to the 'Create New' tab
- Enter in the two addresses that will control the funds held in the new smart contract
- If the inputs are valid, you will be able to create the new wallet
    - This will transmit a new transaction to the Ethereum blockchain
    - You must wait for the transaction to be validated by a miner on the network
- Once confirmed, you can reveal the new wallet transaction
    - This is the smart contract address where you're funds will be sent to and held
- Copy your new wallet address and navigate 

### To interact with your existing smart contract wallet
- Navigate to 'Load From Address' tab and enter in the wallet address, then click 'Get Instance' to load up the contract
- Click 'Dislay Interface' to see the current state of the smart contract and make a withdrawl
    - You can
        see the two addresses that control the funds,
        see how much ether the wallet holds,
        see if either address has requested a withdrawl,
        request a withdrawl from the contract
- If you want to send money to it using a QR code, navigate to that tab and enter in the address.
