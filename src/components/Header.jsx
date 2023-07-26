import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HashLink, NavHashLink } from "react-router-hash-link";
import logo from "../assets/img/logo.png";
import mini_dog from "../assets/img/mini-dog.png";
import shapes from "../assets/img/shapes-bg.png";
import usa from "../assets/img/usa.png";
import Dropdown from "./Dropdown";
import {
  ClearIcon,
  Close,
  Discord,
  Hamburger,
  Instagram,
  Telegram,
  Twitter,
} from "./Icon";
import useAuth from "../Hooks/useAuth";
const Header = () => {
  const [open, setOpen] = useState();
  const { user, logOut } = useAuth();

  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setDeviceWidth(window.innerWidth);
    };

    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {open && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            zIndex: "99",
            width: "100%",
            height: "100%",
          }}
          onClick={() => setOpen(false)}
        ></div>
      )}
      <header className={user ? "authenticated" : ""}>
        <div className="container">
          <div className="header-wrapper">
            <Link to="/" className="logo">
              <img src={logo} alt="" />
            </Link>
            <div className="hamburger" onClick={() => setOpen(!open)}>
              <Hamburger />
            </div>
            {/* {screen >= 768 && <SocialIcon />} */}
            <div className={`menu-wrapper ${open ? "open" : ""}`}>
              <div className="close-icon" onClick={() => setOpen(!open)}>
                <ClearIcon />
              </div>
              <ul className="menu">
                {menu?.map((item, i) =>
                  item.title === "Whitepaper" ? (
                    <li key={i} onClick={() => setOpen(false)}>
                      <a rel="noreferrer" target="_blank" href={item?.url}>
                        {item?.title}
                      </a>
                    </li>
                  ) : (
                    <li key={i} onClick={() => setOpen(false)}>
                      <HashLink to={item?.url}>{item?.title}</HashLink>
                    </li>
                  )
                )}
              </ul>
              <div className="d-flex justify-content-between align-items-center column-gap-3 social-container">
                <SocialIcon />
                <div className="d-md-none">
                  <BuyButtons
                    open={open}
                    setOpen={setOpen}
                    deviceWidth={deviceWidth}
                    user={user}
                    logOut={logOut}
                  />
                </div>
              </div>
            </div>
            <Dropdown data={language} />
            <div className={`d-none d-md-block ms-md-2 ms-xl-0`}>
              <BuyButtons
                open={open}
                setOpen={setOpen}
                deviceWidt={deviceWidth}
                user={user}
                logOut={logOut}
              />
            </div>
          </div>
        </div>
      </header>
      <style>
        {`
				body, .about-section {
					background: url(${shapes}) repeat center center / contain;
				}
				`}
      </style>
    </>
  );
};
const BuyButtons = ({ user, logOut, deviceWidth, open, setOpen }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="d-flex flex-wrap justify-content-center">
        {user && (
          <Link to="#" className="cmn-btn ms-lg-3 py-2 btn-white">
            0.0208434 <img src={mini_dog} alt="" />
          </Link>
        )}
        {user ? (
          <button
            onClick={() => logOut(navigate)}
            className="cmn-btn ms-lg-2 border-0"
          >
            <span className="d-flex align-items-center gap-1">
              0XC...69
              <Close />
            </span>
          </button>
        ) : (
          <NavHashLink
            onClick={() => setOpen(!open)}
            to={deviceWidth < 768 ? "/#presale-buy" : "/#"}
            className="cmn-btn ms-lg-3"
          >
            <span>Buy Now</span>
          </NavHashLink>
        )}
      </div>
    </>
  );
};
export const SocialIcon = ({ data }) => {
  return (
    <>
      <ul className="social-icons">
        {data
          ? data?.map((item, i) => (
              <li key={i}>
                <a rel="noreferrer" target="_blank" href={item?.url}>
                  {item?.icon}
                </a>
              </li>
            ))
          : social?.map((item, i) => (
              <li key={i}>
                <a rel="noreferrer" target="_blank" href={item?.url}>
                  {item?.icon}
                </a>
              </li>
            ))}
      </ul>
    </>
  );
};

const social = [
  {
    icon: <Twitter />,
    url: "https://twitter.com/DogecookieENG",
  },
  {
    icon: <Instagram />,
    url: "https://instagram.com/dogecookiesninja?igshid=OGQ5ZDc2ODk2ZA==",
  },
  {
    icon: <Discord />,
    url: "https://medium.com/@dogecookieENG",
  },
  {
    icon: <Telegram />,
    url: "https://t.me/dogecookieENG",
  },
];
const language = [
  {
    img: usa,
    name: "EN",
  },
  {
    img: usa,
    name: "BN",
  },
  {
    img: usa,
    name: "IR",
  },
  {
    img: usa,
    name: "PK",
  },
];
const menu = [
  {
    title: "Whitepaper",
    url: "DogecookieWhitepaper.pdf",
  },
  {
    title: "Our Mission",
    url: "/#mission",
  },
  {
    title: "Presale",
    url: "/#presale",
  },
  {
    title: "Staking",
    url: "/staking",
  },
  {
    title: "Roadmap",
    url: "/#roadmap",
  },
  {
    title: "Become a Member",
    url: "/sign-up",
  },
];
export default Header;
