import { motion } from 'framer-motion';
import { socials } from '../constants';
import styles from '../styles';

import { navVariants } from '../utils/motion';

const Navbar = () => (
  <motion.nav
    variants={navVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative`}
  >
    <div className="absolute w-[50%] inset-0 gradient-01" />
    <div
      className={`${styles.innerWidth} mx-auto flex justify-between gap-8`}
    >
    <div className="lg:flex gap-4 sm:grid grid-rows-4 grid-flow-col">
            {socials.map((social) => (
              <img
                key={social.name}
                src={social.url}
                alt={social.name}
                className="w-[24px] h-[24px] object-contain cursor-pointer"
              />
            ))}
          </div>
      <h2 className="lg:font-extrabold text-[24px] leading-[30.24px] text-white sm:font-extrabold text-[16px] leading-[30.24px] p-[5px] text-white sm:grid grid-rows-4 grid-flow-col">
        DOGE COOKIE
      </h2>
       <button type="button" className="flex items-center h-fit w-fit px-4 py-4 bg-[#25618B] rounded-[32px] gap-[4px]">
          <img
            src="/images/doge-cookie.png"
            alt="headset"
            className="w-[24px] h-[16px] object-contain"
          />
          <span className="font-normal text-[12px] text-white">
            BUY NOW
          </span>
        </button>
    </div>
  </motion.nav>
);

export default Navbar;
