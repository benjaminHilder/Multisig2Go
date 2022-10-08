import {provider, signer, MultisigWalletAddress, MultisigABI, connectMetamask} from "./utils.js"

connectMetamask();

window.onload = function() {
    displayProposals();
    document.getElementById("displayProposalsButton").addEventListener("click", displayProposals,false)
}

async function displayProposals() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    let proposals = ""
    for (let i = 0; i < await contract.proposalIterator(); i++) {
        proposals += i+1 +")<br>"
        proposals += "Title: " +  await contract.getProposalTitle(i) + "<br>";
        proposals += "Description: " + await contract.getProposalDescription(i) + "<br> <br>";
    }
    document.getElementById("proposals").innerHTML = proposals;
}