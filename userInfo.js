import {provider, signer, MultisigABI, connectMetamask, changeSelectedMultisig, openMultisigSelectPage} from "./utils.js"

window.onload = function() {
    changeSelectedMultisig()

    connectMetamask();
    document.getElementById("setAccountButton").addEventListener("click", setAccountName, false);   
    document.getElementById("selectedMultisig").addEventListener("click", openMultisigSelectPage, false);
}

async function setAccountName() {
    const contract = new ethers.Contract(sessionStorage.getItem("multisigAddress"), MultisigABI, provider);
    const txResponse = await contract.connect(signer).setAccountName(document.getElementById("setAccountInput").value)
}