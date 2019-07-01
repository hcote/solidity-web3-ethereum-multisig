import React, { Component } from "react";
import InitNewWallet from "./contracts/InitNewWallet.json";
import getWeb3 from "./utils/getWeb3";

import "./App.css";

class App extends Component {
  state = { 
    storageValue: "", 
    web3: null, 
    accounts: null, 
    contract: null, 
    newWalAd: "", 
    addr1: "", 
    addr2: "",
    loading: false
  };

  componentDidMount = async () => {
    try {

      this.handleChange = this.handleChange.bind(this);
      this.handleChang2 = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

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

      console.log(deployedNetwork.address);
      
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

  reveal = async () => {
    console.log('reavealing...');
    const { contract } = this.state;
    console.log(contract.methods);
    
    const newWalAd = await contract.methods.get().call();
    console.log(newWalAd);
    this.setState({newWalAd: newWalAd});
  }

  async handleSubmit(e) {
    e.preventDefault();
    const {contract, accounts, addr1, addr2} = this.state;
    await contract.methods.InitNewWallet(addr1, addr2).send({from: accounts[0]});
    
    this.state.loading = true;
    
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
            <input type="text" name="addr2" value={this.state.addr2} onChange={this.handleChange2.bind(this)} />
          </label>
          <br />
          <input type="submit" value="Create" />
        </form>
        <br />
       <div>{this.state.loading}</div>
       <button onClick={this.reveal}>Reveal New Wallet Address</button>
        <div>New multi-sig wallet address: {this.state.newWalAd}</div>
      </div>
    );
  }
}

export default App;
