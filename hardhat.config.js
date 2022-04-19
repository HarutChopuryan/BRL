require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  defaultNetwork: "aurora",
  networks: {
      hardhat: {},
      aurora: {
          url: "https://mainnet.aurora.dev",
          accounts: ["2d73fefdd38474fd953d368cc128463b60d55496dea47faf8f85629d3765b90a"],
      },
  },
  solidity: {
      version: "0.8.12",
      settings: {
          optimizer: {
              enabled: true,
              runs: 200,
          },
      },
  },
  mocha: {
      enableTimeouts: false,
      timeout: 60000,
  },
};
