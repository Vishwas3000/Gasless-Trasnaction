require("dotenv").config()

require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-ethers")
require("@openzeppelin/hardhat-defender")
require("@openzeppelin/hardhat-upgrades")

task("accounts", "Prints the list of accounts", async () => {
    const accounts = await ethers.getSigners()

    for (const account of accounts) {
        console.log(account.address)
    }
})

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.9",
    networks: {
        local: {
            url: "http://localhost:8545",
        },
        goerli: {
            url: "https://rpc.goerli.mudit.blog",
            accounts: [process.env.PRIVATE_KEY],
        },
        sepolia: {
            url: "https://rpc.sepolia.org",
            accounts: [process.env.PRIVATE_KEY],
        },
    },
}
