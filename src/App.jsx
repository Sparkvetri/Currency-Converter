import { useEffect, useState } from 'react'
 import './App.css'
 import myImage from './assets/logo.jpeg'
 import axios from "axios"

function App() {
  const [amount,setAmount] = useState();
  const [fromcurrency,setFromcurrency] = useState("USD");
  const [tocurrency,setTocurrency] = useState("INR");
  const [covertedamount,setConvertedamount] = useState();
  const [exchangerate,setExchangerate] = useState(null);

  useEffect(()=>{
    const getExchange = async () =>{
      try { 
        let url = `https://v6.exchangerate-api.com/v6/dd4dd975d55a799aab98d0fc/latest/${fromcurrency}`;
        const res = await axios.get(url);
       // console.log (res);
       setExchangerate(res.data.conversion_rates
[tocurrency]);
      }catch (error){console.error("Error Fetching exchange rate:", error)}
    }
    getExchange();
   },[fromcurrency,tocurrency]);
   useEffect(()=>{
    if (exchangerate!== null){
      setConvertedamount((amount*exchangerate).toFixed(2));
    }
   },[amount,exchangerate])
  
 function Handleamount(e) {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value)? 0 : value);
  }
  function Handlefrom(e){
    setFromcurrency(e.target.value);
  }
   function Handleto(e){
    setTocurrency(e.target.value);
   }
  return (
    <>
    <div className="currency-converter">
      <div className="logo">
        <img src={myImage} alt="" />
        <div><h2>CURRENCY CONVERTER</h2></div>
      </div>
      <div className="data">
        <div className="input">
          <label htmlFor="amount">Enter Amount</label>
          <input type="number"   id="amount" value={amount} onChange={Handleamount} />
        </div>
        <div className="input">
          <label htmlFor="from">From Currency</label>
          <select   id="from" value={fromcurrency} onChange={Handlefrom} >
            <option value="USD">USD - United States Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound Sterling</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="CNY">CNY - Chinese Yuan</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="BRL">BRL - Brazilian Real</option>
            <option value="ZAR">ZAR - South African Rand</option>
          </select>
        </div>
        <div className="input">
          <label htmlFor="to">To Currency</label>
          <select   id="to" value={tocurrency} onChange={Handleto} >
            <option value="USD">USD - United States Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound Sterling</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="CNY">CNY - Chinese Yuan</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="BRL">BRL - Brazilian Real</option>
            <option value="ZAR">ZAR - South African Rand</option>
          </select>
        </div>
        <div className="result">
          <p> {amount} {fromcurrency} is equal to {covertedamount} {tocurrency}</p>
        </div>
      </div>
    </div>
       
         
    </>
  )
}

export default App
