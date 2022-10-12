import {provider, signer, MultisigWalletAddress, MultisigABI, connectMetamask} from "./utils.js"

window.onload = function() {
    connectMetamask();

    document.getElementById("connectWalletButton").addEventListener("click", connectMetamask, false);
    document.getElementById("createProposalButtonSubmit").addEventListener("click", createProposal, false);
}

async function createProposal() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    const txResponse = await contract.connect(signer).createProposal(document.getElementById("createProposalInputTitle").value,
                                                                     document.getElementById("createProposalInputDescription").value,
                                                                     ethers.utils.parseEther(document.getElementById("createProposalInputEthAmount").value),
                                                                     document.getElementById("createProposalInputReceiver").value)
}