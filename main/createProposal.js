import {provider, signer,  MultisigABI, connectMetamask, changeSelectedMultisig, openMultisigSelectPage} from "./utils.js"

window.onload = function() {
   changeSelectedMultisig()

    connectMetamask();

    document.getElementById("createProposalButtonSubmit").addEventListener("click", createProposal, false);
    document.getElementById("connectWalletButton").addEventListener("click", connectMetamask, false);
    document.getElementById("selectedMultisig").addEventListener("click", openMultisigSelectPage, false);s
}

async function createProposal() {
    const contract = new ethers.Contract(sessionStorage.getItem("multisigAddress"), MultisigABI, provider);
    const txResponse = await contract.connect(signer).createProposal(document.getElementById("createProposalInputTitle").value,
                                                                     document.getElementById("createProposalInputDescription").value,
                                                                     ethers.utils.parseEther(document.getElementById("createProposalInputEthAmount").value),
                                                                     document.getElementById("createProposalInputReceiver").value)
}