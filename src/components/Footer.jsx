import React from "react";
import { Link } from "react-router-dom";
import mask from "../assets/img/footer-mask.png";
import { SocialIcon } from "./Header";
import { AngleRight, Discord, Instagram2, Telegram2, Twitter2 } from "./Icon";
import { HashLink } from "react-router-hash-link";
const Footer = () => {
  return (
    <footer style={{ WebkitMask: `url(${mask}) no-repeat top center / cover` }}>
      <div className="container">
        <div className="footer-btn">
          <HashLink to={"/#mission"} className="btn-black">
            Our Mission <AngleRight />
          </HashLink>
          <HashLink to={"/#roadmap"} className="btn-black">
            Roadmap <AngleRight />
          </HashLink>
          <a
            href="DogecookieWhitepaper.pdf"
            target="_blank"
            className="btn-black"
          >
            Whitepaper <AngleRight />
          </a>
        </div>
        <div className="footer-bottom">
          <h3 className="title">Stay Up-to-Date with the Community</h3>
          <SocialIcon data={social} />
          <div className="copyright">
            Copyright &copy; DogeCookie. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
const social = [
  {
    icon: <Twitter2 />,
    url: "https://twitter.com/DogecookieENG",
  },
  {
    icon: <Instagram2 />,
    url: "https://instagram.com/dogecookiesninja?igshid=OGQ5ZDc2ODk2ZA==",
  },
  {
    icon: <Discord />,
    url: "https://medium.com/@dogecookieENG",
  },
  {
    icon: <Telegram2 />,
    url: "https://t.me/dogecookieENG",
  },
];
export default Footer;
