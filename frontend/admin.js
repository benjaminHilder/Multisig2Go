import {provider, signer, MultisigWalletAddress, MultisigABI, connectMetamask} from "./utils.js"

window.onload = function() {
    connectMetamask();
    
    document.getElementById("connectWalletButton").addEventListener("click", connectMetamask, false)
    document.getElementById("addApproverButton").addEventListener("click", addApprover, false)
    document.getElementById("removeApproverButton").addEventListener("click", removeApprover, false)
}

async function addApprover() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    const txResponse = await contract.connect(signer).addApprover(document.getElementById("addApproverInput").value)
}

async function removeApprover() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    const txResponse = await contract.connect(signer).removeApprover(document.getElementById("removeApproverInput").value)
}