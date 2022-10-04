let provider = new ethers.providers.Web3Provider(window.ethereum)
let signer

const MultisigWalletAddress = "0x71ee163df5fc2c93333a8880b671ab2aa190ed6a"
const MultisigABI = ["function deposit() public payable",
                     "function getAllApprovers() public view returns(address[] memory)",
                     "function getProposalTitle(uint256 _id) public view returns(string memory)",
                     "function getProposalDescription(uint256 _id) public view returns(string memory)",
                     "function getProposalEthAmount(uint256 _id) public view returns(uint256)",
                     "function getProposalReciever(uint256 _id) public view returns(address payable)",
                     "function getProposalApprovals(uint256 _id) public view returns(uint256)",
                     "function getProposalDisapprovals(uint256 _id) public view returns(uint256)",
                     "function getProposalIsActive(uint256 _id) public view returns(bool)",
                     "function getProposalFinishedResult(uint256 _id) public view returns(bool)"
                    ]

const interval = setInterval(function() {
    getEthBalance();
    getAllApprovers();
}, 0)


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

async function depositEth() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    const txResponse = await contract.connect(signer).deposit({value: ethers.utils.parseEther(document.getElementById("depositEthInput").value)});
}

async function getEthBalance() {
    let bal = await provider.getBalance(MultisigWalletAddress);
    document.getElementById("ethBalance").innerHTML = bal
}

async function getAllApprovers() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    const txResponse = await contract.getAllApprovers();

    document.getElementById("allApproversText").innerHTML = txResponse
}

async function getProposalInfo() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    const txResponse = await contract.getProposalInfo(document.getElementById("infoInput").value)

    console.log("response: " + txResponse);
}
