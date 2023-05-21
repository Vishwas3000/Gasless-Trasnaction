import { ethers } from "ethers"
import DevTokenAbi from "../constants/abi-devToken.json"
import { DevToken } from "../constants/deploy.json"

export default async function getBalanceDT(provider, accountAddress) {
    const abi = DevTokenAbi
    const tokenContract = new ethers.Contract(DevToken, abi, provider)

    const balanceInWei = await tokenContract.balanceOf(accountAddress)
    const balance = ethers.utils.formatEther(balanceInWei)
    return balance
}
