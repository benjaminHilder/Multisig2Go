import {provider, signer,  MultisigABI, connectMetamask, changeSelectedMultisig} from "./utils.js"
import {selectedProposalID} from "./proposals.js";

let title;
let description;
let ethAmount;
let reciever;
let approvals;
let disapprovals;
let isActive;
let isClaimed;
let finishedResult;

window.onload = function() {
    changeSelectedMultisig()

    displaySelectedProposal();
    //console.log("id: " + sessionStorage.getItem("selectedProposalID"))
    //getProposalInfo()
    //displayProposalInfo()
}


async function getProposalInfo() {
    const contract = new ethers.Contract(sessionStorage.getItem("multisigAddress"), MultisigABI, provider);

    title = await contract.getProposalTitle(sessionStorage.getItem("selectedProposalID"))
    
    description = await contract.getProposalDescription(sessionStorage.getItem("selectedProposalID"))

    //const bigNum = ethers.BigNumber.from(await contract.getProposalEthAmount(sessionStorage.getItem("selectedProposalID")))
    //ethAmount = await ethers.utils.formatEther(bigNum) + " ETH"

    reciever = await contract.getProposalReciever(sessionStorage.getItem("selectedProposalID"))
    approvals = await contract.getProposalApprovals(sessionStorage.getItem("selectedProposalID"))
    disapprovals = await contract.getProposalDisapprovals(sessionStorage.getItem("selectedProposalID"))
    isActive = await contract.getProposalIsActive(sessionStorage.getItem("selectedProposalID"))
    isClaimed = await contract.getProposalIsClaimed(sessionStorage.getItem("selectedProposalID"))
    finishedResult = await contract.getProposalFinishedResult(sessionStorage.getItem("selectedProposalID"))

}


async function displayProposalInfo() {
    if (title === undefined) {
        console.log(title)
    }
    //if (title == "undefined" || description == ""|| ethAmount == "" || reciever == "" || approvals == "" || disapprovals == "" || isActive == "" || isClaimed == ""|| finishedResult == "") {
    //    console.log("waiting")
    //} else {
    //    document.getElementById("proposalTitle").innerHTML = title;
    //    document.getElementById("proposalDescription").innerHTML = description;
    //    document.getElementById("proposalEthAmount").innerHTML = ethAmount;
    //    document.getElementById("proposalReciever").innerHTML = reciever;
    //    document.getElementById("proposalApprovals").innerHTML = approvals;
    //    document.getElementById("proposalDisapprovals").innerHTML = disapprovals
    //}
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
    const contract = new ethers.Contract(sessionStorage.getItem("multisigAddress"), MultisigABI, provider);
    document.getElementById("proposalTitle").innerHTML = await contract.getProposalTitle(sessionStorage.getItem("selectedProposalID"))
    title = await contract.getProposalTitle(sessionStorage.getItem("selectedProposalID"))
}

async function getProposalDescription() {
    const contract = new ethers.Contract(sessionStorage.getItem("multisigAddress"), MultisigABI, provider);
    document.getElementById("proposalDescription").innerHTML = await contract.getProposalDescription(sessionStorage.getItem("selectedProposalID"))
    description = await contract.getProposalDescription(sessionStorage.getItem("selectedProposalID"))
}

async function getProposalEthAmount() {
    const contract = new ethers.Contract(sessionStorage.getItem("multisigAddress"), MultisigABI, provider);
    const bigNum = ethers.BigNumber.from(await contract.getProposalEthAmount(sessionStorage.getItem("selectedProposalID")))
    document.getElementById("proposalEthAmount").innerHTML = await ethers.utils.formatEther(bigNum) + " ETH";
    ethAmount = await ethers.utils.formatEther(bigNum) + " ETH"
}

async function getProposalReciever() {
    const contract = new ethers.Contract(sessionStorage.getItem("multisigAddress"), MultisigABI, provider);
    document.getElementById("proposalReciever").innerHTML = await contract.getProposalReciever(sessionStorage.getItem("selectedProposalID"))
    reciever = await contract.getProposalReciever(sessionStorage.getItem("selectedProposalID"))
}

async function getProposalApprovals() {
    const contract = new ethers.Contract(sessionStorage.getItem("multisigAddress"), MultisigABI, provider);
    document.getElementById("proposalApprovals").innerHTML = await contract.getProposalApprovals(sessionStorage.getItem("selectedProposalID"))
    approvals = await contract.getProposalApprovals(sessionStorage.getItem("selectedProposalID"))
}

async function getProposalDisapprovals() {
    const contract = new ethers.Contract(sessionStorage.getItem("multisigAddress"), MultisigABI, provider);
    document.getElementById("proposalDisapprovals").innerHTML = await contract.getProposalDisapprovals(sessionStorage.getItem("selectedProposalID"))
    disapprovals = await contract.getProposalDisapprovals(sessionStorage.getItem("selectedProposalID"))
}

async function getProposalIsActive() {
    const contract = new ethers.Contract(sessionStorage.getItem("multisigAddress"), MultisigABI, provider);
    document.getElementById("proposalIsActive").innerHTML = await contract.getProposalIsActive(sessionStorage.getItem("selectedProposalID"))
    isActive = await contract.getProposalIsActive(sessionStorage.getItem("selectedProposalID"))
}

async function getProposalIsClaimed() {
    const contract = new ethers.Contract(sessionStorage.getItem("multisigAddress"), MultisigABI, provider);
    document.getElementById("proposalIsClaimed").innerHTML = await contract.getProposalIsClaimed(sessionStorage.getItem("selectedProposalID"))
    isClaimed = await contract.getProposalIsClaimed(sessionStorage.getItem("selectedProposalID"))
}

async function getProposalFinishedResult() {
    const contract = new ethers.Contract(sessionStorage.getItem("multisigAddress"), MultisigABI, provider);
    document.getElementById("proposalFinishedResult").innerHTML = await contract.getProposalFinishedResult(sessionStorage.getItem("selectedProposalID"))
    finishedResult = await contract.getProposalFinishedResult(sessionStorage.getItem("selectedProposalID"))
}
