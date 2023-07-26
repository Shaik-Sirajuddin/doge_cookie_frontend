import React, { useRef } from "react";
import Slider from "react-slick";
import mask from "../assets/img/roadmap.png";
import useScreen from "../Hooks/useScreen";
import { NextIcon, PrevIcon } from "./Icon";
const Roadmap = () => {
  const sliderRef = useRef();
  const screen = useScreen();
  const settings = {
    dots: false,
    infinite: true,
    className: screen >= 1200 ? "slider variable-width" : "",

    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const nextSlide = () => {
    sliderRef.current.slickNext();
  };
  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };
  return (
    <section
      className="roadmap-section"
      style={{
        WebkitMask: `url(${mask}) no-repeat center center / 100% 100%`,
      }}
    >
      <div className="target-id" id="roadmap"></div>
      <div className="container">
        <div className="roadmap-section-title">
          <h2 className="title">Roadmap</h2>
          <div className="navigations">
            <button className="btn-clean">
              <div onClick={() => prevSlide()}>
                <PrevIcon />
              </div>
            </button>
            <button className="btn-clean">
              <div onClick={() => nextSlide()}>
                <NextIcon />
              </div>
            </button>
          </div>
        </div>
        <Slider {...settings} ref={sliderRef}>
          {data.map((item, i) => (
            <RoadmapCard {...item} index={i + 1} key={i} />
          ))}
        </Slider>
      </div>
    </section>
  );
};
const RoadmapCard = ({ title, infos, index }) => {
  return (
    <>
      <div className="roadmap-card">
        <h5 className="title">
          {title} <span>{index}</span>{" "}
        </h5>
        <ul>
          {infos?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

const data = [
  {
    title: "Phase",
    infos: [
      "Token creation",
      "$DCK Smart Contract",
      "Whitepaper",
      "Website Launch",
      "Set up Members Dashboard",
      "$DCK Smart Contract Audit",
      "Social Media Presence",
      "Token Presale Launch",
      "Presale LaunchPad Listing",
      "Promotions",
    ],
  },
  {
    title: "Phase",
    infos: [
      "Voting & Staking Alogorithm Development",
      "Doge Cookie NFT Marketplace Development",
      "Social Media Campaigns",
      "Online Community Blog Publishing",
      "Partnership with External Innovative Projects",
      "Assessment of Community Growth",
      "Weekly Community Incentives",
      "Publicity and Promotions",
      "",
    ],
  },
  {
    title: "Phase",
    infos: [
      "Vote-to -Earn Incentives Distribution",
      "Stakes and Incentive claim",
      "Doge cookie NFT Marketplace Launch",
      "Brand Collaboration",
      "Release First Set of Minted $DCK Cookie NFTs",
      "DEX Listing",
      "Publicity and Key Opinion Leader (KOL) Supports",
      "Token Presale Launch",
      "Presale LaunchPad Listing",
      "Promotions",
      "",
    ],
  },
  {
    title: "Phase",
    infos: [
      "Centralised Exchange Listing",
      "NFT Influencers Onboarding",
      "Launch $DCK Online E-Commerce Store",
      "Partnership with E-Commerce for Expansion",
      "Bigger Promotions to Aim at the Moon",
      "",
      "",
    ],
  },
];

export default Roadmap;
