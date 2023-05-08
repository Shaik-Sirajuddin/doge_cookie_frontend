import { motion } from 'framer-motion';
import { TypingText } from '../components';

import styles from '../styles';
import { fadeIn, staggerContainer } from '../utils/motion';

const About = () => (
  <section className={`${styles.paddings} relative z-10 bg-red-500`}>
    <div className="gradient-02 z-0"  />
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
    >
      <TypingText title="| About DOGE COOKIE" textStyles="text-center" />

      <motion.p
        variants={fadeIn('up', 'tween', 0.2, 1)}
        className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-secondary-white"
      >
        <span className="font-extrabold text-white">Doge cookie </span>
        $DCK is a full-on community token with the main goal of generating wealth solely for its members.{' '}
        <span className="font-extrabold text-white"> The utilities are built through a formidable ecosystem and 90% of the generated revenue will be infused back into the community.
        </span>{' '}
        {' '}
        <span className="font-extrabold text-white">To attain such wealth generation on our community-based token, The team has put in place several activities such as voting to earn, stake to earn, and lots more to give the community high earning power.</span> {' '} <span className="font-extrabold text-white"> We build the $DCK platform on the blockchain technology. Therefore, you can be sure that our voting system is secure and transparent.</span> Furthermore, we aim to go above and beyond by creating a blockchain ecosystem that self-promotes using NFTs to provide access to additional material and events that make the blockchain hype ship worthwhile to board
      </motion.p>

      <motion.img
        variants={fadeIn('up', 'tween', 0.3, 1)}
        src="/images/arrow-down.svg"
        alt="arrow down"
        className="w-[18px] h-[28px] object-contain mt-[28px]"
      />
    </motion.div>
  </section>
);

export default About;
