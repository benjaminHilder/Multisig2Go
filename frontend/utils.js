export let provider = new ethers.providers.Web3Provider(window.ethereum)
export let signer

export const Multisig2GoAddress = "0x860bcEd33872a383944E66dAbE7776DF8Ab414CD"

export const MultisigABI = ["function deposit() public payable",
                            "function createProposal(string memory _title, string memory _description, uint256 _ethAmount, address payable _receiver) public",
                            "function voteOnProposal(uint256 _id, bool _voteValue) public",
                            "function claimProposal(uint _id) public",
                            "function approverName(address) public view returns(string memory)",
                            "function proposalIterator() public view returns(uint)",
                            "function addApprover(address _newApprover) public",
                            "function removeApprover(address _newApprover) public",
                            "function multisigName() public view returns (string)",
                            "function multisigDescription() public view returns (string)",
                            "function setMultisigName(string memory _multisigName) public",
                            "function setMultisigDescription(string memory _multisigDescription) public",
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

export const Multisig2GoABI = ["function createMultisig(address[] memory _approvers, uint256 _percentageToAgree) public",
                               "function getAllMultisigApprovers(address _multisigAddress) public view returns(address[] memory)",
                               "function getAllUserMultisigsAccess(address _userAddress) public view returns(address[] memory)",
                               "function multisigCreator(address) public view returns(address)",
                               "function accessMultisigApprovers(address, uint256) public view returns(address[])",
                               "function userMultisigsAccess(address, uint256) public view returns(address[])",
                               "function getAllMultisigAddresses() public view returns (address[] memory)"
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

export async function changeSelectedMultisig(multisigContract) {
    if (sessionStorage.getItem("multisigAddress") != null) {
        let address = sessionStorage.getItem("multisigAddress")
        const multisigContract = new ethers.Contract(address, MultisigABI, provider)
    
        document.getElementById("selectedMultisigLink").textContent = await multisigContract.multisigName()
    }
}
