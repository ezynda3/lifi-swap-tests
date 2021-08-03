import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import dotenv from 'dotenv'
dotenv.config()

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

export default {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      forking: {
        url: process.env.RPC_URL,
        blockNumber: 12951174
      }
    },
  },
  solidity: "0.8.6",
};