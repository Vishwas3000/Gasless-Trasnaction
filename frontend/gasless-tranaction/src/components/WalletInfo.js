import { ethers } from "ethers"
import { useEffect, useState } from "react"
import getBalanceDT from "../eth/getBalanceDT"

function formatAccount(address) {
    return address.slice(0, 6) + "..." + address.slice(-4)
}

function WalletInfo() {
    const [accountAddress, setAccountAddress] = useState("")
    const [accountBalance, setAccountBalance] = useState("")

    function handleAccountsChanged() {
        setAccountAddress(0)
    }

    window.ethereum.on("accountsChanged", handleAccountsChanged)

    useEffect(() => {
        const getAccountAddress = async () => {
            if (window.ethereum) {
                await window.ethereum.enable()

                const provider = new ethers.providers.Web3Provider(window.ethereum)
                const signer = provider.getSigner()
                const address = await signer.getAddress()
                const balance = await getBalanceDT(provider, address)

                setAccountBalance(balance + " DT")

                setAccountAddress(formatAccount(address))
            } else {
            }
        }

        getAccountAddress()
    }, [accountAddress])
    return (
        <div className="rounded-lg shadow-lg">
            <div className=" bg-white rounded-lg p-4 text-violet-950 flex flex-row">
                {" "}
                <h2 className="name rounded-lg p-2">{accountAddress}</h2>
                <p className="value border border-gray-300 rounded-lg p-2">{accountBalance}</p>
            </div>
        </div>
    )
}

export default WalletInfo
