// import { motion } from 'framer-motion';

import styles from '../styles';
import { newFeatures } from '../constants';
import { NewFeatures, TitleText, TypingText } from '../components';
// import { planetVariants, staggerContainer, fadeIn } from '../utils/motion';

const WhatsNew = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <div

      className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-6`}
    >
      <div
        className="flex-[0.95] flex justify-center flex-col col-6"
      >
        <TypingText title="| Tokenomics" />
        <TitleText title={<>Token in circulation: 100B</>} />
        <div className="mt-[48px] flex flex-wrap justify-between gap-[24px]">
          {newFeatures.map((feature) => (
            <div className='bg-blue-300 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700' style={{ padding: "3%" }}>
              <NewFeatures key={feature.title} {...feature} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WhatsNew;
