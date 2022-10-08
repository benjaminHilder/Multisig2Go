import {provider, signer, MultisigWalletAddress, MultisigABI, connectMetamask} from "./utils.js"

connectMetamask();

window.onload = function() {
    displayProposals();
}

async function displayProposals() {
    const contract = new ethers.Contract(MultisigWalletAddress, MultisigABI, provider);
    let proposals = ""
    for (i = 0; i < await contract.proposalIterator(); i++) {
        proposals += i+1 +")<br>"
        proposals += "Title: " +  await contract.getProposalTitle(i) + "<br>";
        proposals += "Description: " + await contract.getProposalDescription(i) + "<br> <br>";
    }
    document.getElementById("proposals").innerHTML = proposals;
}

//async function connectMetamask() {
//    await provider.send("eth_requestAccounts", []);
//
//    signer = await provider.getSigner();
//
//    const network = await provider.getNetwork();
//    let chainName = network.name;
//
//    var button = await document.getElementById("connectWalletButton");
//    button.remove();
//    
//    if (chainName === "goerli") {
//        document.getElementById("connectedText").innerHTML = "Goerli Chain Connected ✔️"
//    }
//    else {
//        document.getElementById("connectedText").innerHTML = "Incorrect Chain ❌ Please Connect To Goerli Chain"
//    }
//
//    console.log("Account address: ", await signer.getAddress())
//    console.log("chain name: " + chainName)
//}