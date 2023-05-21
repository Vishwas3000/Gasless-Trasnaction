const { verify } = require("../utils/verify.js")
const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { data } = require("../deploy.json")

module.exports = async ({ deployments }) => {
    console.log("Verifing...")
    const { log } = deployments

    const args = [data.MinimalForwarder]

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("...Verifying")
        await verify(data.Registry, args)
    }
}

module.exports.tags = ["all", "registry"]
