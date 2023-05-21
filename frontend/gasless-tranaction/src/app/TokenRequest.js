import { useRef, useState, useContext } from "react"
import { requestToken } from "../eth/devTokenRequestTx"
import { EthereumContext } from "../eth/context"
import { toast } from "react-toastify"
import "./TokenRequest.css"
import { ethers } from "ethers"

function TokenRequest() {
    const reqDevTokenAmount = useRef(null)
    const [submitting, setSubmitting] = useState(false)
    const { devTokenIns, provider } = useContext(EthereumContext)

    const sendTx = async (event) => {
        event.preventDefault()

        const amount = reqDevTokenAmount.current.value
        const amountInwei = ethers.utils.parseEther(amount)

        setSubmitting(true)

        try {
            const response = await requestToken(devTokenIns, provider, amountInwei)
            const hash = response.hash
            const onClick = hash ? () => window.open(`https://sepolia.etherscan.io/tx/${hash}`) : undefined
            toast("Transaction sent!", { type: "info", onClick })
            reqDevTokenAmount.current.value = ""
        } catch (err) {
            toast(err.message || err, { type: "error" })
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="Container space-y-2">
            <label className=" flex flex-col ">
                <span className=" flex justify-start text-gray-700 font-extralight text-sm py-1">DevToken Faucet</span>
                <form onSubmit={sendTx}>
                    <input
                        className="form-input mt-1 block w-full"
                        placeholder="Enter DT amount"
                        ref={reqDevTokenAmount}
                        style={{ color: "black" }}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                    >
                        {submitting ? "Requesting..." : "Request"}
                    </button>
                </form>
                <span className=" flex justify-start text-gray-700 font-extralight text-sm mt-5">
                    Max Request Limit: 100 DT
                </span>
            </label>
        </div>
    )
}

export default TokenRequest
