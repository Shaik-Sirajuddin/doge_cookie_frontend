import { motion } from "framer-motion";
import { socials } from "./../constants";

import styles from "./../styles";
import { footerVariants } from "./../utils/motion";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="show"
      className={`${styles.xPaddings} py-16 relative`}
    >
      <div className="footer-gradient" />
      <div className={`${styles.innerWidth} mx-100px flex flex-col gap-3`}>
        <div className="flex items-center justify-between flex-wrap gap-5">
          <h4 className="font-bold md:text-[30px] text-[44px] text-white pl-8">
            JOIN NOW
          </h4>
          <Link to="/presale">
            <button
              type="button"
              className="flex items-center h-fit py-4 px-6 bg-[#25618B] rounded-[32px] gap-[12px]pl-8"
            >
              <img
                src="/images/doge-cookie.png"
                alt="headset"
                className="w-[] h-[15px] object-contain"
              />
              <span className="font-normal text-[12px] text-white">
                Buy Now
              </span>
            </button>
          </Link>
        </div>

        <div className="flex flex-col">
          <div className="mb-[50px] h-[2px] bg-white opacity-50" />
          <div className="flex items-center justify-between flex-wrap gap-4">
              <h4 className="font-extrabold text-[24px] text-white pl-8 hover:cursor-pointer" onClick={()=>navigate("/")}>
                DOGE COOKIE
              </h4>
            <p className="font-normal text-[14px] text-white">
              Copyright © 2023 DOGE COOKIE. All rights reserved.
            </p>

            <div className="flex gap-4">
              {socials.map((social) => (
                <img
                  key={social.name}
                  src={social.url}
                  alt={social.name}
                  className="w-[24px] h-[24px] object-contain cursor-pointer"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
