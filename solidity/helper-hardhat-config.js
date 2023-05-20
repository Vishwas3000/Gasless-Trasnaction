const networkConfig = {
    default: {
        name: "sepolia",
    },
    31337: {
        name: "localhost",
    },
    5: {
        name: "goerli",
    },
    1: {
        name: "mainnet",
    },
    11155111: {
        name: "sepolia",
    },
    80001: {
        name: "polygonMumbai",
    },
}

const developmentChains = ["hardhat", "localhost"]

module.exports = {
    networkConfig,
    developmentChains,
}
