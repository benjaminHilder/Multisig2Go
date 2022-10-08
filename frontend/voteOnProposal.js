import {provider, signer, MultisigWalletAddress, MultisigABI, connectMetamask} from "./utils.js"

connectMetamask();

async function voteOnProposal(result) {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    const txResponse = await contract.connect(signer).voteOnProposal(document.getElementById("infoInput").value, result)
}

async function claimProposal() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    const txResponse = await contract.connect(signer).claimProposal(document.getElementById("infoInput").value)
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