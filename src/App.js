import logo from "./logo.svg";
import "./App.css";
import { ethers } from "ethers";
import { useState } from "react";

function App() {
    const [contractAddress, setContractAddress] = useState(
        "0x790F503Eb1C3F03D747B2C9321d759A81374876c"
    );

    const [addressExists, setaddressExists] = useState(false);

    const abi = [
        // Read-Only Functions
        "function balanceOf(address owner) view returns (uint256)",
        "function decimals() view returns (uint8)",
        "function symbol() view returns (string)",

        // Authenticated Functions
        "function transfer(address to, uint amount) returns (bool)",

        // Events
        "event Transfer(address indexed from, address indexed to, uint amount)",
    ];

    async function findContract() {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            await provider.send("eth_requestAccounts", []);

            // // 2) signer
            const signer = provider.getSigner();

            const address = await signer.getAddress();

            // 3) contract object once connected
            const contract = new ethers.Contract(contractAddress, abi, signer);
            let connected = contract.connect(provider);
            // let balance = await contract.balanceOf(address);
            // console.log(balance.toNumber());

            provider
                .getCode(contractAddress)
                .then(() => {
                    console.log("tes");
                    setaddressExists(true);
                })
                .catch((error) => {
                    console.log("bjbjbsdkj");
                    setaddressExists(false);
                });
        } catch (error) {
            console.log(error);
        }

        // console.log(balance.toNumber());
    }

    return (
        <div className="App">
            <input
                type="text"
                onChange={(e) => setContractAddress(e.target.value)}
                value={contractAddress}
            />
            <button onClick={findContract}>Search</button>
            {addressExists ? <Nfc /> : <div>Contract doesn't exist</div>}
        </div>
    );
}

const Nfc = () => {
    return <div className="nfc">NFC activated</div>;
};

export default App;
