import { useState, useEffect } from "react";
import { ethers } from "ethers";
import marketTokenAbi from "../artifacts/contracts/Supermarket.sol/Supermarket.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [saleprice, setsalesprice] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [Discount, setDiscount] = useState(undefined);
  const [Status, setStatus] = useState(undefined );
   const [supercoins, setsupercoins] = useState(undefined);
  const [customerName , setcustomerName] = useState(undefined);
  const [totaltransaction, settotaltransaction] = useState(0);
  const [itemPrice, setitemPrice] = useState(0);
  const [currentbalance, setcurentbalance] = useState(0);
  const [BuyItemName, setBuyItemName] = useState("");
  const [items, setItems] = useState([]);


  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const superMarketABI = marketTokenAbi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account.length > 0) {
      console.log("Account connected: ", account);
      setAccount(account[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    getsuperMarketContract();
  };

  const getsuperMarketContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const SupermarketContract = new ethers.Contract(contractAddress, superMarketABI, signer);

    setsalesprice(SupermarketContract);
  };

  const getFunds = async () => {
    if (saleprice) {
      setBalance((await saleprice.getFunds()).toNumber());
  console.log(balance);
    }
  };
const getDiscountPrice = async () => {
    if (saleprice) {
      setDiscount((await saleprice.getDiscountPrice()).toNumber());
       if(Discount>0){
        setitemPrice(Discount);
       }
    }
  };
  const checkDiscount=async()=>{
   if (saleprice) {
      setStatus((await saleprice.checkDiscount(account)).toNumber());
    }
  }
  const getBonusCoins = async () => {
    if (saleprice) {
      setsupercoins((await saleprice.getBonusCoins()).toNumber());
    }
  };
  const getcustomerName = async () => {
    if (saleprice) {
      setcustomerName(await saleprice.getName());
    }
  };

  const Addmoney = async () => {
    if (saleprice && currentbalance > 0) {
      let tx = await saleprice.Addmoney(account, currentbalance);
      await tx.wait();
      getFunds();
    }
  };


  const BuyItem = async () => {
    if (saleprice && itemPrice > 0 && BuyItemName) {
      let tx = await saleprice.BuyItem(account, itemPrice);
      await tx.wait();
      getFunds();
      getTransaction();
      getBonusCoins();
      if (BuyItemName.trim()) {
      setItems([...items, BuyItemName]);
      setBuyItemName('');
    }}
  };
   const DiscountPrice = async () => {
    if (saleprice && itemPrice > 0) {
      let tx = await saleprice.DiscountPrice(account, itemPrice);
      await tx.wait();
      getDiscountPrice();}
  };

  const getTransaction=async()=>{
    settotaltransaction(totaltransaction+1);
  }

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask to use this application.</p>;
    }

    if (!account) {
      return (
        <button onClick={connectAccount}>
          Please connect your MetaMask wallet
        </button>
      );
    }

    if (balance === undefined) {
      getFunds();
    }

  

    if (customerName === undefined) {
      getcustomerName();
    }
    
    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Customer Name : {customerName}</p>
        <p>Total Transaction:{totaltransaction}</p>
        <p>Your Balance: {balance}</p>
        <p>supercoins:{supercoins}</p>
        <div>
          <input
            type="number"
            value={currentbalance}
            onChange={(e) => setcurentbalance(Number(e.target.value))}
            placeholder="deposit money wallet for shopping"
          />
          <button onClick={Addmoney}>Add money </button>
        </div>
        <div>
          <input
            type="number"
            value={itemPrice}
            onChange={(e) =>setitemPrice(Number(e.target.value))}
            placeholder="Amount "
          />
          <input
            type="text"
            value={BuyItemName}
            onChange={(e) => setBuyItemName(e.target.value)}
            placeholder="Item name"
          />
          <button onClick={BuyItem}>Buy Item</button>
        </div>
       <fieldset>
          <legend>Supermarket Discounts and Purchases</legend>
          <section className="discount-section">
            <h2>Discount Details</h2>
             <button onClick={checkDiscount}>Check Discount</button>
             <p>Status :{Status}</p>
            <button onClick={DiscountPrice}>Get Discount Price</button>
            <p>Discount Price: <strong>{Discount}</strong></p>
          </section>
          <section className="purchased-items-section">
            <h2>Items Purchased</h2>
            <ol>
              {items.map((item, index) => (
                <li key={index}>
                  {index + 1}. {item}
                </li>
              ))}
            </ol>
          </section>
        </fieldset>
        
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Welcome to Supermarket !</h1>
      </header>
      {initUser()}
      <style jsx>
        {`
          .container {
            text-align: center;
          }
        `}
      </style>
    </main>
  );
}
