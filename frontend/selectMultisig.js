import {provider, signer, Multisig2GoAddress, Multisig2GoABI, MultisigABI, connectMetamask} from "./utils.js"

window.onload = async function() {
    await connectMetamask();
    await displayMultisigs();
}


async function displayMultisigs() {
    
    const contract = new ethers.Contract(Multisig2GoAddress, Multisig2GoABI, provider);
    let userAddress = await signer.getAddress()
    const multisigsUserCanAccess = await contract.getAllUserMultisigsAccess(userAddress);
    const multisigsCount = await multisigsUserCanAccess.length;
    
    let proposalDiv = document.createElement("div");
    proposalDiv.className = "proposalBox"

    for(let i = 0; i < multisigsCount; i++) {
        let proposalParaDiv = document.createElement('div')
        proposalParaDiv.className = "proposalParaDiv"

        let proposalParaDivInner = document.createElement('div')
        proposalParaDivInner.className = "proposalParaDivInner"

        let proposalPara = document.createElement('p')
        
        proposalPara.id = "proposalBlock"
        proposalPara.innerHTML = i+1 +")<br>" + 
                                    "Title: "  /* + await contract.getProposalTitle(i) */+ 
                                    "<br>" + 
                                    "Description: " /*+ await contract.getProposalDescription(i)*/ + 
                                    "<br> <br>" 
        
        let btn = document.createElement('button');
        btn.id = "proposalViewMoreButton";
        btn.className = "standardButton";
        
    //    btn.addEventListener("click", function(){viewAllProposalInfo(i)} , false);
    //    ;
        btn.textContent = "View More"
    //    
//
        proposalParaDivInner.appendChild(proposalPara);
//
        proposalParaDiv.appendChild(proposalParaDivInner);
        proposalParaDiv.appendChild(btn)
        proposalDiv.appendChild(proposalParaDiv);
//
    }
    document.getElementById("proposalBlocks").appendChild(proposalDiv)
    document.body.appendChild(proposalDiv);
}