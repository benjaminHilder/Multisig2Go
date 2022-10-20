const hre = require("hardhat");

async function main() {
    //const approvedAddresses = ["0xa11f5bA3518abA132b9235196Ec988A2A5F410E1", "0xA6C661f412f4ccb31e136bc0a5aFc65f70F3c5Ee", "0xe3827e5A1caf1e56e0a85e9dBE3D1c65Cb0375bc"];

    const Multisig2Go = await hre.ethers.getContractFactory("Multisig2Go");
    const Multisig2GoDeploy = await Multisig2Go.deploy();
    await Multisig2GoDeploy.deployed();

    console.log("Multisig2Go: " + Multisig2GoDeploy.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });