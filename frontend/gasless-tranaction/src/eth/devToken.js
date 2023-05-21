import { ethers } from "ethers"
import { DevToken as address } from "../constants/deploy.json"
import DevTokenAbi from "../constants/abi-devToken.json"

const abi = DevTokenAbi

export function createInstance(provider) {
    const devToken = new ethers.Contract(address, abi, provider)
    console.log("devToken Instance", devToken)
    return devToken
}
