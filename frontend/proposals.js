import {provider, signer, MultisigABI, connectMetamask, changeSelectedMultisig, openMultisigSelectPage} from "./utils.js"

export let selectedProposalID;

window.onload = function() {
    changeSelectedMultisig()

    connectMetamask();
    displayProposals();

    document.getElementById("selectedMultisig").addEventListener("click", openMultisigSelectPage, false);
}

async function displayProposals() {
    const contract = new ethers.Contract(sessionStorage.getItem("multisigAddress"), MultisigABI, provider);
    const maxProposals = await contract.proposalIterator()

    let proposalDiv = document.createElement("div");
    proposalDiv.className = "proposalBox"

    for(let i = 0; i < maxProposals; i++) {
        let dynamicBoxDiv = document.createElement('div');
        let dynamicPara = document.createElement('p');

        dynamicPara.className = "dynamicBox";

        dynamicBoxDiv.id = "dynamicBlock";

        dynamicPara.innerHTML = "<h1>" +  await contract.getProposalTitle(i) + "</h1>" + 
                                "<p> " + await contract.getProposalDescription(i) + "</p>" 
                                

        let viewMoreBtn = document.createElement('button');
        viewMoreBtn.textContent = "View More"
        viewMoreBtn.id = "proposalViewMoreButton";
        viewMoreBtn.className = "standardButton";

        viewMoreBtn.addEventListener("click", 
            function(){
                viewAllProposalInfo(i)
            } , false);
        
        dynamicPara.appendChild(viewMoreBtn);
        dynamicBoxDiv.appendChild(dynamicPara);
        document.getElementById("dynamicBlocks").appendChild(dynamicBoxDiv)
    }
    //for(let i = 0; i < maxProposals; i++) {
    //    let proposalParaDiv = document.createElement('div')
    //    proposalParaDiv.className = "proposalParaDiv"
//
    //    let proposalParaDivInner = document.createElement('div')
    //    proposalParaDivInner.className = "proposalParaDivInner"
//
    //    let proposalPara = document.createElement('p')
    //    
    //    proposalPara.id = "proposalBlock"
    //    proposalPara.innerHTML = i+1 +")<br>" + 
    //                                "Title: " +  await contract.getProposalTitle(i) + 
    //                                "<br>" + 
    //                                "Description: " + await contract.getProposalDescription(i) + 
    //                                "<br> <br>" 
    //    
    //    let viewMoreBtn = document.createElement('button');
    //    viewMoreBtn.id = "proposalViewMoreButton";
    //    viewMoreBtn.className = "standardButton";
    //    
    //    viewMoreBtn.addEventListener("click", function(){viewAllProposalInfo(i)} , false);
    //    viewMoreBtn.textContent = "View More"
//
    //    let passBtn = document.createElement('button');
    //    passBtn.id = "passButton";
    //    passBtn.className = "standardButton";
    //    
    //    passBtn.addEventListener("click", function(){voteOnProposal(true, i)} , false);
    //    passBtn.textContent = "Pass"
//
    //    let rejectBtn = document.createElement('button');
    //    rejectBtn.id = "rejectButton";
    //    rejectBtn.className = "standardButton";
    //    
    //    rejectBtn.addEventListener("click", function(){voteOnProposal(false, i)} , false);
    //    rejectBtn.textContent = "Reject"
//
    //    let claimBtn = document.createElement('button');
    //    claimBtn.id = "claimButton";
    //    claimBtn.className = "standardButton";
    //    
    //    claimBtn.addEventListener("click", function(){claimProposal()} , false);
    //    claimBtn.textContent = "Claim"
//
    //    proposalParaDivInner.appendChild(proposalPara);
//
    //    proposalParaDiv.appendChild(proposalParaDivInner);
    //    proposalParaDiv.appendChild(viewMoreBtn)
    //    proposalParaDiv.appendChild(passBtn)
    //    proposalParaDiv.appendChild(rejectBtn)
    //    proposalParaDiv.appendChild(claimBtn)
    //    proposalDiv.appendChild(proposalParaDiv);
//
    //}
    //document.getElementById("proposalBlocks").appendChild(proposalDiv)
    //document.body.appendChild(proposalDiv);
}

async function voteOnProposal(result, id) {
    const contract = new ethers.Contract(sessionStorage.getItem("multisigAddress"), MultisigABI, provider);
    const txResponse = await contract.connect(signer).voteOnProposal(id, result)
}

async function claimProposal() {
    const contract = new ethers.Contract(sessionStorage.getItem("multisigAddress"), MultisigABI, provider);
    const txResponse = await contract.connect(signer).claimProposal(document.getElementById("infoInput").value)
}

async function viewAllProposalInfo(id) {
    sessionStorage.setItem("selectedProposalID", id)
    selectedProposalID = id;
    window.open("./proposalInfo.html", '_self')
}