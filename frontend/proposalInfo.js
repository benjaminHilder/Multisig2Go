import {provider, signer, MultisigWalletAddress, MultisigABI, connectMetamask} from "./utils.js"
import {selectedProposalID} from "./proposals.js";

window.onload = function() {
    displaySelectedProposal();
    console.log("id: " + sessionStorage.getItem("selectedProposalID"))
}

async function displaySelectedProposal() {
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

async function getProposalTitle() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    document.getElementById("proposalTitle").innerHTML = await contract.getProposalTitle(sessionStorage.getItem("selectedProposalID"))
}

async function getProposalDescription() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    document.getElementById("proposalDescription").innerHTML = await contract.getProposalDescription(sessionStorage.getItem("selectedProposalID"))
}

async function getProposalEthAmount() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    const bigNum = ethers.BigNumber.from(await contract.getProposalEthAmount(sessionStorage.getItem("selectedProposalID")))
    document.getElementById("proposalEthAmount").innerHTML = await ethers.utils.formatEther(bigNum) + " ETH";
}

async function getProposalReciever() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    document.getElementById("proposalReciever").innerHTML = await contract.getProposalReciever(sessionStorage.getItem("selectedProposalID"))
}

async function getProposalApprovals() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    document.getElementById("proposalApprovals").innerHTML = await contract.getProposalApprovals(sessionStorage.getItem("selectedProposalID"))
}

async function getProposalDisapprovals() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    document.getElementById("proposalDisapprovals").innerHTML = await contract.getProposalDisapprovals(sessionStorage.getItem("selectedProposalID"))
}

async function getProposalIsActive() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    document.getElementById("proposalIsActive").innerHTML = await contract.getProposalIsActive(sessionStorage.getItem("selectedProposalID"))
}

async function getProposalIsClaimed() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    document.getElementById("proposalIsClaimed").innerHTML = await contract.getProposalIsClaimed(sessionStorage.getItem("selectedProposalID"))
}

async function getProposalFinishedResult() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    document.getElementById("proposalFinishedResult").innerHTML = await contract.getProposalFinishedResult(sessionStorage.getItem("selectedProposalID"))
}
