pragma solidity 0.8.17;

import "./MultisigWallet.sol";

contract CreateMultisigWallet {
    mapping(address => mapping(uint256 => address)) public multisigWallets; //User address created wallets
    mapping(address => uint256) public createdWalletsCount;

    function createMultisig(address[] memory _approvers, uint256 _percentageToAgree) public {
        //creating multisig and saving the address straight to its mapping (multisigWallets)
        multisigWallets[msg.sender][createdWalletsCount[msg.sender]] = address (new MultisigWallet(_approvers, _percentageToAgree));
        createdWalletsCount[msg.sender]++;
    }

    function getCreateWallets() public returns (address[] memory) {
        address[] memory wallets;
        uint256 walletCount = createdWalletsCount[msg.sender];

        for(uint i = 0; i < walletCount; i++) {
            wallets[i] = multisigWallets[msg.sender][i];
        }

        return wallets;
    }

    function getLastCreatedWallet() public returns (address) {
        return multisigWallets[msg.sender][createdWalletsCount[msg.sender]];
    }
}