import React, { Component } from "react";
import InitNewWallet from "./contracts/InitNewWallet.json";
import MultiSig from "./contracts/MultiSig.json";
import getWeb3 from "./utils/getWeb3";


/*
get balance
withdraw(address, amount)

owner1 address
owner1 Requested withdraw: bool
owner1 Requested withdraw at block
owner1 Requested withdraw to

owner2 address
owner2 Requested withdraw: bool
owner2 Requested withdraw at block
owner2 Requested withdraw to
*/

import "./App.css";

class App extends Component {
  state = { 
    storageValue: "", 
    web3: null, 
    accounts: null, 
    contract: null, 
    existingContract: null,
    newWalAd: "", 
    addr1: "", 
    addr2: "",
    exAddr: "",
    existingWalletBal: null,
    owner1: null,
    owner1RequestedWithdraw: null,
    owner1RequestedWithdrawAtBlock: null,
    owner1RequestedWithdrawTo: null,
    owner2: null,
    owner2RequestedWithdraw: null,
    owner2RequestedWithdrawAtBlock: null,
    owner2RequestedWithdrawTo: null,
    loading: false
  };

  componentDidMount = async () => {
    try {

      this.handleChange = this.handleChange.bind(this);
      this.getExInstance = this.getExInstance.bind(this);
      this.handleChang2 = this.handleChange2.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.exAddr = this.exAddr.bind(this);
      this.getDataFromExContract = this.getDataFromExContract.bind(this);
      this.withdrawData = this.withdrawData.bind(this);

      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log(accounts[0]);
      
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = InitNewWallet.networks[networkId];
      const instance = await new web3.eth.Contract(
        InitNewWallet.abi,
        deployedNetwork && deployedNetwork.address,
      );

      console.log(MultiSig.abi);
      
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleChange(e) {
    this.setState({addr1: e.target.value})
  }

  handleChange2(e) {
    this.setState({addr2: e.target.value})
  }

  exAddr(e) {
    this.setState({exAddr: e.target.value})
  }

  withdrawData(e) {
    this.setState({dataWithdrawn: e.target.value})
  }

  getDataFromExContract = async () => {
    const { existingContract, accounts, web3 } = this.state;
    let existingWalletBal;
    let owner1, owner1RequestedWithdraw, owner1RequestedWithdrawAtBlock, owner1RequestedWithdrawTo;
    let owner2, owner2RequestedWithdraw, owner2RequestedWithdrawAtBlock, owner2RequestedWithdrawTo;
    await existingContract.methods.balance.call({from: accounts[0]}).then(res=> existingWalletBal = web3.utils.fromWei(res.toString(), 'ether'));
    await existingContract.methods.owner1.call({from: accounts[0]}).then(res=> owner1 = res);
    await existingContract.methods.owner1RequestedWithdraw.call({from: accounts[0]}).then(res=> owner1RequestedWithdraw = res);
    await existingContract.methods.owner1RequestedWithdrawAtBlock.call({from: accounts[0]}).then(res=> owner1RequestedWithdrawAtBlock = res.toNumber());
    await existingContract.methods.owner1RequestedWithdrawTo.call({from: accounts[0]}).then(res=> owner1RequestedWithdrawTo = res);
    await existingContract.methods.owner2.call({from: accounts[0]}).then(res=> owner2 = res);
    await existingContract.methods.owner2RequestedWithdraw.call({from: accounts[0]}).then(res=> owner2RequestedWithdraw = res);
    await existingContract.methods.owner2RequestedWithdrawAtBlock.call({from: accounts[0]}).then(res=> owner2RequestedWithdrawAtBlock = res.toNumber());
    await existingContract.methods.owner2RequestedWithdrawTo.call({from: accounts[0]}).then(res=> owner2RequestedWithdrawTo = res);    
    this.setState({existingWalletBal: existingWalletBal, owner1: owner1, owner1RequestedWithdraw: owner1RequestedWithdraw, owner1RequestedWithdrawAtBlock: owner1RequestedWithdrawAtBlock, owner1RequestedWithdrawTo: owner1RequestedWithdrawTo, owner2: owner2, owner2RequestedWithdraw: owner2RequestedWithdraw, owner2RequestedWithdrawAtBlock: owner2RequestedWithdrawAtBlock, owner2RequestedWithdrawTo: owner2RequestedWithdrawTo})
  }

  reveal = async () => {
    console.log('reavealing...');
    const { contract } = this.state;
    const newWalAd = await contract.methods.get().call();
    this.setState({newWalAd: newWalAd});
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const {contract, accounts, addr1, addr2} = this.state;
    console.log(contract);
    await contract.methods.initNewWallet(addr1, addr2).send({from: accounts[0]});
    this.setState({addr1: "", addr2: ""})
  }

  getExInstance = async (e) => {
    e.preventDefault();
    console.log('retrieving...');

    // not getting here
    const { web3, exAddr,  } = this.state;
    // Get the contract instance.
    
    const instance = await new web3.eth.Contract(MultiSig.abi, exAddr);

    this.setState({existingContract: instance, exAddr: ""})
    
  }

  // runExample = async () => {
  //   const { accounts, contract } = this.state;

  //   // Stores a given value, 5 by default.
  //   await contract.methods.set(6).send({ from: accounts[0] });

  //   // Get the value from the contract to prove it worked.
  //   const response = await contract.methods.get().call();

  //   // Update state with the result.
  //   this.setState({ storageValue: response });
  // };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Create your own multi-sig wallet.</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Address 1: 
            <input type="text" name="addr1" value={this.state.addr1} onChange={this.handleChange.bind(this)} />
          </label>
          <br />
          <label>
            Address 2: 
            <input type="text" name="addr2" value={this.state.addr2} onChange={this.handleChang2.bind(this)} />
          </label>
          <br />
          <input type="submit" value="Create" />
        </form>
        <br />
       {/* <div>need to display loading bar here during mining</div> */}
       <button onClick={this.reveal}>Reveal New Wallet Address</button>
        <div>{this.state.newWalAd}</div>
        <br />
        <br />
        <br />
        <br />
        <div>
          <h3>Get existing multi-sig wallet</h3>
          <form onSubmit={this.getExInstance}>
          <label>
            At address: 
            <input type="text" name="exAddr" value={this.state.exAddr} onChange={this.exAddr.bind(this)} />
          </label>
          <br />
          <input type="submit" value="Get Instance" />
        </form>
        <input type="submit" value="Get Wallet Details" onClick={this.getDataFromExContract}></input>
        <div>Balance: {this.state.existingWalletBal}</div>
        <div>Owner 1: {this.state.owner1}</div>
        <div>Requested Withdraw (T/F): {this.state.owner1RequestedWithdraw}</div>
        <div>At block: {this.state.owner1RequestedWithdrawAtBlock}</div>
        <div>To: {this.state.owner1RequestedWithdrawTo}</div>
        <div>Owner 2: {this.state.owner2}</div>
        <div>Requested Withdraw (T/F): {this.state.owner2RequestedWithdraw}</div>
        <div>At block: {this.state.owner2RequestedWithdrawAtBlock}</div>
        <div>To: {this.state.owner2RequestedWithdrawTo}</div>
        <form>
          <input type="text" value={this.state.dataWithdrawn} onChange={this.withdrawData.bind(this)}/>
          <input type="submit" value="Request Withdraw" />
        </form>
        
        </div>
      </div>
    );
  }
}

export default App;
