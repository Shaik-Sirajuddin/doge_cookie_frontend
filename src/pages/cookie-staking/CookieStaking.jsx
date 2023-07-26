/** @format */

import InputControl from "../../components/InputControl";
import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import "./CookieStaking.css";
import {
  useAccount,
  useChainId,
  useSwitchNetwork,
  useWaitForTransaction,
  useWalletClient,
} from "wagmi";
import { readContract } from "@wagmi/core";
import { toast } from "react-toastify";
import {
  bnbChainId,
  bnbDckAddress,
  bnbStakingAddress,
  ethChainId,
  ethDckAddress,
  ethStakingAddress,
  stakingAbi,
  tokenAbi,
} from "../../integration/constants";
import { Web3Button } from "@web3modal/react";
import Popup from "reactjs-popup";

const CookieStaking = () => {
  const [stakingAmount, setStakingAmount] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [currentStakings, setCurrentStakings] = useState([]);
  const [notifyText, setNotifyText] = useState("Sending transaction");
  const [totalStakings, setTotalStakings] = useState(0);
  const [previousStakeAmount, setPreviousStakeAmount] = useState(0);

  const [approveTransactionHash, setApproveTransactionHash] = useState("");
  const [stakeTransactionHash, setStakeTransactionHash] = useState("");
  const [withDrawHash, setWithDrawHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
    isLoading: stakeIsLoading,
    isSuccess: stakeIsSuccess,
    isError: stakeIsError,
  } = useWaitForTransaction({
    hash: stakeTransactionHash,
  });
  const {
    isLoading: withdrawLoading,
    isSuccess: withdrawIsSuccess,
    isError: withdrawIsError,
  } = useWaitForTransaction({
    hash: withDrawHash,
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
      toast.success("Approve Transaction sent");
    }
    if (approveIsSuccess) {
      toast.success("Approve Transaction successful");
      sendStakeTransaction();
    }
    if (approveIsError) {
      setLoading(false);
      toast.error("Approve Something went wrong");
    }
  }, [approveIsLoading, approveIsSuccess, approveIsError]);

  useEffect(() => {
    console.log("Stake", stakeIsLoading, stakeIsSuccess, stakeIsError);
    if (stakeIsLoading) {
      setLoading(true);
      toast.success("Stake Transaction sent");
    }
    if (stakeIsSuccess) {
      setLoading(false);
      toast.success("Stake Transaction successful");
    }
    if (stakeIsError) {
      setLoading(false);
      toast.error("Stake Transaction failed!");
    }
  }, [stakeIsLoading, stakeIsSuccess, stakeIsError]);

  //withdraw updates
  useEffect(() => {
    console.log(
      "withdraw : ",
      withdrawLoading,
      withdrawIsSuccess,
      withdrawIsError
    );
    if (withdrawLoading) {
      setLoading(true);
      toast.success("Withdraw Transaction sent");
    }
    if (withdrawIsSuccess) {
      setLoading(false);
      toast.success("Withdraw Transaction successful");
    }
    if (withdrawIsError) {
      setLoading(false);
      toast.error("Withdraw Transaction failed!");
    }
  }, [withdrawLoading, withdrawIsSuccess, withdrawIsError]);

  const handleStakingAmountChange = (event) => {
    console.log(event.target.value);
    setStakingAmount(event.target.value);
  };

  const handlePlanSelection = (event) => {
    const selectedIndex = event.target.value;
    setSelectedPlan(selectedIndex);
    const selectedPlanObj = stakingPlans[selectedIndex];
    if (selectedPlanObj && stakingAmount < selectedPlanObj.minStake) {
      setStakingAmount(selectedPlanObj.minStake);
    }
  };

  const handleStakeConfirmation = async (event) => {
    try {
      event.preventDefault();
      if (loading) return;
      // Perform stake confirmation logic here
      let amount = parseInt(stakingAmount);
      if (amount < stakingPlans[selectedPlan].minStake) {
        toast.error("Amount cannot be less than min stake amount");
        return;
      }
      if (!isConnected) {
        toast.info("Please connect your wallet first");
        return;
      }

      amount = amount * 1e9;

      let tokenAddress;
      let stakingAddress;
      if (chainId === bnbChainId) {
        tokenAddress = bnbDckAddress;
        stakingAddress = bnbStakingAddress;
      } else if (chainId === ethChainId) {
        tokenAddress = ethDckAddress;
        stakingAddress = ethStakingAddress;
      } else {
        toast.info("Invalid chain ! Please swith your chain to eth or bnb");
        return;
      }

      setLoading(true);
      handleModalOpen();
      setNotifyText("Sending Approve Transaction");
      let result = await data.writeContract({
        abi: tokenAbi,
        address: tokenAddress,
        functionName: "approve",
        args: [stakingAddress, amount.toString()],
        from: address,
      });
      console.log(result);
      setPreviousStakeAmount(amount);
      setApproveTransactionHash(result);
      setNotifyText("Awaiting Transaction confirmation");
    } catch (err) {
      setLoading(false);
      setNotifyText("Something went wrong");
      toast.error("Something went wrong");
      console.log("Stake click error : ", err);
    }
  };

  const sendStakeTransaction = async () => {
    try {
      let stakingAddress;
      if (chainId === bnbChainId) {
        stakingAddress = bnbStakingAddress;
      } else if (chainId === ethChainId) {
        stakingAddress = ethStakingAddress;
      } else {
        toast.info("Invalid chain ! Please swith your chain to eth or bnb");
        return;
      }
      setNotifyText("Sending Stake Transaction");
      let result = await data.writeContract({
        abi: stakingAbi,
        address: stakingAddress,
        functionName: "stake",
        args: [previousStakeAmount.toString(), selectedPlan],
        from: address,
      });
      console.log(result);
      setStakeTransactionHash(result);
      setNotifyText("Awaiting Transaction confirmation");
    } catch (err) {
      setLoading(false);
      setNotifyText("Something went wrong");
      toast.error("Something went wrong");
      console.log(err);
    }
  };

  const handleWithdraw = async (index) => {
    try {
      if (loading) return;
      let currentObj = currentStakings[index];
      if (Date.now() / 1000 < currentObj.unlockTime) {
        toast.info("Staking in progress ");
        return;
      }
      if (!isConnected) return;
      let stakingAddress;
      if (chainId === bnbChainId) {
        stakingAddress = bnbStakingAddress;
      } else if (chainId === ethChainId) {
        stakingAddress = ethStakingAddress;
      } else {
        return;
      }
      setLoading(true);
      let result = await data.writeContract({
        abi: stakingAbi,
        address: stakingAddress,
        functionName: "unstake",
        args: [index.toString()],
        from: address,
      });
      console.log(result);
      setWithDrawHash(result);
      setNotifyText("Awaiting Transaction confirmation");
    } catch (err) {
      setLoading(false);
      setNotifyText("Something went wrong");
      toast.error("Something went wrong");
      console.log(err);
    }
  };

  const getMyStaking = async () => {
    if (!isConnected) return;
    let stakingAddress;
    if (chainId === bnbChainId) {
      stakingAddress = bnbStakingAddress;
    } else if (chainId === ethChainId) {
      stakingAddress = ethStakingAddress;
    } else {
      return;
    }

    let result = await readContract({
      address: stakingAddress,
      abi: stakingAbi,
      functionName: "totalStakings",
      args: [address],
    });
    let size = parseInt(result);
    console.log("Total staking : ", size);
    setTotalStakings(size);
    let temp = [];
    for (let i = 0; i < size; i++) {
      result = await readContract({
        address: stakingAddress,
        abi: stakingAbi,
        functionName: "stakings",
        args: [address, i],
      });
      result = {
        amount: parseInt(result[0]) / 1e9,
        unlockTime: parseInt(result[1]),
        optionIndex: parseInt(result[2]),
        isActive: result[3],
      };
      temp.push(result);
    }
    setCurrentStakings(temp);
  };
  const formatUnlockTime = (unlockTime) => {
    const unlockDate = new Date(unlockTime * 1000);
    return unlockDate.toLocaleString();
  };
  useEffect(() => {
    getMyStaking();
  }, [isConnected, chainId, stakeIsSuccess]);
  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <Layout>
      <section className="page-header">
        <div className="container">
          <h1 className="title">DogeCookie Staking</h1>
          <p>
            The term “stake to earn” on Doge Cookie platform is a very simple
            process.
          </p>
        </div>
      </section>
      <section className="cookie-section">
        <div className="container">
          <div className="cookie-wrapper">
            <div className="row flex-row-reverse align-items-center gy-5">
              <div className="col-lg-6 ps-xl-2">
                <form className="cookie-form">
                  <div className="cookie-form-header d-flex align-items-center justify-content-between flex-wrap gap-3">
                    <h5 className="title m-0">Staking Page</h5>
                  </div>
                  <div>
                    <Web3Button
                      icon="hide"
                      style={{
                        position: "relative",
                        bottom: "7px",
                      }}
                    />
                    <br></br>
                    <w3m-network-switch></w3m-network-switch>
                  </div>
                  <div className="mt-4 cookie-form-body">
                    <InputControl
                      label="Staking Plans"
                      select={stakingPlans}
                      onChange={handlePlanSelection}
                    />
                    <div className="mb-20"></div>
                    <InputControl
                      label="Staking Amount"
                      placeholder="0.00"
                      endText="DCK"
                      type="number"
                      value={stakingAmount}
                      min={0}
                      onChange={handleStakingAmountChange}
                    />
                    <button
                      className="cmn-btn style-2 mt-4"
                      onClick={handleStakeConfirmation}
                    >
                      Stake
                    </button>
                    <div className=" mt-4 pt-3 current-stakings">
                      <h3>Current Stakings</h3>
                      {currentStakings.length > 0 ? (
                        <ul>
                          {currentStakings.map((staking, index) => (
                            <li key={index}>
                              <div className="staking-details">
                                <span className="amount">Amount:</span>
                                <span className="value">{staking.amount}</span>
                              </div>
                              <div className="staking-details">
                                <span className="unlock-time">
                                  Unlock Time:
                                </span>
                                <span className="value">
                                  {formatUnlockTime(staking.unlockTime)}
                                </span>
                              </div>
                              <button
                                className="withdraw"
                                onClick={() => handleWithdraw(index)}
                                disabled={
                                  Date.now() / 1000 < staking.unlockTime
                                }
                              >
                                Withdraw
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No current stakings.</p>
                      )}
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-lg-6">
                <div className="cookies-content-area">
                  <h3 className="title">Why Stake DogeCookie?</h3>
                  <p className="txt">
                    Doge Cookie community members are able to stake their token
                    to earn extra income. They have exclusive rights and are
                    well-respected members on the platform. The term “stake to
                    earn” on Doge Cookie platform is a very simple process.
                  </p>
                  <p className="txt">
                    As a holder of Doge cookie token, you are able to stake as
                    low as $1000 worth of your token $DCK. All stakes and APY’s
                    will be unlocked for claims a week before to launch
                    participants in Doge cookie stakers earns directly from
                    daily circulating earnings which will be added as APY on
                    value staked.
                  </p>
                  <p className="txt">
                    Other benefits that come with this include a Hierarchy of
                    membership in the community which is stated as follows;
                    SPONGE, SHRIMP, CRAB, OCTOPUS, FISH, DOLPHIN, SHARK, WHALE,
                    BLUE WHALE, TIMEKEEPER Doge Stars. Solely depends on the
                    stake capabilities of members. Also “Being able to stake
                    from some certain level you get to have incentives as
                    various Doge ninjas”.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const stakingPlans = [
  {
    text: "5 Months - 15%",
    value: 0,
    apy: "15%",
    minStake: 100000,
  },
  {
    text: "10 Months - 30%",
    value: 1,
    apy: "30%",
    minStake: 100000,
  },
  {
    text: "12 Months - 35%",
    value: 2,
    apy: "35%",
    minStake: 100000,
  },
  {
    text: "5 Months - 20%",
    value: 3,
    apy: "20%",
    minStake: 500000,
  },
  {
    text: "10 Months - 40%",
    value: 4,
    apy: "40%",
    minStake: 500000,
  },
  {
    text: "12 Months - 50%",
    value: 5,
    apy: "50%",
    minStake: 500000,
  },
];

export default CookieStaking;
