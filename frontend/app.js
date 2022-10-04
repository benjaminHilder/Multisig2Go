let provider = new ethers.providers.Web3Provider(window.ethereum)
let signer


const MultisigWalletAddress = "0x059F1b685D297ef48D2e1deB6a3090F132358B24"
const MultisigABI = ["function deposit() public payable",
                     "function createProposal(string memory _title, string memory _description, uint256 _ethAmount, address payable _receiver) public onlyApprover",
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

async function createProposal() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    const txResponse = await contract.connect(signer).createProposal(document.getElementById("createProposalInputTitle").value,
                                                                     document.getElementById("createProposalInputDescription").value,
                                                                     document.getElementById("createProposalInputEthAmount").value,
                                                                     document.getElementById("createProposalInputReceiver").value)
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

async function getInfo() {
    getProposalTitle();
    getProposalDescription();
    getProposalEthAmount();
    getProposalReciever();
    getProposalApprovals();
    getProposalDisapprovals();
    getProposalIsActive();
    getProposalFinishedResult();
}

async function getProposalTitle() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    document.getElementById("proposalTitle").innerHTML = "Title: " + await contract.getProposalTitle(document.getElementById("infoInput").value)
}

async function getProposalDescription() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    document.getElementById("proposalDescription").innerHTML = "Description: " + await contract.getProposalDescription(document.getElementById("infoInput").value)
}

async function getProposalEthAmount() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    document.getElementById("proposalEthAmount").innerHTML = "Eth Amount: " + await contract.getProposalEthAmount(document.getElementById("infoInput").value)
}

async function getProposalReciever() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    document.getElementById("proposalReciever").innerHTML = "Reciever: " + await contract.getProposalReciever(document.getElementById("infoInput").value)
}

async function getProposalApprovals() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    document.getElementById("proposalApprovals").innerHTML = "Approvals: " + await contract.getProposalApprovals(document.getElementById("infoInput").value)
}

async function getProposalDisapprovals() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    document.getElementById("proposalDisapprovals").innerHTML = "Disapprovals: " + await contract.getProposalDisapprovals(document.getElementById("infoInput").value)
}

async function getProposalIsActive() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    document.getElementById("proposalIsActive").innerHTML = "Is Proposal Active? " + await contract.getProposalIsActive(document.getElementById("infoInput").value)
}

async function getProposalFinishedResult() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    document.getElementById("proposalFinishedResult").innerHTML = "finished Result: " + await contract.getProposalFinishedResult(document.getElementById("infoInput").value)
}
