/** @format */

import React, { useState } from "react";
import "./ResponsiveNavbar.css";
import { Link } from "react-router-dom";
import { Icon } from "./Sidebar";
import { icedogelogo } from "../assets";
import { animateScroll as scroll, scroller } from "react-scroll";

const ResponsiveNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollToSection = (sectionId) => {
    scroller.scrollTo(sectionId, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -100, // Adjust the scroll offset as needed
    });
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar ${isOpen ? "open" : ""}`}>
      <Link to="/">
        <div
          className={`w-[100px] h-[100px] rounded-[10px] flex justify-center items-center ${"cursor-pointer"}`}
        >
          <img className="navbar-logo" src={icedogelogo} alt="fund_logo" />
        </div>
        {/* <Icon styles="w-[80px] h-[80px] bg-[#2c2f32]" imgUrl={icedogelogo} /> */}
      </Link>
      <ul className="navbar-menu">
        <li className="navbar-item">
          <a href="/#mission" onClick={() => scrollToSection("mission")}>
            Our Mission
          </a>
        </li>
        <li className="navbar-item">
          <a href="/#about" onClick={() => scrollToSection("about")}>
            $DCK
          </a>
        </li>
        <li className="navbar-item">
          <a href="/#roadmap" onClick={() => scrollToSection("roadmap")}>
            Roadmap
          </a>
        </li>
        <li className="navbar-item">
          <Link to="/#nft" onClick={() => scrollToSection("nft")}>
            NFT Metaverse
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/presale">Presale</Link>
        </li>

        <li className="navbar-item">
          <Link to="/staking">Staking</Link>
        </li>
        <li className="navbar-item">
          <Link to="/login">Account</Link>
        </li>
      </ul>
      <button className="navbar-toggle" onClick={toggleMenu}>
        {/* <span className="navbar-icon"></span> */}
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </button>
    </nav>
  );
};

export default ResponsiveNavbar;
