import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import mask from "../assets/img/footer-mask.png";
import medium from "../assets/img/medium.png";
import { SocialIcon } from "./Header";
import { AngleRight, Instagram2, Telegram2, Twitter2 } from "./Icon";
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
            <div>Copyright &copy; DogeCookie. All Rights Reserved.</div>
            <Link
              to="mailto:support@dogecookie.org"
              className="text-title mt-2 d-inline-block"
            >
              support@dogecookie.org
            </Link>
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
    icon: <img src={medium} alt="" />,
    url: "https://medium.com/@dogecookieENG",
  },
  {
    icon: <Telegram2 />,
    url: "https://t.me/dogecookiecommunity",
  },
];
export default Footer;
