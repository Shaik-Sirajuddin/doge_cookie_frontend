/** @format */

import React, { Children, useEffect, useState } from "react";
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
import { parseEther, toBigInt } from "ethers";
import Web3 from "web3";
import { toast } from "react-toastify";
import { Web3Button } from "@web3modal/react";
import { useWalletClient } from "wagmi";
import { useAccount } from "wagmi";
import { useSwitchNetwork } from "wagmi";
import { useChainId } from "wagmi";
import { readContract } from "@wagmi/core";
import { useWaitForTransaction } from "wagmi";

import { Link } from "react-router-dom";
import banner_bg from "../assets/img/banner-bg.png";
import banner_title from "../assets/img/banner-title.png";
import solidProof from "../assets/img/solidProof.png";
import CountdownCard from "./Countdown";
import InputControl from "./InputControl";

import { ethers } from "ethers";

const ethProvider = new ethers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/30145ab7ed4f48f29d2638565511d94e"
);
const binanceProvider = new ethers.JsonRpcProvider(
  "https://bsc-dataseed.bnbchain.org"
);
const contract = new ethers.Contract(
  ethPresaleAddress,
  presaleAbi,
  ethProvider
);
const bnbContract = new ethers.Contract(
  bnbPresaleAddress,
  presaleAbi,
  binanceProvider
);
const Banner = () => {
  const maxSupply = 3000000000000000000n + 30000000000000000000n;
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
  const [amountRaised, setAmountRaised] = useState(0n);
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
    updateSupply();
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
  const updateSupply = async () => {
    let supply = await bnbContract.supply();
    supply += await contract.supply();
    let tempProgress = supply / maxSupply;
    let tokensSold = maxSupply - supply;
    let _amountRaised = tokensSold / 1000000000n / toBigInt(tokensPerUsdt);
    setAmountRaised(_amountRaised);
    console.log("Progress ", tempProgress, _amountRaised);
    setProgress(tempProgress);
  };
  useEffect(() => {
    updateSupply();
    getBalance();
  }, [isConnected, chainId]);
  useEffect(() => {
    console.log(
      "USDT Buy : ",
      buyUsdtIsLoading,
      buyUsdtIsSuccess,
      buyUsdtIsError
    );
    updateSupply();
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
          args: [parseInt(ethersToWei), referralCode],
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
          args: [parseInt(ethersToWei), referralCode],
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
    setStatus(method.toUpperCase());
    console.log("here");
    setBuyingMethod(method);
    if (method === "eth" || method === "erc20") {
      if (!chainId) return;
      if (chainId !== ethChainId) {
        toast.info("Wrong Network Detected! Switch your network to eth");
        switchNetwork(ethChainId);
      } else {
        handleModalOpen();
      }
    } else {
      if (!chainId) return;
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

  const [progress, setProgress] = useState(40);
  const [presale, setPresale] = useState("ended");
  const [status, setStatus] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPresale = localStorage.getItem("presale");
      if (storedPresale) {
        setPresale(storedPresale);
      }
    }
  }, []);

  return (
    <>
      <section
        className="banner-section"
        style={{
          background: `url(${banner_bg}) no-repeat center center / cover`,
        }}
      >
        <div className="container">
          <div className="banner-wrapper">
            <div className="banner-left">
              <img src={banner_title} className="title" alt="" />
              <p className="txt">
                Dogecookie is a full-on community token with a vote to earn and
                staking feature with the main aim of generating wealth solely
                for its members. The utilities are built through a formidable
                ecosystem and 80% of the generated revenue will be infused back
                into the community.
              </p>
              <div id="presale-buy" className="banner-btn-grp">
                <a
                  target="_blank"
                  href="DogecookieWhitepaper.pdf"
                  className="btn-black"
                >
                  Read Whitepaper
                </a>
                <div className="btn-grp-info">
                  <img src={solidProof} alt="" />
                  <span>Audit and KYC Verified</span>
                </div>
              </div>
            </div>
            <div className="banner-right">
              <div className="presale-state">
                <h4 className="presale-state-header justify-content-center text-center">
                  {/* <span>Presale Stage 1</span> <small>$0.001</small> */}
                  <small>Dogecookie Presale Now Open</small>
                </h4>
                <div className="presale-state-body">
                  <CountdownCard targetDate={`September 20, 2023 08:30:00`} />
                  <div
                    className="progress __progress"
                    style={{
                      "--title": progress >= 100 ? "var(--base)" : "",
                    }}
                  >
                    <div className="progress-inner">
                      <div
                        className="progress-bar"
                        style={{ width: `${progress}%` }}
                      ></div>
                      <span className="text">UNTIL SOFTCAP</span>
                    </div>
                  </div>
                  <div
                    className="text-title subtxt font-bold"
                    style={{ fontSize: "19px" }}
                  >
                    Amount Raised : ${parseInt(amountRaised)} /$3,500,000
                  </div>
                  <div className="rate mb-2">Current Price : 0.0001</div>
                  <div className="rate">Next Price : 0.0002</div>
                  <div className="d-flex flex-wrap gap-3">
                    {!status && (
                      <>
                        <Link
                          to="#"
                          className="btn-black active flex-grow-1"
                          // data-bs-toggle="modal"
                          onClick={() => setStatus(!status)}
                        >
                          Buy Now
                        </Link>
                        <Link to="/how-to" className="btn-black flex-grow-1">
                          How to Buy
                        </Link>
                      </>
                    )}
                    {presale == "running" && status && (
                      <>
                        <Web3Button icon="hide" />
                        <div className="mt-2"></div>
                        <w3m-network-switch></w3m-network-switch>
                        <Link
                          to="#exchange"
                          data-bs-toggle="modal"
                          className="btn-black flex-grow-1"
                          onClick={() => handleBuyingMethodChange("eth")}
                          style={{ width: "180px" }}
                        >
                          Buy with ETH
                        </Link>
                        <Link
                          to="#exchange"
                          data-bs-toggle="modal"
                          className="btn-black flex-grow-1"
                          onClick={() => handleBuyingMethodChange("bnb")}
                          style={{ width: "180px" }}
                        >
                          Buy with BSC
                        </Link>
                        <Link
                          to="#exchange"
                          data-bs-toggle="modal"
                          className="btn-black flex-grow-1"
                          onClick={() => handleBuyingMethodChange("erc20")}
                          style={{ width: "180px" }}
                        >
                          Buy with USDT (ERC-20)
                        </Link>
                        <Link
                          to="#exchange"
                          data-bs-toggle="modal"
                          className="btn-black flex-grow-1"
                          onClick={() => handleBuyingMethodChange("bep20")}
                          style={{ width: "180px" }}
                        >
                          Buy with USDT (BEP-20)
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className="modal fade"
        id="exchange"
        tabindex="-1"
        aria-labelledby="exchangeLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal-content __modal-content mx-auto"
            style={{ maxWidth: "472px" }}
          >
            <div className="modal-header align-items-center border-0 mb-2">
              <h5 className="modal-title m-0" id="exchangeLabel">
                Exchange
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-20">
                <label className="mt-4 form-label d-flex flex-wrap justify-content-between">
                  <span>Enter {status}</span>
                </label>

                {buyingMethod === "eth" || buyingMethod === "bnb" ? (
                  <InputControl
                    type="number"
                    min={0}
                    placeholder="0.00"
                    value={ethAmount}
                    onChange={handleEthAmountChange}
                  />
                ) : (
                  <InputControl
                    type="number"
                    min={0}
                    placeholder="0.00"
                    value={usdtAmount}
                    onChange={handleUsdtAmountChange}
                  />
                )}
              </div>
              <div className="mb-20">
                <InputControl
                  placeholder="0.00"
                  label="You Get"
                  endText="DCK"
                  value={expectedTokens}
                  readOnly
                />
              </div>
              <div className="mb-20">
                <InputControl
                  placeholder="(optional)"
                  label="Refferal Code"
                  endText=""
                  value={referralCode}
                  onChange={handleReferralCodeChange}
                />
              </div>
              <div className="pt-2"></div>
              <button
                type="submit"
                className="cmn-btn style-2"
                onClick={handleBuyToken}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
