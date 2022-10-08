import {provider, signer, MultisigWalletAddress, MultisigABI, connectMetamask} from "./utils.js"

window.onload = function() {
    document.getElementById("connectWalletButton").addEventListener("click", connectMetamask, false);
    document.getElementById("voteOnProposalTrue").addEventListener("click", function(){voteOnProposal(true)}, false);
    document.getElementById("voteOnProposalFalse").addEventListener("click", function(){voteOnProposal(false)}, false);
    document.getElementById("claimProposalButton").addEventListener("click", claimProposal, false);
    document.getElementById("getTitleAndDescriptionButton").addEventListener("click", getTitleAndDescription, false);
}

connectMetamask();

async function voteOnProposal(result) {
    if(document.getElementById("infoInput").value != "") {
        const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
        const txResponse = await contract.connect(signer).voteOnProposal(document.getElementById("infoInput").value, result)
    }
}

async function claimProposal() {
    if(document.getElementById("infoInput").value != "") {
        const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
        const txResponse = await contract.connect(signer).claimProposal(document.getElementById("infoInput").value)
    }
}

async function getTitleAndDescription() {
    if(document.getElementById("infoInput").value != "") {
        getProposalTitle();
        getProposalDescription();
    }

}

async function getProposalTitle() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    document.getElementById("proposalTitle").innerHTML = "Title: " + await contract.getProposalTitle(document.getElementById("infoInput").value)
}

async function getProposalDescription() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    document.getElementById("proposalDescription").innerHTML = "Description: " + await contract.getProposalDescription(document.getElementById("infoInput").value)
}