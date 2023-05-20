/** @format */

import React, { useEffect, useState } from "react";
import {
  bnbPresaleAddress,
  bnbUsdAddress,
  ethPresaleAddress,
  ethUsdAddress,
  presaleAbi,
  tokenAbi,
} from "../integration/constants";
import { Button, Modal, Form } from "react-bootstrap";
import { parseEther } from "ethers";
import Web3 from "web3";
import { toast } from "react-toastify";
import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import { useNetwork, useWalletClient } from "wagmi";
import { useAccount } from "wagmi";
import { useSwitchNetwork } from "wagmi";
import { useChainId } from "wagmi";
import { useWaitForTransaction } from "wagmi";
import "./Presale.css";
import { Col, Container, Row } from "react-bootstrap";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    gap: "10px",
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
  const [buyingMethod, setBuyingMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [notifyText, setNotifyText] = useState("Sending transaction");
  const [contractAddress, setContractAddress] = useState(bnbPresaleAddress);
  const [currentAbi, setAbi] = useState(presaleAbi);
  const [functionName, setFunctionName] = useState("buyWithNativeToken");
  const [transactionType, setTransactionType] = useState(3);
  const [approveTransactionHash, setApproveTransactionHash] = useState("");
  const [buyUsdtTransactionHash, setBuyUsdtTransactionHash] = useState("");
  const [buyNativeTransactionHash, setBuyNativeTransactionHash] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [tokensPerUsdt, setTokensPerUsdt] = useState(1000);
  const [expectedTokens, setExpectedTokens] = useState(0);
  const [usdtData, setUsdtData] = useState({
    value: "",
  });
  const [ethPrice, setEthPrice] = useState(0);
  const [bnbPrice, setBnbPrice] = useState(0);

  // const { } = useWeb3Modal()
  /**
   * Transaction Types :
   *
   * 0-> No transaction
   *
   * 1-> Approve usdt eth
   * 2-> Buy with Usdt eth
   * 3-> Buy with native eth
   *
   * 10 -> Approve usdt bnb
   * 20 -> Buy with Usdt bnb
   * 30 -> Buy with native bnb
   *
   */
  let chainId = useChainId();
  const { data } = useWalletClient();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();
  const { address, isConnected } = useAccount();

  const {
    isLoading: approveIsLoading,
    isSuccess: approveIsSuccess,
    isError: approveIsError,
  } = useWaitForTransaction({
    hash: approveTransactionHash,
  });
  const {
    isLoading: buyUsdtIsLoading,
    isSuccess: buyUsdtIsSuccess,
    isError: buyUsdtIsError,
  } = useWaitForTransaction({
    hash: buyUsdtTransactionHash,
  });
  const {
    isLoading: buyNativeIsLoading,
    isSuccess: buyNativeIsSuccess,
    isError: buyNativeIsError,
  } = useWaitForTransaction({
    hash: buyNativeTransactionHash,
  });

  useEffect(() => {
    console.log(
      "Approve : ",
      approveIsLoading,
      approveIsSuccess,
      approveIsError
    );
    if (approveIsLoading) {
      setLoading(true);
      toast.success("Transaction sent");
    }
    if (approveIsSuccess) {
      setLoading(false);
      toast.success("Transaction successful");
      buyWithUsdt();
    }
    if (approveIsError) {
      toast.error("Something went wrong");
    }
  }, [approveIsLoading, approveIsSuccess, approveIsError]);

  useEffect(() => {
    console.log(buyNativeIsLoading, buyNativeIsSuccess, buyNativeIsError);
    if (buyNativeIsLoading) {
      setLoading(true);
      toast.success("Transaction sent");
    }
    if (buyNativeIsSuccess) {
      setLoading(false);
      toast.success("Transaction successful");
    }
  }, [buyNativeIsLoading, buyNativeIsSuccess, buyNativeIsError]);

  useEffect(() => {
    console.log(buyUsdtIsLoading, buyUsdtIsSuccess, buyUsdtIsError);
    if (buyUsdtIsLoading) {
      setLoading(true);
      toast.success("Transaction sent");
    }
    if (buyUsdtIsSuccess) {
      setLoading(false);
      toast.success("Transaction successful");
    }
  }, [buyUsdtIsLoading, buyUsdtIsSuccess, buyUsdtIsError]);

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

      if (!isConnected) {
        toast("Please connnect your wallet");
        setLoading(false);
        return;
      }
      console.log(chainId);
      if (!(chainId === 1 || chainId === 56 || chainId === 11155111)) {
        toast("Invalid chain");
        setLoading(false);
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
        await sendApproveTransaction(value, chainId);
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
  };
  const sendApproveTransaction = async (value, chainId) => {
    try {
      setLoading(true);
      setNotifyText("Sending Approve Transactoin");
      if (chainId === 56) {
        let result = await data.writeContract({
          abi: tokenAbi,
          address: bnbUsdAddress,
          functionName: "approve",
          args: [contractAddress, value.toString()],
          from: address,
        });
        console.log(result);
        setApproveTransactionHash(result);
      } else {
        let result = await data.writeContract({
          abi: tokenAbi,
          address: ethUsdAddress,
          functionName: "approve",
          args: [contractAddress, value.toString()],
          from: address,
        });
        console.log(result);
        setApproveTransactionHash(result);
      }
      setUsdtData({
        value: value,
      });
      setNotifyText("Awaiting Transaction confirmation");
    } catch (err) {
      setLoading(false);
      setNotifyText("Something went wrong");
      console.log(err);
    }
  };
  const buyWithUsdt = async () => {
    try {
      setLoading(true);
      setNotifyText("Sending Buy Transactoin");
      let value = usdtData.value;
      if (chainId === 56) {
        let result = await data.writeContract({
          abi: presaleAbi,
          address: bnbPresaleAddress,
          functionName: "buyWithUsdt",
          args: [value.toString(), referralCode],
          from: address,
        });
        console.log(result);
        setBuyUsdtTransactionHash(result);
      } else {
        let result = await data.writeContract({
          abi: presaleAbi,
          address: ethPresaleAddress,
          functionName: "buyWithUsdt",
          args: [value.toString(), referralCode],
          from: address,
        });
        console.log(result);
        setBuyUsdtTransactionHash(result);
      }
      setNotifyText("Awaiting Transaction confirmation");
    } catch (err) {
      setLoading(false);
      setNotifyText("Something went wrong");
      console.log(err);
    }
  };
  const buyWithNative = async (value) => {
    try {
      let presaleContract;
      if (chainId === 56) {
        presaleContract = bnbPresaleAddress;
      } else {
        presaleContract = ethPresaleAddress;
      }
      setContractAddress(presaleContract);
      setAbi(presaleAbi);
      setFunctionName("buyWithNativeToken");

      setNotifyText("Sending Buy Transaction");
      let ethersToWei = Web3.utils.toWei(ethAmount, "ether");
      if (chainId === 56) {
        let result = data.writeContract({
          abi: presaleAbi,
          address: bnbPresaleAddress,
          functionName: "buyWithNativeToken",
          args: [ethersToWei, referralCode],
          from: address,
          value: parseEther(ethAmount),
        });
        console.log(result);
        setBuyNativeTransactionHash(result);
      } else {
        let result = await data.writeContract({
          abi: presaleAbi,
          address: ethPresaleAddress,
          functionName: "buyWithNativeToken",
          args: [ethersToWei, referralCode],
          from: address,
          value: parseEther(ethAmount),
        });
        console.log(result);
        setBuyNativeTransactionHash(result);
      }
      setNotifyText("Awaiting Transaction confirmation");
    } catch (err) {
      setLoading(false);
      setNotifyText("Something went wrong");
      console.log(err);
    }
  };
  const updatePriceFromApi = async () => {
    let result = await fetch(
      "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT"
    );
    result = await result.json();
    let price = Number(result.price);
    setEthPrice(price);

    result = await fetch(
      "https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT"
    );
    result = await result.json();
    price = Number(result.price);
    setBnbPrice(price);
  };
  useEffect(() => {
    updatePriceFromApi();
  }, []);
  useEffect(() => {
    if (!isLoading && error == null && buyingMethod !== "") {
      handleBuyingMethodChange(buyingMethod);
    }
    console.log(error);
  }, [isLoading]);

  const handleBuyingMethodChange = (method) => {
    setBuyingMethod(method);
    if (method === "eth" || method === "erc20") {
      if (chainId !== 1) {
        toast.info("Wrong Network Detected! Switch your network first");
        switchNetwork(1);
      } else {
        handleModalOpen();
      }
    } else {
      if (chainId !== 56) {
        toast.info("Wrong Network Detected! Switch your network first");
        switchNetwork(56);
      } else {
        handleModalOpen();
      }
    }
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (buyingMethod === "eth" || buyingMethod === "bnb") {
      if (buyingMethod === "eth") {
        let tokens = ethPrice * ethAmount * tokensPerUsdt;
        setExpectedTokens(tokens);
      } else {
        let tokens = bnbPrice * ethAmount * tokensPerUsdt;
        setExpectedTokens(tokens);
      }
    } else {
      let tokens = usdtAmount * tokensPerUsdt;
      setExpectedTokens(tokens);
    }
    console.log(expectedTokens);
  }, [usdtAmount, ethAmount, buyingMethod]);
  return (
    <div style={styles.container}>
      <h1
        style={{
          fontSize: "50px",
          color: "white",
          fontWeight: "bold",
        }}
      >
        Doge Cookie Presale
      </h1>

      <Web3Button
        icon="hide"
        style={{
          transform: "scale(1.3)",
          marginTop: "10px",
        }}
      />
      <Row
        style={{
          display: "flex",
        }}
      >
        <Col>
          <button
            class="buy-button"
            onClick={() => handleBuyingMethodChange("eth")}
          >
            Buy With Eth
          </button>
        </Col>

        <Col>
          <button
            class="buy-button"
            onClick={() => handleBuyingMethodChange("erc20")}
          >
            Buy Now USDT (ERC20){" "}
          </button>
        </Col>
      </Row>
      <Row
        style={{
          display: "flex",
        }}
      >
        <Col>
          <button
            class="buy-button"
            onClick={() => handleBuyingMethodChange("bnb")}
          >
            Buy With BNB
          </button>
        </Col>
        <Col>
          <button
            class="buy-button"
            onClick={() => handleBuyingMethodChange("bep20")}
          >
            Buy Now USDT (BEP20){" "}
          </button>
        </Col>
      </Row>

      {isConnected ? (
        <div></div>
      ) : (
        <div
          style={{
            height: "100px",
          }}
        ></div>
      )}

      <Popup
        open={showModal}
        onClose={() => {
          handleModalClose();
        }}
      >
        <div>
          {buyingMethod === "eth" || buyingMethod === "bnb" ? (
            <div style={styles.inputContainer}>
              <label style={styles.label}>
                {buyingMethod === "eth" ? "Eth" : "Bnb"} Amount:
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
                USDT{buyingMethod === "erc20" ? " (ERC20)" : " (BEP20)"} &nbsp;
                Amount:
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
              Expected Token:
              <input
                style={styles.input}
                readOnly={true}
                type="text"
                value={expectedTokens}
              />
            </label>
          </div>
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
      </Popup>
    </div>
  );
}

export default DogeCookie;
