const { DefenderRelayProvider, DefenderRelaySigner } = require("defender-relay-client/lib/ethers")
const { ethers } = require("hardhat")
const { writeFileSync } = require("fs")

async function main() {
    require("dotenv").config()
    const credentials = {
        apiKey: process.env.RELAYER_API_KEY,
        apiSecret: process.env.RELAYER_API_SECRET,
    }
    const provider = new DefenderRelayProvider(credentials)
    const relaySigner = new DefenderRelaySigner(credentials, provider, {
        speed: "fast",
    })

    const Forwarder = await ethers.getContractFactory("MinimalForwarder")
    const forwarder = await Forwarder.connect(relaySigner)
        .deploy()
        .then((f) => f.deployed())

    const maxTokenLimit = ethers.utils.parseEther("100000000")
    const maxHoldLimit = ethers.utils.parseEther("100")

    const DevToken = await ethers.getContractFactory("DevToken")
    const devToken = await DevToken.connect(relaySigner)
        .deploy(maxTokenLimit, maxHoldLimit, forwarder.address)
        .then((f) => f.deployed())

    writeFileSync(
        "deploy.json",
        JSON.stringify(
            {
                MinimalForwarder: forwarder.address,
                DevToken: devToken.address,
            },
            null,
            2
        )
    )

    console.log(`MinimalForwarder: ${forwarder.address}\nDevToken: ${devToken.address}`)
}

if (require.main === module) {
    main()
        .then(() => process.exit(0))
        .catch((error) => {
            console.error(error)
            process.exit(1)
        })
}
