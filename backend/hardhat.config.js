require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

//goerli
//contract address 0xD3150Eeb704a6caEAaBF812335ceb3804B76618A
//0x6e083659a485f2ecc0b740a5b6e1913881bce65b
//0x71ee163df5fc2c93333a8880b671ab2aa190ed6a
//0x059F1b685D297ef48D2e1deB6a3090F132358B24
//0x132Fbe54C3736a39660b008364EB719980F701a5

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli:{
      url: process.env.ALCHEMY_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
