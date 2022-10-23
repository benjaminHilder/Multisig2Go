import {provider, signer, MultisigABI, connectMetamask, changeSelectedMultisig} from "./utils.js"

//
const interval = setInterval(function() {
    getEthBalance();
}, 0)

window.onload = async function() {
    changeSelectedMultisig()
    
    //getAllApprovers();
    connectMetamask();
    
    document.getElementById("depositEthButton").addEventListener("click", depositEth, false);
    document.getElementById("connectWalletButton").addEventListener("click", connectMetamask, false);

    console.log("provider " +  provider)
    console.log("signer " + signer)

}

async function depositEth() {
    const contract = new ethers.Contract(sessionStorage.getItem("multisigAddress"), MultisigABI, provider);
    const txResponse = await contract.connect(signer).deposit({value: ethers.utils.parseEther(document.getElementById("depositEthInput").value)});
}

async function getEthBalance() {
    let bal = ethers.utils.formatEther(await provider.getBalance(sessionStorage.getItem("multisigAddress")));
    document.getElementById("ethBalance").innerHTML = bal + " ETH   "
}

async function getAllApprovers() {
    const contract = new ethers.Contract(sessionStorage.getItem("multisigAddress"), MultisigABI, provider);
    let approvers = await contract.getAllApprovers();
    approvers = await approvers.toString().split(",")

    for (let i = 0; i < approvers.length; i++) {
        if (await contract.approverName(approvers[i]) != "") {
            approvers[i] = await contract.approverName(approvers[0])
        }
    }
    
    document.getElementById("allApproversText").innerHTML = approvers
}