let provider = new ethers.providers.Web3Provider(window.ethereum)
let signer

const MultisigWalletAddress = "0x7121E4F8673fA1f05BAf9c81eC2b47Ec145D77b9"
const MultisigABI = ["function deposit() public payable",
                     "function createProposal(string memory _title, string memory _description, uint256 _ethAmount, address payable _receiver) public",
                     "function voteOnProposal(uint256 _id, bool _voteValue) public",
                     "function claimProposal(uint _id) public",
                     "function getAllApprovers() public view returns(address[] memory)",
                     "function getProposalTitle(uint256 _id) public view returns(string memory)",
                     "function getProposalDescription(uint256 _id) public view returns(string memory)",
                     "function getProposalEthAmount(uint256 _id) public view returns(uint256)",
                     "function getProposalReciever(uint256 _id) public view returns(address payable)",
                     "function getProposalApprovals(uint256 _id) public view returns(uint256)",
                     "function getProposalDisapprovals(uint256 _id) public view returns(uint256)",
                     "function getProposalIsActive(uint256 _id) public view returns(bool)",
                     "function getProposalFinishedResult(uint256 _id) public view returns(bool)",
                     "function getAllTitles() public view returns(string[] memory)",   
                     "function getAllDescriptions() public view returns(string[] memory)",
                     "function proposalIterator() public view returns(uint256)"                 
                    ]


window.onload = function() {
    displayProposals();
}

async function displayProposals() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    let proposals = ""
    for (i = 0; i < await contract.proposalIterator(); i++) {
        proposals += i+1 +")<br>"
        proposals += "Title: " +  await contract.getProposalTitle(i) + "<br>";
        proposals += "Description: " + await contract.getProposalDescription(i) + "<br> <br>";
    }
    document.getElementById("proposals").innerHTML = proposals;
}

async function connectMetamask() {
    await provider.send("eth_requestAccounts", []);

    signer = await provider.getSigner();

    const network = await provider.getNetwork();
    let chainName = network.name;

    var button = await document.getElementById("connectWalletButton");
    button.remove();
    
    if (chainName === "goerli") {
        document.getElementById("connectedText").innerHTML = "Goerli Chain Connected ✔️"
    }
    else {
        document.getElementById("connectedText").innerHTML = "Incorrect Chain ❌ Please Connect To Goerli Chain"
    }

    console.log("Account address: ", await signer.getAddress())
    console.log("chain name: " + chainName)
}