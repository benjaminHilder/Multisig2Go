import {provider, signer, MultisigABI, connectMetamask, changeSelectedMultisig} from "./utils.js"

window.onload = function() {
    let address = sessionStorage.getItem("multisigAddress")
    const multisigContract = new ethers.Contract(address, MultisigABI, provider)
    changeSelectedMultisig(multisigContract, address)

    connectMetamask();

    document.getElementById("connectWalletButton").addEventListener("click", connectMetamask, false);
    document.getElementById("voteOnProposalTrue").addEventListener("click", function(){voteOnProposal(true)}, false);
    document.getElementById("voteOnProposalFalse").addEventListener("click", function(){voteOnProposal(false)}, false);
    document.getElementById("claimProposalButton").addEventListener("click", claimProposal, false);
    document.getElementById("getTitleAndDescriptionButton").addEventListener("click", getTitleAndDescription, false);
}

async function voteOnProposal(result) {
    if(document.getElementById("infoInput").value != "") {
        const contract = new ethers.Contract(sessionStorage.getItem("multisigAddress"), MultisigABI, provider);
        const txResponse = await contract.connect(signer).voteOnProposal(document.getElementById("infoInput").value, result)
    }
}

async function claimProposal() {
    if(document.getElementById("infoInput").value != "") {
        const contract = new ethers.Contract(sessionStorage.getItem("multisigAddress"), MultisigABI, provider);
        const txResponse = await contract.connect(signer).claimProposal(document.getElementById("infoInput").value)
    }
}