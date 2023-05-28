import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { TypingText } from '../components';

import styles from '../styles';
import { fadeIn, staggerContainer } from '../utils/motion';

function Roadmap() {
  return (<>
        <div className="gradient-02 z-0"  />
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
    ><TypingText title="| Road Map" textStyles="text-center" />

    <img
      src="/images/IMG_20230528_223728_099.jpg"
      alt="headset"
      className="img-fluid"
      style={{ width: '204px', height: '106px', objectFit: 'contain' }}
    />
     <motion.p
        variants={fadeIn('up', 'tween', 0.2, 1)}
        className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-secondary-white"
      >
        <div className="d-flex flex-column align-items-center">
            <a  href={require("../assets/doge-cookie-logo.png")}
                download="myFile">Visit our white paper</a>
            <div className="d-flex justify-content-center">
              {/* <a
                href={require("../assets/doge-cookie-logo.png")}
                download="myFile"
                className="btn btn-primary"
              >
                Download file
              </a> */}
            </div>
          </div>
      </motion.p>
    </motion.div>
    </>
  );
}

export default Roadmap;
