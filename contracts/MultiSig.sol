pragma solidity ^0.5.8;

contract MultiSig {
    
    address public owner1;
    address public owner2;
    bool public owner1RequestedWithdraw = false;
    bool public owner2RequestedWithdraw = false;
    address public owner1RequestedWithdrawTo;
    address public owner2RequestedWithdrawTo;
    uint public owner1RequestedWithdrawAtBlock;
    uint public owner2RequestedWithdrawAtBlock;
    uint public balance;
    
    modifier owner() {
        require(msg.sender == owner1 || msg.sender == owner2);
        _;
    }
    
    constructor(address _owner1, address _owner2) public {
        owner1 = _owner1;
        owner2 = _owner2;
    }
    
    function() external payable {
        balance += msg.value;
    }
    
    function withdraw(uint _amount, address payable _to) public owner {
        require(_amount <= balance);

        if (msg.sender == owner1) {
            owner1RequestedWithdraw = true;
            owner1RequestedWithdrawTo = _to;
            owner1RequestedWithdrawAtBlock = block.number;
        }
        if (msg.sender == owner2) {
            owner2RequestedWithdraw = true;
            owner2RequestedWithdrawTo = _to;
            owner2RequestedWithdrawAtBlock = block.number;
        }
        if (owner1RequestedWithdraw && owner2RequestedWithdraw && 
            owner1RequestedWithdrawTo == owner2RequestedWithdrawTo && 
            owner1RequestedWithdrawAtBlock - owner2RequestedWithdrawAtBlock <= 6171 || 
            owner2RequestedWithdrawAtBlock - owner1RequestedWithdrawAtBlock <= 6171) {
                
            balance -= _amount;
            owner1RequestedWithdraw = false;
            owner1RequestedWithdrawTo = 0x0000000000000000000000000000000000000000;
            owner2RequestedWithdraw = false;
            owner2RequestedWithdrawTo = 0x0000000000000000000000000000000000000000;
            _to.transfer(_amount);
        }
        

    }
    
}