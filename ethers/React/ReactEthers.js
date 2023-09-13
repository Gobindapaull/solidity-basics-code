import { ethers } from "ethers";
import "./App.css";

import ABI from './ABI/ABI.json';
const address = "0xC712827edfaa5FD2D902dddBA35F44F7186BcEec";
const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org");
const contract = new ethers.Contract(address, ABI, provider);

function App() {

  const buy = async () => {

    const price = await contract.price()

      console.log('buy')
      console.log(ethers.version)
      console.log(address)
      console.log(ABI)
      console.log(provider)
      console.log(contract)
      console.log('token price: ', price)
  }

  return (
    
    <div className="App">
      <h1>React Js + Ethers Js</h1>
      <div className="card">
        <h3>BNB Amount</h3>
        <input type="number" min={0.001} />
        <button onClick={() => {buy()}}>
        Buy
        </button>
      </div>
    </div>
  );
}

export default App;
