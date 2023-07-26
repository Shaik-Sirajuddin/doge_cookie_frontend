import React from "react";
import { Link } from "react-router-dom";
import img from "../assets/img/vote.png";
const VoteToEarn = () => {
  return (
    <>
      <section className="vote-section">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-md-5 col-lg-6 text-center">
              <img src={img} alt="" className="mw-100" />
            </div>
            <div className="col-md-7 col-lg-6">
              <div className="vote-content ms-auto">
                <h3 className="title">Vote to Earn</h3>
                <p>
                  Participants who are willing to vote on prescribed platforms
                  would be called the Doge Ninjas. Once a member gets the Black
                  Ninja accolade which is the highest rank, he would receive
                  $200 as compensation and would have extra incentives as APY as
                  stated already, Doge ninjas of any rank are able to get
                  incentives on any Doge cookie NFT being purchased in the
                  market place which will also get more value increase, the more
                  voters being produced. Therefore, the more you vote, the more
                  your chances are.
                </p>
                <a
                  target="_blank"
                  href="DogecookieWhitepaper.pdf"
                  className="cmn-btn"
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

export default VoteToEarn;
