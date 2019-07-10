import React, { Component } from "react";
import MultiSig from "../contracts/MultiSig.json";
import getWeb3 from "../utils/getWeb3";
import "../styles/loadExisting.css";

class App extends Component {
  state = { 
    web3: null, 
    accounts: null, 
    exContractInstance: null,
    exContractAddress: "",
    exWalletBalance: null,
    owner1: null,
    owner1RequestedWithdraw: null,
    owner1RequestedWithdrawAtBlock: null,
    owner1RequestedWithdrawTo: null,
    owner2: null,
    owner2RequestedWithdraw: null,
    owner2RequestedWithdrawAtBlock: null,
    owner2RequestedWithdrawTo: null,
    withdrawAmount: "",
    withdrawTo: "",
    loading: false,
    disabled: true,
    qrCode: null,
  };

  componentDidMount = async () => {
    try {

      this.exContractAddressInput = this.exContractAddressInput.bind(this);
      this.withdrawAmountInput = this.withdrawAmountInput.bind(this);
      this.withdrawToInput = this.withdrawToInput.bind(this);

      this.getExContractInstance = this.getExContractInstance.bind(this);
      this.popDataFromExContract = this.popDataFromExContract.bind(this);
      this.submitWithdraw = this.submitWithdraw.bind(this);

      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      this.setState({ web3, accounts });
      
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  exContractAddressInput(e) {
    this.setState({exContractAddress: e.target.value})
  }

  withdrawAmountInput(e) {
    this.setState({withdrawAmount: e.target.value})
  }

  withdrawToInput(e) {
    this.setState({withdrawTo: e.target.value})
  }

  fillAdr = async (e) => {
    e.preventDefault();
    const { web3 } = this.state;
    const accounts = await web3.eth.getAccounts();
    this.setState({withdrawTo: accounts[0]})
  }

  getExContractInstance = async (e) => {
    e.preventDefault();
    const { web3, exContractAddress } = this.state;
    const instance = await new web3.eth.Contract(MultiSig.abi, exContractAddress);
    this.setState({exContractInstance: instance, exContractAddress: "", disabled: false })
  }

  popDataFromExContract = async () => {
    const { exContractInstance, web3 } = this.state;
    const accounts = await web3.eth.getAccounts();
    let exWalletBalance;
    let owner1, owner1RequestedWithdraw, owner1RequestedWithdrawAtBlock, owner1RequestedWithdrawTo;
    let owner2, owner2RequestedWithdraw, owner2RequestedWithdrawAtBlock, owner2RequestedWithdrawTo;
    await exContractInstance.methods.balance.call({from: accounts[0]}).then(res=> exWalletBalance = web3.utils.fromWei(res.toString(), 'ether'));
    await exContractInstance.methods.owner1.call({from: accounts[0]}).then(res=> owner1 = res);
    await exContractInstance.methods.owner1RequestedWithdraw.call({from: accounts[0]}).then(res=> owner1RequestedWithdraw = res.toString());
    await exContractInstance.methods.owner1RequestedWithdrawAtBlock.call({from: accounts[0]}).then(res=> owner1RequestedWithdrawAtBlock = res.toNumber());
    await exContractInstance.methods.owner1RequestedWithdrawTo.call({from: accounts[0]}).then(res=> owner1RequestedWithdrawTo = res);
    await exContractInstance.methods.owner2.call({from: accounts[0]}).then(res=> owner2 = res);
    await exContractInstance.methods.owner2RequestedWithdraw.call({from: accounts[0]}).then(res=> owner2RequestedWithdraw = res.toString());
    await exContractInstance.methods.owner2RequestedWithdrawAtBlock.call({from: accounts[0]}).then(res=> owner2RequestedWithdrawAtBlock = res.toNumber());
    await exContractInstance.methods.owner2RequestedWithdrawTo.call({from: accounts[0]}).then(res=> owner2RequestedWithdrawTo = res);  
    this.setState({exWalletBalance: exWalletBalance, owner1: owner1, owner1RequestedWithdraw: owner1RequestedWithdraw, owner1RequestedWithdrawAtBlock: owner1RequestedWithdrawAtBlock, owner1RequestedWithdrawTo: owner1RequestedWithdrawTo, owner2: owner2, owner2RequestedWithdraw: owner2RequestedWithdraw, owner2RequestedWithdrawAtBlock: owner2RequestedWithdrawAtBlock, owner2RequestedWithdrawTo: owner2RequestedWithdrawTo})
  }

  submitWithdraw = async (e) => {
    e.preventDefault();
    const {exContractInstance, web3, withdrawAmount, withdrawTo } = this.state;
    const accounts = await web3.eth.getAccounts();
    const inWei = web3.utils.toWei(withdrawAmount, 'ether');
    await exContractInstance.methods.withdraw(inWei, withdrawTo).send({from: accounts[0]});
    this.setState({withdrawAmount: "", withdrawTo: ""})
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h3>Get existing multi-sig wallet</h3>
        <form onSubmit={this.getExContractInstance}>
          <input placeholder="At Address..." className="form" type="text" name="exContractAddress" value={this.state.exContractAddress} onChange={this.exContractAddressInput.bind(this)} />
          <br/>
          <input className="form btn" type="submit" value="Get Instance" />
        </form>
        {this.state.owner1 ? <input className="form btn" type="submit" value="Refresh Interface" onClick={this.popDataFromExContract}></input> : <input className="form btn" type="submit" value="Display Interface" onClick={this.popDataFromExContract} disabled={this.state.disabled}></input>}
        {this.state.owner1 ?
        <table>
          <thead>
            <th colSpan="2">Owner One</th>
          </thead>
          <tr className="one">
            <td className="table-left">Address</td>
            <td className="data table-right">{this.state.owner1}</td>
          </tr>
          <tr className="">
            <td className="table-left">Has open withdraw</td>
            <td className="data table-right">{this.state.owner1RequestedWithdraw}</td>
          </tr>
          <tr className="one">
            <td className="table-left">Withdraw requested at block</td>
            <td className="data table-right">{this.state.owner1RequestedWithdrawAtBlock}</td>
          </tr>
          <tr className="">
            <td className="table-left">Requested withdraw to</td>
            <td className="data table-right">{this.state.owner1RequestedWithdrawTo}</td>
          </tr>
            <th colSpan="2">Owner Two</th>
          <tr className="one">
            <td className="table-left">Address</td>
            <td className="data table-right">{this.state.owner2}</td>
          </tr>
          <tr>
            <td className="table-left">Has open withdraw</td>
            <td className="data table-right">{this.state.owner2RequestedWithdraw}</td>
          </tr>
          <tr className="one">
            <td className="table-left">Withdraw requested at block</td>
            <td className="data table-right">{this.state.owner2RequestedWithdrawAtBlock}</td>
          </tr>
          <tr>
            <td className="table-left">Requested withdraw to</td>
            <td className="data table-right">{this.state.owner2RequestedWithdrawTo}</td>
          </tr>
          <tr className="one">
            <td className="table-left">Balance</td>
            <td className="data table-right">{this.state.exWalletBalance} ether</td>
          </tr>
        </table> 
        : <span></span>}
        {this.state.owner1 ?
          <form className="withdraw-form">
          <h5>Submit Withdraw Request</h5>
          <input className="w-form-1" type="number" min={0} placeholder="Ether..." value={this.state.withdrawAmount} onChange={this.withdrawAmountInput.bind(this)}/>
          <br/>
          <input className="w-form-2" type="text"  placeholder="To..." value={this.state.withdrawTo} onChange={this.withdrawToInput.bind(this)}/>
          <input className="fillInAddrBtn" type="submit" value="Auto Fill" onClick={this.fillAdr} />
          <br/>
          <input className="w-form-1 w-btn" type="submit" value="Request Withdraw" onClick={this.submitWithdraw} />
        </form> : <span></span>}
        </div>
    );
  }
}

export default App;


// what happens if:
/* 
- the second person requests more than the balance
- the second person requests withdraw to a different address
- 
*/