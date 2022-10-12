import {provider, signer, MultisigWalletAddress, MultisigABI, connectMetamask} from "./utils.js"

window.onload = function() {
    connectMetamask();
    document.getElementById("setAccountButton").addEventListener("click", setAccountName, false);   
}

async function setAccountName() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    const txResponse = await contract.connect(signer).setAccountName(document.getElementById("setAccountInput").value)
}