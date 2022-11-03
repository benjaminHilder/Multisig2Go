import {provider, signer, Multisig2GoAddress, Multisig2GoABI, MultisigABI, connectMetamask, changeSelectedMultisig, openMultisigSelectPage} from "./utils.js"

window.onload = async function() {
    changeSelectedMultisig();
    
    await connectMetamask();

    if (signer != undefined) {
        displayMultisigs();
    } 

    document.getElementById("selectedMultisig").addEventListener("click", openMultisigSelectPage, false);
}

async function displayMultisigs() {
    
    const contract = new ethers.Contract(Multisig2GoAddress, Multisig2GoABI, provider);
    
    let allMultisigAddresses = await contract.getAllMultisigAddresses();

    let userAddress = await signer.getAddress()
    const multisigsUserCanAccess = await contract.getAllUserMultisigsAccess(userAddress);
    const multisigsCount = await multisigsUserCanAccess.length;
    
    for(let i = 0; i < multisigsCount; i++) {
        let multisigContract = new ethers.Contract(allMultisigAddresses[i], MultisigABI, provider);
        
        let dynamicBoxDiv = document.createElement('div')
        let dynamicPara = document.createElement('p')
        
        dynamicPara.className = "dynamicBox"
        
        dynamicBoxDiv.id = "dynamicBlock" 
        
        dynamicPara.innerHTML = "<h1>" + await multisigContract.multisigName() + "</h1>" +  
                                "<p> " + await multisigContract.multisigDescription() + "</p>"
                                    

        let btn = document.createElement('button');
        btn.textContent = "Select"
        btn.id = "selectButton";
        btn.className = "selectButton";
        
        btn.addEventListener("click", 
            function(){ 
                setMultisig(allMultisigAddresses[i])
            } , false);    
        
        btn.addEventListener("click", 
            function(){    
                let address = sessionStorage.getItem("multisigAddress")
                const multisigContract = new ethers.Contract(address, MultisigABI, provider)
                changeSelectedMultisig(multisigContract, address)
            }, false)
        
        
        dynamicPara.appendChild(btn)
        dynamicBoxDiv.appendChild(dynamicPara)
        document.getElementById("dynamicBlocks").appendChild(dynamicBoxDiv)
    }
}

async function setMultisig (multisigAddress) {
    sessionStorage.setItem("multisigAddress", multisigAddress)
}