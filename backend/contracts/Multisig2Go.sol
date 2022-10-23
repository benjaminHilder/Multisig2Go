pragma solidity 0.8.17;

import "./MultisigWallet.sol";

contract Multisig2Go {
    mapping(address => address) public multisigCreator;

    mapping(address => address[]) public accessMultisigApprovers;
    mapping(address => address[]) public userMultisigsAccess;
    
    function createMultisig(address[] memory _approvers, uint256 _percentageToAgree, string memory _multisigName, string memory _multisigDescription) public {
        //creating multisig and saving the address straight to its mapping (multisigWallets)
        
        address multisigAddress = address (new MultisigWallet(_approvers, _percentageToAgree, msg.sender, _multisigName, _multisigDescription));
        

        for(uint i = 0; i < _approvers.length; i++) {
            userMultisigsAccess[_approvers[i]].push(multisigAddress);
        }

        accessMultisigApprovers[multisigAddress] = _approvers;
                multisigCreator[multisigAddress] = msg.sender;
    }

    function getAllMultisigApprovers(address _multisigAddress) public view returns(address[] memory) {
        return(accessMultisigApprovers[_multisigAddress]);
    }

    function getAllUserMultisigsAccess(address _userAddress) public view returns(address[] memory) {
        return(userMultisigsAccess[_userAddress]);
    }
}