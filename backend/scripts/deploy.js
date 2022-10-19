const hre = require("hardhat");

async function main() {
    const approvedAddresses = ["0xa11f5bA3518abA132b9235196Ec988A2A5F410E1", "0xA6C661f412f4ccb31e136bc0a5aFc65f70F3c5Ee", "0xe3827e5A1caf1e56e0a85e9dBE3D1c65Cb0375bc"];
  
    const MultisigWallet = await hre.ethers.getContractFactory("MultisigWallet");
    const MultisigWalletDeploy = await MultisigWallet.deploy(approvedAddresses, 50);
    await MultisigWalletDeploy.deployed();

    console.log("Multisig Wallet Address: " + MultisigWalletDeploy.address);

    const CreateMultisig = await hre.ethers.getContractFactory("CreateMultisigWallet");
    const CreateMultisigDeploy = await CreateMultisigWallet.deploy();
    await CreateMultisigDeploy.deployed();

    console.log("Create Multisig Wallet address: " + CreateMultisigDeploy.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });