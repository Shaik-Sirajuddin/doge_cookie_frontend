/** @format */

import React, { useEffect, useState } from "react";
import {
  bnbChainId,
  bnbDckAddress,
  bnbPresaleAddress,
  bnbUsdAddress,
  ethChainId,
  ethDckAddress,
  ethPresaleAddress,
  ethUsdAddress,
  presaleAbi,
  tokenAbi,
} from "../integration/constants";
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
import { readContract } from "@wagmi/core";
import { MoonLoader } from "react-spinners";
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
    fontSize: "20px",
    fontWeight: "bold",
    width: "250px",
    display: "inline-block",
  },
  input: {
    width: "100%",
    padding: "10px 15px",
    color: "#000",
    fontSize: "18px",
    fontWeight: "bold",
    borderRadius: "5px",
    background: "#efefef",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "4px",
    background: "#4caf50",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  span: {
    fontSize: "20px",
    fontWeight: "bold",
  },
};

function DogeCookie() {
  const [ethAmount, setEthAmount] = useState("");
  const [usdtAmount, setUsdtAmount] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [buyingMethod, setBuyingMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [notifyText, setNotifyText] = useState("Sending transaction");
  const [approveTransactionHash, setApproveTransactionHash] = useState("");
  const [buyUsdtTransactionHash, setBuyUsdtTransactionHash] = useState("");
  const [buyNativeTransactionHash, setBuyNativeTransactionHash] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [tokensPerUsdt, setTokensPerUsdt] = useState(10000);
  const [expectedTokens, setExpectedTokens] = useState(0);
  const [usdtData, setUsdtData] = useState({
    value: "",
  });
  const [ethPrice, setEthPrice] = useState(0);
  const [bnbPrice, setBnbPrice] = useState(0);
  const [dckBalance, setDckBalance] = useState(0);

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
  const { error, isLoading, switchNetwork } = useSwitchNetwork();
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
      setLoading(false);
      toast.error("Something went wrong");
    }
  }, [approveIsLoading, approveIsSuccess, approveIsError]);

  useEffect(() => {
    console.log(
      "Native Buy",
      buyNativeIsLoading,
      buyNativeIsSuccess,
      buyNativeIsError
    );
    if (buyNativeIsLoading) {
      setLoading(true);
      toast.success("Transaction sent");
    }
    if (buyNativeIsSuccess) {
      setLoading(false);
      toast.success("Transaction successful");
    }
    if (buyNativeIsError) {
      setLoading(false);
      toast.error("Transaction failed!");
    }
  }, [buyNativeIsLoading, buyNativeIsSuccess, buyNativeIsError]);
  const getBalance = async () => {
    let dckAddress;
    if (chainId === bnbChainId) {
      dckAddress = bnbDckAddress;
    } else {
      dckAddress = ethDckAddress;
    }
    let result = await readContract({
      address: dckAddress,
      abi: tokenAbi,
      functionName: "balanceOf",
      args: [address],
    });
    result = Number(result) / Math.pow(10, 9);
    setDckBalance(result);
  };
  useEffect(() => {
    getBalance();
  }, [isConnected, chainId]);
  useEffect(() => {
    console.log(
      "USDT Buy : ",
      buyUsdtIsLoading,
      buyUsdtIsSuccess,
      buyUsdtIsError
    );
    if (buyUsdtIsLoading) {
      setLoading(true);
      toast.success("Transaction sent");
    }
    if (buyUsdtIsSuccess) {
      setLoading(false);
      toast.success("Transaction successful");
    }
    if (buyUsdtIsError) {
      setLoading(false);
      toast.error("Transaction failed!");
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
      if (!(chainId === ethChainId || chainId === bnbChainId)) {
        toast("Invalid chain");
        setLoading(false);
        return;
      }
      if (buyingMethod === "erc20" || buyingMethod === "bep20") {
        let value = parseInt(usdtAmount);
        if (chainId === bnbChainId) {
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
      let presaleContract;
      if (chainId === bnbChainId) {
        presaleContract = bnbPresaleAddress;
      } else {
        presaleContract = ethPresaleAddress;
      }
      setLoading(true);
      setNotifyText("Sending Approve Transactoin");
      if (chainId === bnbChainId) {
        let result = await data.writeContract({
          abi: tokenAbi,
          address: bnbUsdAddress,
          functionName: "approve",
          args: [presaleContract, value.toString()],
          from: address,
        });
        console.log(result);
        setApproveTransactionHash(result);
      } else {
        let result = await data.writeContract({
          abi: tokenAbi,
          address: ethUsdAddress,
          functionName: "approve",
          args: [presaleContract, value.toString()],
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
      setNotifyText("Sending Buy Transaction");
      let value = usdtData.value;
      if (chainId === bnbChainId) {
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
      setNotifyText("Sending Buy Transaction");
      let ethersToWei = Web3.utils.toWei(ethAmount, "ether");
      if (chainId === bnbChainId) {
        let result = await data.writeContract({
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
      if (chainId !== ethChainId) {
        toast.info("Wrong Network Detected! Switch your network to eth");
        switchNetwork(ethChainId);
      } else {
        handleModalOpen();
      }
    } else {
      if (chainId !== bnbChainId) {
        toast.info("Wrong Network Detected! Switch your network to bsc");
        switchNetwork(bnbChainId);
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
          // transform: "scale(1.3)",
          marginTop: "20px",
        }}
      />
      <w3m-network-switch></w3m-network-switch>

      {isConnected ? (
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "20px 40px",
            margin: "40px 20px",
            border: "2px solid grey",
            boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              margin: "20px",
            }}
          >
            <div
              style={{
                color: "black",
                fontSize: "22px",
                fontWeight: "bold",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              You have {dckBalance} $Dck
            </div>
          </div>

          <div className="button-holder">
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
          </div>
          <div className="button-holder">
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
          </div>
        </div>
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
        contentStyle={{
          padding: "70px 50px",
          border: "1px solid #25618B",
          borderRadius: "10px",
          minWidth: "300px",
          maxWidth: "550px",
        }}
        modal
        nested
      >
        {loading ? (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <MoonLoader
                cssOverride={{
                  display: "block",
                  margin: "0 auto",
                  borderColor: "red",
                }}
                size={100}
                color={"#123abc"}
                loading={true}
              />
              <div
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                {notifyText}
              </div>
            </div>
          </>
        ) : (
          <div>
            {buyingMethod === "eth" || buyingMethod === "bnb" ? (
              <div style={styles.inputContainer}>
                <label style={styles.label}>
                  {buyingMethod === "eth" ? "Eth" : "Bnb"} Amount:
                </label>
                <input
                  style={styles.input}
                  type="number"
                  step={"any"}
                  min={0}
                  value={ethAmount}
                  onChange={handleEthAmountChange}
                />
              </div>
            ) : (
              <div style={styles.inputContainer}>
                <label style={styles.label}>
                  USDT Amount
                  {buyingMethod === "erc20" ? " (ERC20)" : " (BEP20)"} &nbsp;
                </label>
                <input
                  style={styles.input}
                  type="number"
                  min={0}
                  step={"any"}
                  value={usdtAmount}
                  onChange={handleUsdtAmountChange}
                />
              </div>
            )}
            <div style={styles.inputContainer}>
              <label style={styles.label}>$DCK Token </label>
              <input
                style={styles.input}
                readOnly={true}
                type="text"
                min={0}
                value={expectedTokens}
              />
            </div>
            <div style={styles.inputContainer}>
              <label style={styles.label}>Referral Code (Optional)</label>
              <input
                style={styles.input}
                type="text"
                value={referralCode}
                onChange={handleReferralCodeChange}
              />
            </div>
            <div className="button-container">
              <br />
              <button className="main-buy-button" onClick={handleBuyToken}>
                Buy
              </button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
}

export default DogeCookie;
