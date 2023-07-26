import React from "react";
import { Link } from "react-router-dom";
import img from "../assets/img/dog-4.png";
const StakeToEarn = () => {
  return (
    <>
      <section className="vote-section">
        <div className="target-id" id="staking"></div>
        <div className="container">
          <div className="row align-items-center flex-row-reverse g-4">
            <div className="col-md-5 col-lg-6 text-center">
              <img src={img} alt="" className="mw-100 stake-img" />
            </div>
            <div className="col-md-7 col-lg-6">
              <div className="vote-content">
                <h3 className="title" style={{ color: "#162C67" }}>
                  Stake to Earn
                </h3>
                <p>
                  Doge Cookie community members are able to stake their token to
                  earn extra income. They have exclusive rights and are
                  well-respected members on the platform. The term “stake to
                  earn” on Doge Cookie platform is a very simple process. <br />{" "}
                  As a holder of Doge cookie token, you are able to stake as low
                  as 100k $DCK All stakes and APY’s will be unlocked for claims
                  depending on stake plans. “Being able to stake from some
                  certain level you get to have incentives as various Doge
                  ninjas”. {" "}
                </p>
                <a
                  target="_blank"
                  href="DogecookieWhitepaper.pdf"
                  className="cmn-btn active"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StakeToEarn;
