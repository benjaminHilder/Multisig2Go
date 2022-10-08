import {provider, signer, MultisigWalletAddress, MultisigABI, connectMetamask} from "./utils.js"

const interval = setInterval(function() {
    getEthBalance();
}, 0)

window.onload = function() {
    getAllApprovers();
}

connectMetamask();

async function depositEth() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    const txResponse = await contract.connect(signer).deposit({value: ethers.utils.parseEther(document.getElementById("depositEthInput").value)});
}

async function getEthBalance() {
    let bal = ethers.utils.formatEther(await provider.getBalance(MultisigWalletAddress));
    document.getElementById("ethBalance").innerHTML = bal + " ETH   "
}

async function getAllApprovers() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    let approvers = await contract.getAllApprovers();
    approvers = await approvers.toString().split(",")

    for (let i = 0; i < approvers.length; i++) {
        if (await contract.approverName(approvers[i]) != "") {
            approvers[i] = await contract.approverName(approvers[0])
        }
    }
    
    document.getElementById("allApproversText").innerHTML = approvers
}

async function getInfo() {
    getProposalTitle();
    getProposalDescription();
    getProposalEthAmount();
    getProposalReciever();
    getProposalApprovals();
    getProposalDisapprovals();
    getProposalIsActive();
    getProposalIsClaimed();
    getProposalFinishedResult();
}

async function getTitleAndDescription() {
    getProposalTitle();
    getProposalDescription();
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
    const bigNum = ethers.BigNumber.from(await contract.getProposalEthAmount(document.getElementById("infoInput").value))
    document.getElementById("proposalEthAmount").innerHTML = "Eth Amount: " + await ethers.utils.formatEther(bigNum) + " ETH";
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

async function getProposalIsClaimed() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    document.getElementById("proposalIsClaimed").innerHTML = "Has proposal been claimed? " + await contract.getProposalIsClaimed(document.getElementById("infoInput").value)
}

async function getProposalFinishedResult() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    document.getElementById("proposalFinishedResult").innerHTML = "finished Result: " + await contract.getProposalFinishedResult(document.getElementById("infoInput").value)
}
