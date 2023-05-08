import { motion } from 'framer-motion';

import styles from '../styles';
import { TitleText, TypingText } from '../components';


const DogeCookie = () => (
     <section className={`${styles.paddings} relative z-10 bg-[#4b5563]`}>

      <TypingText title="| Doge Cookie" textStyles="text-center" />
      <TitleText
        title={(
          <>presale section
          </>
        )}
        textStyles="text-center"
      />
      <div></div>
  


  </section>

)

export default DogeCookie