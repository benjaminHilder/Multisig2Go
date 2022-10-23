import {provider, signer, Multisig2GoAddress, Multisig2GoABI, MultisigABI, connectMetamask, changeSelectedMultisig} from "./utils.js"

window.onload = async function() {
    changeSelectedMultisig();
    
    await connectMetamask();

    if (signer != undefined) {
        displayMultisigs();
    } 
}




async function displayMultisigs() {
    
    const contract = new ethers.Contract(Multisig2GoAddress, Multisig2GoABI, provider);
    
    let allMultisigAddresses = await contract.getAllMultisigAddresses();

    let userAddress = await signer.getAddress()
    const multisigsUserCanAccess = await contract.getAllUserMultisigsAccess(userAddress);
    const multisigsCount = await multisigsUserCanAccess.length;
    
    let proposalDiv = document.createElement("div");
    proposalDiv.className = "proposalBox"

    for(let i = 0; i < multisigsCount; i++) {
        let multisigContract = new ethers.Contract(allMultisigAddresses[i], MultisigABI, provider);

        let proposalParaDiv = document.createElement('div')
        proposalParaDiv.className = "proposalParaDiv"

        let proposalParaDivInner = document.createElement('div')
        proposalParaDivInner.className = "proposalParaDivInner"

        let proposalPara = document.createElement('p')
        
        proposalPara.id = "proposalBlock"
        proposalPara.innerHTML = i+1 +")<br>" + 
                                    "<h1>Multisig Name: " + await multisigContract.multisigName() + "</h1>" + 
                                    "<br>" + 
                                    "Multisig Description: " + "<p> " +await multisigContract.multisigDescription() + "</p>" +
                                    "<br> <br>" 
        
        let btn = document.createElement('button');
        btn.id = "proposalViewMoreButton";
        btn.className = "standardButton";
        
        btn.addEventListener("click", function(){setMultisig(allMultisigAddresses[i])} , false);
        
        btn.addEventListener("click", function(){    
            let address = sessionStorage.getItem("multisigAddress")
            const multisigContract = new ethers.Contract(address, MultisigABI, provider)
            changeSelectedMultisig(multisigContract, address)
        }, false)
    
        btn.textContent = "Select"
    
        proposalParaDivInner.appendChild(proposalPara);

        proposalParaDiv.appendChild(proposalParaDivInner);
        proposalParaDiv.appendChild(btn)
        proposalDiv.appendChild(proposalParaDiv);

    }
    document.getElementById("proposalBlocks").appendChild(proposalDiv)
    document.body.appendChild(proposalDiv);
}

async function setMultisig (multisigAddress) {
    sessionStorage.setItem("multisigAddress", multisigAddress)

}