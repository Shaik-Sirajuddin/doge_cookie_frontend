/** @format */

import React, { useEffect, useState } from "react";
import {
  bnbPresaleAddress,
  bnbUsdAddress,
  ethPresaleAddress,
  ethUsdAddress,
  presaleAbi,
  presaleAddress,
  tokenAbi,
} from "../integration/constants";
import { ethers, parseEther, toBigInt } from "ethers";
import Web3 from "web3";
import { useConnectWallet } from "@web3-onboard/react";
import { toast } from "react-toastify";
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  radioContainer: {
    marginBottom: "20px",
  },
  inputContainer: {
    marginBottom: "20px",
  },
  label: {
    marginBottom: "10px",
  },
  input: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "200px",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "4px",
    background: "#4caf50",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

function DogeCookie() {
  const [ethAmount, setEthAmount] = useState("");
  const [usdtAmount, setUsdtAmount] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [buyingMethod, setBuyingMethod] = useState("ethereum");
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [ethersProvider, setProvider] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notifyText, setNotifyText] = useState("Sending transaction");

  useEffect(() => {
    // If the wallet has a provider than the wallet is connected
    if (wallet?.provider) {
      // setProvider(new ethers.providers.Web3Provider(wallet.provider, "any"));
      // if using ethers v6 this is:
      setProvider(new ethers.BrowserProvider(wallet.provider, "any"));
    }
  }, [wallet]);

  const handleEthAmountChange = (e) => {
    setEthAmount(e.target.value);
  };

  const handleUsdtAmountChange = (e) => {
    setUsdtAmount(e.target.value);
  };

  const handleReferralCodeChange = (e) => {
    setReferralCode(e.target.value);
  };
  const handleBuyToken = async () => {
    try {
      if (loading) return;  
      setLoading(true);
      // Perform the purchase token logic here
      console.log("Buy button clicked!");
      console.log("Buying Method:", buyingMethod);
      console.log("ETH Amount:", ethAmount);
      console.log("USDT Amount:", usdtAmount);
      console.log("Referral Code:", referralCode);

      if (ethersProvider === null) {
        toast("Please connnect your wallet");
        setLoading(false)
        return;
      }
      var chainId = parseInt((await ethersProvider.getNetwork()).chainId);
      if (!(chainId === 1 || chainId === 56 || chainId === 11155111)) {
        toast("Invalid chain");
        setLoading(false)
        return;
      }
      if (buyingMethod === "usdt") {
        let value = parseInt(usdtAmount);
        if (chainId === 56) {
          value = value * Math.pow(10, 18);
        } else {
          value = value * Math.pow(10, 18);
        }
        console.log(value);
        await buyWithUsdt(value, chainId);
      } else {
        let value = Web3.utils.toWei(ethAmount, "ether");
        console.log(value);
        await buyWithNative(value, chainId);
      }
    } catch (err) {
      toast(err);
      setLoading(false);
      console.log(err);
    }
    setLoading(false);
  };

  const buyWithUsdt = async (value, chainId) => {
    try {
      let presaleContract;
      let usdtContract;
      const signer = await ethersProvider.getSigner();
      let contractAddress;
      if (chainId === 56) {
        presaleContract = new ethers.Contract(
          bnbPresaleAddress,
          presaleAbi,
          signer
        );
        usdtContract = new ethers.Contract(bnbUsdAddress, tokenAbi, signer);
        contractAddress = bnbPresaleAddress;
      } else {
        presaleContract = new ethers.Contract(
          ethPresaleAddress,
          presaleAbi,
          signer
        );
        usdtContract = new ethers.Contract(ethUsdAddress, tokenAbi, signer);
        contractAddress = ethPresaleAddress;
      }

      setNotifyText("Sending Approve Transactoin");
      let tx = await usdtContract.approve(contractAddress, value.toString());
      console.log("Before approve wait : ", tx);
      setNotifyText("Awaiting Transaction confirmation");
      tx = await tx.wait();
      setNotifyText("Sending Buy Transaction");
      let mintTx = await presaleContract.buyWithUsdt(
        value.toString(),
        referralCode
      );
      console.log("Before buyWithUsdt wait : ", mintTx);
      setNotifyText("Awaiting Transaction confirmation");
      mintTx = await mintTx.wait();
      setNotifyText("Buy success");
    } catch (err) {
      setNotifyText("Something went wrong");
      console.log(err);
    }
  };

  const buyWithNative = async (value, chainId) => {
    try {
      let presaleContract;
      const signer = await ethersProvider.getSigner();
      if (chainId === 56) {
        presaleContract = new ethers.Contract(
          bnbPresaleAddress,
          presaleAbi,
          signer
        );
      } else {
        presaleContract = new ethers.Contract(
          ethPresaleAddress,
          presaleAbi,
          signer
        );
      }
      setNotifyText("Sending Buy Transaction");
      let mintTx = await presaleContract.buyWithNativeToken(
        value.toString(),
        referralCode,
        {
          value : value.toString()
        }
      );
      console.log("Before buyWithNative wait : ", mintTx);
      setNotifyText("Awaiting Transaction confirmation");
      mintTx = await mintTx.wait();
      setNotifyText("Buy success");
    } catch (err) {
      setNotifyText("Something went wrong");
      console.log(err);
    }
  };

  const handleBuyingMethodChange = (method) => {
    setBuyingMethod(method);
  };

  return (
    <div style={styles.container}>
      <button
        disabled={connecting}
        onClick={() => (wallet ? disconnect(wallet) : connect())}
      >
        {connecting ? "connecting" : wallet ? "disconnect" : "connect"}
      </button>
      <h1>Token Purchase Page</h1>
      <div style={styles.radioContainer}>
        <label style={styles.label}>
          <input
            type="radio"
            value="ethereum"
            checked={buyingMethod === "ethereum"}
            onChange={() => handleBuyingMethodChange("ethereum")}
          />
          Buy with Ethereum
        </label>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <label style={styles.label}>
          <input
            type="radio"
            value="usdt"
            checked={buyingMethod === "usdt"}
            onChange={() => handleBuyingMethodChange("usdt")}
          />
          Buy with USDT
        </label>
      </div>

      {buyingMethod === "ethereum" ? (
        <div style={styles.inputContainer}>
          <label style={styles.label}>
            Ethereum Amount:
            <input
              style={styles.input}
              type="number"
              step={"any"}
              value={ethAmount}
              onChange={handleEthAmountChange}
            />
          </label>
        </div>
      ) : (
        <div style={styles.inputContainer}>
          <label style={styles.label}>
            USDT Amount:
            <input
              style={styles.input}
              type="number"
              step={"any"}
              value={usdtAmount}
              onChange={handleUsdtAmountChange}
            />
          </label>
        </div>
      )}
      <div style={styles.inputContainer}>
        <label style={styles.label}>
          Referral Code:
          <input
            style={styles.input}
            type="text"
            value={referralCode}
            onChange={handleReferralCodeChange}
          />
        </label>
      </div>
      <button style={styles.button} onClick={handleBuyToken}>
        Buy
      </button>
    </div>
  );
}

export default DogeCookie;
