import { EthereumContext } from "../eth/context"
import { createProvider } from "../eth/provider"
import { createInstance } from "../eth/devToken"

import "./App.css"
import TokenRequest from "./TokenRequest"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import WalletInfo from "@/components/WalletInfo"

function App() {
    const provider = createProvider()
    const devTokenIns = createInstance(provider)
    const ethereumContext = { provider, devTokenIns }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Dev Token Faucet</h1>
                <p>Supports Gasless Transaction</p>
            </header>
            <section className=" justify-around w-2/3 mx-auto">
                <EthereumContext.Provider value={ethereumContext}>
                    <div className=" absolute right-10 top-10">
                        <WalletInfo />
                    </div>
                    <TokenRequest />
                </EthereumContext.Provider>
            </section>

            <ToastContainer hideProgressBar={true} />
        </div>
    )
}

export default App
