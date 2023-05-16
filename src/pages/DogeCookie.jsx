/** @format */

import { Web3Button } from "@web3modal/react";
import React, { useState } from "react";
import { presaleAbi, presaleAddress } from "../integration/constants";
import { useAccount, useContractWrite } from "wagmi";
import { ethers, parseEther } from "ethers";
import Web3 from "web3";

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

  const handleEthAmountChange = (e) => {
    setEthAmount(e.target.value);
  };

  const handleUsdtAmountChange = (e) => {
    setUsdtAmount(e.target.value);
  };

  const handleReferralCodeChange = (e) => {
    setReferralCode(e.target.value);
  };
  const { address, isConnecting, isDisconnected } = useAccount();
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: presaleAddress,
    abi: presaleAbi,
    functionName: "buyWithNativeToken",
  });

  const handleBuyToken = () => {
    // Perform the purchase token logic here
    console.log("Buy button clicked!");
    console.log("Buying Method:", buyingMethod);
    console.log("ETH Amount:", ethAmount);
    console.log("USDT Amount:", usdtAmount);
    console.log("Referral Code:", referralCode);

    let ethersToWei = Web3.utils.toWei(ethAmount, "ether");
    console.log(ethersToWei);
    write({
      args: [ethersToWei, referralCode],
      from: address,
      value: parseEther(ethAmount),
    });
  };

  const handleBuyingMethodChange = (method) => {
    setBuyingMethod(method);
  };

  return (
    <div style={styles.container}>
      <Web3Button />
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
