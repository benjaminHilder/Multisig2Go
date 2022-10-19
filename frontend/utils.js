export let provider = new ethers.providers.Web3Provider(window.ethereum)
export let signer

export const MultisigWalletAddress = "0x086534772dbD5AC8bF0Abbe13e64C2Fa67a4063E"
export const CreateMultisigAddress = ""

export const MultisigABI = ["function deposit() public payable",
                            "function createProposal(string memory _title, string memory _description, uint256 _ethAmount, address payable _receiver) public",
                            "function voteOnProposal(uint256 _id, bool _voteValue) public",
                            "function claimProposal(uint _id) public",
                            "function approverName(address) public view returns(string memory)",
                            "function proposalIterator() public view returns(uint)",
                            "function addApprover(address _newApprover) public",
                            "function removeApprover(address _newApprover) public",
                            "function setAccountName(string memory _name) public",
                            "function getAllApprovers() public view returns(address[] memory)",
                            "function getProposalTitle(uint256 _id) public view returns(string memory)",
                            "function getProposalDescription(uint256 _id) public view returns(string memory)",
                            "function getProposalEthAmount(uint256 _id) public view returns(uint256)",
                            "function getProposalReciever(uint256 _id) public view returns(address payable)",
                            "function getProposalApprovals(uint256 _id) public view returns(uint256)",
                            "function getProposalDisapprovals(uint256 _id) public view returns(uint256)",
                            "function getProposalIsActive(uint256 _id) public view returns(bool)",
                            "function getProposalIsClaimed(uint256 _id) public view returns(bool)",
                            "function getProposalFinishedResult(uint256 _id) public view returns(bool)"
                           ]

export const CreateMultisigABI = ["function createMultisig(address[] memory _approvers, uint256 _percentageToAgree) public",
                                  "function getCreateWallets() public returns (address[] memory)",
                                  "function getLastCreatedWallet() public returns (address)",
                                  "function multisigWallets(address, uint256) public returns(address)",
                                  "function createdWalletsCount(address) public returns(uin256)"
                                 ]

export async function connectMetamask() {
    await provider.send("eth_requestAccounts", []);

    signer = await provider.getSigner();

    const network = await provider.getNetwork();
    let chainName = network.name;

    var button = await document.getElementById("connectWalletButton");
    
    if (chainName === "goerli") {
       button.innerHTML = "Goerli Chain ✔️"
    }
    else {
        button.innerHTML = "Incorrect Chain ❌"
    }

    console.log("Account address: ", await signer.getAddress())
    console.log("chain name: " + chainName)
}
