### Technologies
- React.js
- Truffle (a framework for deploying smart contracts to the Ethereum blockchain)
- Solidity (Ethereum's smart contract language)
- Web3.js (javascript library facilitating connection to the Ethereum blockchain)

### Quick Note
Users can only interact with the application if they have MetaMask installed as a browser extension. If you do not have it installed by want to see how it works, refer to this video I created: link.

### Why I built this
Cryptocurrency (Ethereum, in this case) can only be spent if the transaction broadcast to the network is accompanied by a signature. This signature is generated by the 64-bit private key corresponding to the public address that initiates the transaction. If the private key to your addreess is exposed, whoever has it can subsequently spend the funds held by that address, and they are stolen/lost forever. This project aims to eliminate this security risk. By holding funds in an instance of smart contract, if the private key to one of the controlling addresses is compromised, the funds are still safe. 

The wallet you create with my application is more secure than a standard address because it requires two address signatures to transfer funds. It still serves the same purpose, which is to hold ether funds. 

### How It Works
- Two addresses will have ownership of each new contract that is created.
- Funds can easily be deposited to the contract by sending them to the contract address.
- If one address sends a transaction to the smart contract requesting a withdrawl of funds to a specific address, nothing happens.
- Only when the second address sends the same withdrawl request to the same withdrawl address, are the funds released.

### Sequence of Events
- Pick which network you want (Ropsten test network or Main ethereum network)

#### To create a new smart contract wallet
- Navigate to the 'Create New' tab
- Enter in the two addresses that will control the funds held in the new smart contract
- If the inputs are valid, you will be able to create the new wallet
    - This will transmit a new transaction to the Ethereum blockchain
    - You must wait for the transaction to be validated by a miner on the network
- Once confirmed, you can reveal the new wallet transaction
    - This is the smart contract address where you're funds will be sent to and held
- Copy your new wallet address and navigate 

#### To interact with your existing smart contract wallet
- Navigate to 'Load From Address' tab and enter in the wallet address, then click 'Get Instance' to load up the contract
- Click 'Dislay Interface' to see the current state of the smart contract and make a withdrawl
    - You can
        see the two addresses that control the funds,
        see how much ether the wallet holds,
        see if either address has requested a withdrawl,
        request a withdrawl from the contract
- If you want to send money to it using a QR code, navigate to that tab and enter in the address.
