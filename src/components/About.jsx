import React from "react";
import { Link } from "react-router-dom";
import dog from "../assets/img/dog-1.png";
import dog2 from "../assets/img/dog-2.png";
import mask from "../assets/img/roadmap.png";
import bg from "../assets/img/shapes-bg.png";
import { AngleRight } from "./Icon";

const About = () => {
  return (
    <section
      className="about-section"
      style={{
        WebkitMask: `url(${mask}) no-repeat top center / 100% 100%`,
        background: `url(${bg}) repeat center center / contain`,
      }}
    >
      <div className="container">
        <div className="overflow-max-md-hidden">
          <div className="row g-4">
            <div className="col-12">
              <div className="about-item style-2">
                <div className="about-item-content">
                  <h4 className="title">About Doge Cookie</h4>
                  <p className="text1">
                    To attain such wealth generation on our community-based
                    token, The team has put in place several activities such as
                    vote to earn, stake to earn, and other viable features to
                    give the community high earning power. We build the platform
                    on the blockchain technology. Therefore, you can be sure
                    that our voting system is secure and transparent.
                  </p>
                  <p className="text2">
                    At Dogecookie we work with a team of cryptocurrency experts,
                    journalists, developers, designers, and strategists who
                    understand the in and out of the cryptocurrency world backs
                    Dogecookie. The team at Dogecookie has handled core
                    cryptocurrency projects with impressive success stories.
                  </p>
                  <a
                    href="DogecookieWhitepaper.pdf"
                    target="_blank"
                    className="cmn-btn active"
                  >
                    Learn More <AngleRight />
                  </a>
                </div>
                <img src={dog} className="about-dog" alt="" />
              </div>
            </div>
            <div className="col-md-12">
              <div className="target-id" id="mission"></div>
              <div className="about-item">
                <h4 className="title">Mission</h4>
                <p className="text1">
                  Doge Cookie is World's first meme token with a fully
                  decentralized community and endless earning possibilities for
                  its members. Our core objective is to build a formidable
                  ecosystem that transfers 90% of its generated revenue back to
                  its members.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="about-item">
                <h4 className="title">Doge Ninja</h4>
                <p className="text1">
                  Compensation to Dogecookie community members with the highest
                  weekly amount of votes will earn $50 and a recognised status
                  as a Doge Ninja which can be in various forms; Red, Blue,
                  White, and Black Doge Ninjas. Across all stages, participants
                  earn $50. The last stage is the Black Ninja, The weekly winner
                  will be compensated with $200 and also higher incentives when
                  they purchase Doge Cookie from our Market place.
                </p>
              </div>
            </div>
            <div
              className="col-12 text-end d-md-none m-0"
              style={{ height: "0" }}
            >
              <img src={dog2} className="dog-2" alt="" />
            </div>
            <div className="col-md-6">
              <div className="about-item">
                <h4 className="title">Doge Cookie NFT</h4>
                <p className="text1">
                  These are AI-generated NFT’s which will be minted and sold on
                  Dogecookie Marketplace in the cause of the project. Dogecookie
                  will as well complement the efforts of Doge Ninjas which will
                  come in form of hierarchy noted as; Red, Blue, White, and
                  Black cookies Respectively. All Doge cookies attract
                  incentives, and Black which is the highest of them all
                  attracts more.
                </p>
              </div>
            </div>
            <div className="col-12 text-center d-none d-md-block">
              <img src={dog2} className="dog-2" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
