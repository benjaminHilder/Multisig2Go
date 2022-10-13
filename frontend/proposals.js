import {provider, signer, MultisigWalletAddress, MultisigABI, connectMetamask} from "./utils.js"

export let selectedProposalID;

window.onload = function() {
    connectMetamask();
    displayProposals();
}

async function displayProposals() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    const maxProposals = await contract.proposalIterator()

    let proposalDiv = document.createElement("div");
    proposalDiv.className = "proposalBox"


    for(let i = 0; i < maxProposals; i++) {
        let proposalParaDiv = document.createElement('div')
        proposalParaDiv.className = "proposalParaDiv"

        let proposalParaDivInner = document.createElement('div')
        proposalParaDivInner.className = "proposalParaDivInner"

        let proposalPara = document.createElement('p')
        
        proposalPara.id = "proposalBlock"
        proposalPara.innerHTML = i+1 +")<br>" + 
                                    "Title: " +  await contract.getProposalTitle(i) + 
                                    "<br>" + 
                                    "Description: " + await contract.getProposalDescription(i) + 
                                    "<br> <br>" 
        
        let btn = document.createElement('button');
        btn.id = "proposalViewMoreButton";
        
        btn.addEventListener("click", function(){viewAllProposalInfo(i)} , false);
        proposalPara.appendChild(btn);
        btn.textContent = "View More"
        

        proposalParaDivInner.appendChild(proposalPara);

        proposalParaDiv.appendChild(proposalParaDivInner);
        proposalDiv.appendChild(proposalParaDiv);

    }
    document.getElementById("proposalInnerMenu").appendChild(proposalDiv)
}

async function viewAllProposalInfo(id) {
    sessionStorage.setItem("selectedProposalID", id)
    selectedProposalID = id;
    window.open("./proposalInfo.html", '_self')
}