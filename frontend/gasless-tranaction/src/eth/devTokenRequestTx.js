import { ethers } from "ethers"
import { createInstance } from "./forwarder"
import { signMetaTxRequest } from "./signer"

async function sendTx(devToken, amount) {
    console.log(`Sending tx to mint DT=${amount}`)
    return devToken.mint(amount)
}

async function sendMetaTx(devToken, provider, signer, amount) {
    const url = process.env.NEXT_PUBLIC_WEBHOOK_URL
    console.log(`Using relayer url=${url}`)
    if (!url) throw new Error(`Missing relayer url`)

    const forwarder = createInstance(provider)
    const from = await signer.getAddress()
    const data = devToken.interface.encodeFunctionData("mint", [amount])
    const to = devToken.address

    const request = await signMetaTxRequest(signer.provider, forwarder, {
        to,
        from,
        data,
    })

    return fetch(url, {
        method: "POST",
        body: JSON.stringify(request),
        headers: { "Content-Type": "application/json" },
    })
}

export async function requestToken(contractIns, provider, amount) {
    console.log("ContractIns: ", contractIns)
    if (!amount) throw new Error(`Amount cannot be empty`)
    if (!window.ethereum) throw new Error(`User wallet not found`)

    await window.ethereum.enable()
    const userProvider = new ethers.providers.Web3Provider(window.ethereum)
    const userNetwork = await userProvider.getNetwork()

    if (userNetwork.chainId !== 11155111) throw new Error(`Please switch to Sepolia for signing`)

    const signer = userProvider.getSigner()
    const from = await signer.getAddress()
    const balance = await provider.getBalance(from)

    const canSendTx = balance.gt(1e15)
    console.log(`User balance=${balance.toString()} canSendTx=${canSendTx}`)
    if (canSendTx) return sendTx(contractIns.connect(signer), amount)
    else return sendMetaTx(contractIns, provider, signer, amount)
}

// export async function registerName(registry, provider, name) {
//     if (!name) throw new Error(`Name cannot be empty`)
//     if (!window.ethereum) throw new Error(`User wallet not found`)

//     await window.ethereum.enable()
//     const userProvider = new ethers.providers.Web3Provider(window.ethereum)
//     const userNetwork = await userProvider.getNetwork()
//     if (userNetwork.chainId !== 11155111) throw new Error(`Please switch to Sepolia for signing`)

//     const signer = userProvider.getSigner()
//     const from = await signer.getAddress()
//     const balance = await provider.getBalance(from)

//     const canSendTx = balance.gt(1e15)
//     if (canSendTx) return sendTx(registry.connect(signer), name)
//     else return sendMetaTx(registry, provider, signer, name)
// }
