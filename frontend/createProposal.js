import {provider, signer, MultisigWalletAddress, MultisigABI, connectMetamask} from "./utils.js"

connectMetamask();

async function createProposal() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    const txResponse = await contract.connect(signer).createProposal(document.getElementById("createProposalInputTitle").value,
                                                                     document.getElementById("createProposalInputDescription").value,
                                                                     ethers.utils.parseEther(document.getElementById("createProposalInputEthAmount").value),
                                                                     document.getElementById("createProposalInputReceiver").value)
}