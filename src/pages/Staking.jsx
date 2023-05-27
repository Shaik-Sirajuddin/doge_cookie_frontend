/** @format */

import React, { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import "./Staking.css";
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
} from "../integration/constants";
import { Web3Button } from "@web3modal/react";
import Popup from "reactjs-popup";

const Staking = () => {
  const [stakingAmount, setStakingAmount] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [currentStakings, setCurrentStakings] = useState([]);
  const [notifyText, setNotifyText] = useState("Sending transaction");
  const [totalStakings, setTotalStakings] = useState(0);
  const [previousStakeAmount, setPreviousStakeAmount] = useState(0);

  const stakingPlans = [
    { duration: "5 months", apy: "15%", minStake: 100000 },
    { duration: "10 months", apy: "30%", minStake: 100000 },
    { duration: "12 months", apy: "35%", minStake: 100000 },
    { duration: "5 months", apy: "20%", minStake: 500000 },
    { duration: "10 months", apy: "40%", minStake: 500000 },
    { duration: "12 months", apy: "50%", minStake: 500000 },
  ];
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

  const handleStakeConfirmation = async () => {
    try {
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
      if (chainId === 56) {
        stakingAddress = bnbStakingAddress;
      } else if (chainId === 11155111) {
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
    if (chainId === 56) {
      stakingAddress = bnbStakingAddress;
    } else if (chainId === 11155111) {
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
    <div>
      <div className="staking-page">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <h2>Staking Page</h2>
          <Web3Button icon="hide" style={{}} />
        </div>

        <div className="staking-container">
          <div className="staking-form">
            <div className="staking-plans">
              <h3>Staking Plans</h3>
              <select value={selectedPlan} onChange={handlePlanSelection}>
                <option value="">Select a plan</option>
                {stakingPlans.map((plan, index) => (
                  <option key={index} value={index}>
                    {plan.duration} - {plan.apy}
                  </option>
                ))}
              </select>
            </div>
            <div className="staking-amount">
              <h3>Stake Amount</h3>
              <input
                type="number"
                value={stakingAmount}
                min={0}
                onChange={handleStakingAmountChange}
              />
            </div>
            <button
              className="stake-button"
              disabled={stakingAmount === 0}
              onClick={handleStakeConfirmation}
            >
              Stake
            </button>
          </div>
          <div className="current-stakings">
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
                      <span className="unlock-time">Unlock Time:</span>
                      <span className="value">
                        {formatUnlockTime(staking.unlockTime)}
                      </span>
                    </div>
                    <button
                      className="withdraw"
                      onClick={() => handleWithdraw(index)}
                      disabled={Date.now() / 1000 < staking.unlockTime}
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
      </div>

      {loading ? (
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
        </Popup>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Staking;
