/** @format */

import React, { useEffect, useState } from "react";
import "./Staking.css";
import {
  useAccount,
  useChainId,
  useSwitchNetwork,
  useWaitForTransaction,
  useWalletClient,
} from "wagmi";
import { toast } from "react-toastify";

const Staking = () => {
  const [stakingAmount, setStakingAmount] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [currentStakings, setCurrentStakings] = useState([]);

  const stakingPlans = [
    { duration: "5 months", apy: "15%", minStake: 1000 },
    { duration: "10 months", apy: "30%", minStake: 1000 },
    { duration: "12 months", apy: "35%", minStake: 1000 },
    { duration: "5 months", apy: "20%", minStake: 5000 },
    { duration: "10 months", apy: "40%", minStake: 5000 },
    { duration: "12 months", apy: "50%", minStake: 5000 },
  ];
  const [approveTransactionHash, setApproveTransactionHash] = useState("");
  const [stakeTransactionHash, setStakeTransactionHash] = useState("");
  const [withDrawHash, setWithDrawHash] = useState("");
  const [loading, setLoading] = useState(false);

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
      setLoading(false);
      toast.success("Approve Transaction successful");
      confirmStake();
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

  const confirmStake = async () => {};

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

  const handleStakeConfirmation = () => {
    // Perform stake confirmation logic here
    
    const newStaking = {
      amount: stakingAmount,
      plan: selectedPlan,
    };
    setCurrentStakings([...currentStakings, newStaking]);
    setStakingAmount(0);
    setSelectedPlan("");
  };

  const handleWithdraw = (index) => {
    // Perform withdraw logic here
    const updatedStakings = [...currentStakings];
    updatedStakings.splice(index, 1);
    setCurrentStakings(updatedStakings);
  };

  return (
    <div className="staking-page">
      <h2>Staking Page</h2>
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
              onChange={handleStakingAmountChange}
            />
          </div>
          <button
            className="stake-button"
            disabled={!selectedPlan || stakingAmount === 0}
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
                  Amount: {staking.amount}, Plan: {staking.plan}
                  <button onClick={() => handleWithdraw(index)}>
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
  );
};

export default Staking;
