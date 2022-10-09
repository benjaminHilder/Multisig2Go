import {provider, signer, MultisigWalletAddress, MultisigABI, connectMetamask} from "./utils.js"

export let selectedProposalID;

connectMetamask();

window.onload = function() {
    displayProposals();
}

async function displayProposals() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    const maxProposals = await contract.proposalIterator()
    let proposalArray = [];

    for(let i = 0; i < maxProposals; i++) {
        let proposalBlock = document.createElement('p')
        proposalBlock.id = "proposalBlock"
        proposalBlock.innerHTML = i+1 +")<br>" + 
                                    "Title: " +  await contract.getProposalTitle(i) + 
                                    "<br>" + 
                                    "Description: " + await contract.getProposalDescription(i) + 
                                    "<br> <br>"
        
        let btn = document.createElement('button');
        btn.textContent = "View More"

        document.body.appendChild(proposalBlock);

        btn.addEventListener("click", function(){viewAllProposalInfo(i)} , false);
        document.body.appendChild(btn);
        proposalArray.push(proposalBlock)
    }
}

async function viewAllProposalInfo(id) {
    sessionStorage.setItem("selectedProposalID", id)
    selectedProposalID = id;
    window.open("./proposalInfo.html", '_self')
}