import {provider, signer, Multisig2GoAddress, Multisig2GoABI, connectMetamask, changeSelectedMultisig} from "./utils.js"

export let addresses = [];

window.onload = function() {
    changeSelectedMultisig()

    connectMetamask();

    document.getElementById("connectWalletButton").addEventListener("click", connectMetamask, false);
    document.getElementById("addAddress").addEventListener("click", manageWalletAddresses, false);
}

function manageWalletAddresses() {
    if (ethers.utils.isAddress(document.getElementById('createWalletAddresses').value) == false) {
        alert("Please enter a valid eth address") 

    } else {
        addWalletToList(document.getElementById("createWalletAddresses").value);
    }
}

function addWalletToList(address) {
    addresses.push(address)

    let newAddressDiv = document.createElement("div");
    let newAddressSpan = document.createElement("span");
    let newAddressDeleteButton = document.createElement("button");

    newAddressDiv.className = "address"

    newAddressSpan.id = "name"
    newAddressSpan.textContent = address

    newAddressDeleteButton.className = "standardButton delete";
    newAddressDeleteButton.textContent = "X";

    setupRemoveButton(newAddressDeleteButton, newAddressDiv, newAddressSpan);

    newAddressDiv.appendChild(newAddressSpan);
    newAddressDiv.appendChild(newAddressDeleteButton);

    document.getElementById("walletAddresses").appendChild(newAddressDiv)

}

function setupRemoveButton(btn, div) {
    btn.onclick = () => {
        addresses.pop(btn);
        div.remove();
        btn.remove();
    }
}

document.querySelector("#createMultisigButton").onclick = async function() {
    const contract = new ethers(Multisig2GoAddress, Multisig2GoABI, provider);
    const txResponse = await contract.connect(signer).createMultisig(addresses, document.getElementById("createWalletAddresses").value)
}