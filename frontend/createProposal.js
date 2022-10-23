import {provider, signer,  MultisigABI, connectMetamask, changeSelectedMultisig} from "./utils.js"

window.onload = function() {
    let address = sessionStorage.getItem("multisigAddress")
    const multisigContract = new ethers.Contract(address, MultisigABI, provider)
    changeSelectedMultisig(multisigContract, address)

    connectMetamask();

    document.getElementById("createProposalButtonSubmit").addEventListener("click", createProposal, false);
    document.getElementById("connectWalletButton").addEventListener("click", connectMetamask, false);
   
}

async function createProposal() {
    const contract = new ethers.Contract(sessionStorage.getItem("multisigAddress"), MultisigABI, provider);
    const txResponse = await contract.connect(signer).createProposal(document.getElementById("createProposalInputTitle").value,
                                                                     document.getElementById("createProposalInputDescription").value,
                                                                     ethers.utils.parseEther(document.getElementById("createProposalInputEthAmount").value),
                                                                     document.getElementById("createProposalInputReceiver").value)
}