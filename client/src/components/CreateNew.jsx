import React, { Component } from "react";
import InitNewWallet from "../contracts/InitNewWallet.json";
import getWeb3 from "../utils/getWeb3";
import "../styles/app.css";

class CreateNew extends Component {
  state = { 
    storageValue: "", 
    web3: null, 
    accounts: null, 
    contract: null, 
    newWalAd: "", 
    addr1: "", 
    addr2: "",
    loading: false,
    disabled: false,
    qrCode: null,
  };

  componentDidMount = async () => {
    try {

      this.handleChange = this.handleChange.bind(this);
      this.handleChang2 = this.handleChange2.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = InitNewWallet.networks[networkId];
      const instance = await new web3.eth.Contract(
        InitNewWallet.abi,
        deployedNetwork && deployedNetwork.address,
      );
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
    const { contract } = this.state;
    const newWalAd = await contract.methods.get().call();
    this.setState({newWalAd: newWalAd});
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({loading: true});
    const {contract, web3, addr1, addr2 } = this.state;
    const accounts = await web3.eth.getAccounts();
    await contract.methods.initNewWallet(addr1, addr2).send({from: accounts[0]});
    // not getting here
    this.setState({addr1: "", addr2: "", loading: false});
    
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h3>Create your own multi-sig wallet.</h3>
        <form onSubmit={this.handleSubmit}>
            <input className="form" type="text" name="addr1" placeholder="Address 1..." value={this.state.addr1} onChange={this.handleChange.bind(this)} />
            <br />
            <input className="form" type="text" name="addr2" placeholder="Address 2..." value={this.state.addr2} onChange={this.handleChang2.bind(this)} />
            <br />
          <input className="form btn" type="submit" value="Create" disabled={this.state.disabled} />
        </form>
        <br />
       {this.state.loading ? 
          <div>Pending...</div> :
          <div></div>
        }
       <button className="form btn reveal-btn" onClick={this.reveal}>Reveal New Wallet Address</button>
        <div>{this.state.newWalAd}</div>
        <br />
        {this.state.newWalAd ? <img src={`https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${this.state.newWalAd}&choe=UTF-8`} alt=""/> : <span></span>}
        <br />
      </div>
    );
  }
}

export default CreateNew;


// what happens if:
/* 
- the second person requests more than the balance
- the second person requests withdraw to a different address
- 
*/