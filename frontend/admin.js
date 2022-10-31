import {provider, signer, MultisigABI, connectMetamask, changeSelectedMultisig, openMultisigSelectPage} from "./utils.js"

window.onload = function() {
    changeSelectedMultisig();

    connectMetamask();
    
    document.getElementById("connectWalletButton").addEventListener("click", connectMetamask, false)
    document.getElementById("addApproverButton").addEventListener("click", addApprover, false)
    document.getElementById("removeApproverButton").addEventListener("click", removeApprover, false)
    document.getElementById("selectedMultisig").addEventListener("click", openMultisigSelectPage, false);
}

async function addApprover() {
    const contract = new ethers.Contract(sessionStorage.getItem("multisigAddress"), MultisigABI, provider);
    const txResponse = await contract.connect(signer).addApprover(document.getElementById("addApproverInput").value)
}

async function removeApprover() {
    const contract = new ethers.Contract(sessionStorage.getItem("multisigAddress"), MultisigABI, provider);
    const txResponse = await contract.connect(signer).removeApprover(document.getElementById("removeApproverInput").value)
}