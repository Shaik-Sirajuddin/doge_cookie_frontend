// import { motion } from 'framer-motion';
// import { useState } from 'react';

import styles from '../styles';
// import { slideIn, staggerContainer } from '../utils/motion';
import CountdownTimer from '../components/CountdownTimer/CountdownTimer';
// import { DogeCookie } from '../pages';


const Hero = () => {
  //    const [openConnect, setOpenConnect] = useState(false);
  //  const handleOnClose = () => setOpenConnect(false)
return (
  <section>
    <div>
      <CountdownTimer />
    </div>
    <div className="flex flex-row justify-center items-center w-full">
      <h1 className="flex font-poppins font-semibold ss:text-[72px] text-[92px] text-white ss:leading-[100.8px] leading-[75px] m-10 ">
        <span className="font-hero"></span>  <br className="sm:block hidden" />{" "}
      <span className="text-gradient justify-center items-center">PRESALE</span>{" "}
      </h1>
          <div className="ss:flex hidden md:mr-4 mr-0 w-6" />
        </div>
        <div className="flex flex-row justify-center items-center w-full">
        <h1 className="text-gradient justify-center items-center font-semibold text-white">
          IS LIVE NOW !!!
        </h1>
        </div>
        <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full">
        </h1>
          <div className=" bg-opacity-30">
      <div className="max-w-3xl mx-auto ">
        <span className="text-center py-2">
        
         
        </span>
            <div  className="rounded-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-white px-5 py-4 rounded hover:scale-95 transition text-xl" />
      </div>
      </div>
        
        
        <div className={`${styles.paragraph} max-w-[470px] mt-5`}/>
    


      <div className="relative w-full md:-mt-[20px] -mt-[0px]">
        <div className="absolute w-full h-[300px] hero-gradient rounded-tl-[140px] z-[0] -top-[30px]"  />
        <div >
           <img
          src="/images/unibg2.png"
          alt="hero_cover"
          className="w-full sm:h-[500px] h-[350px] object-cover rounded-tl-[140px] z-10 relative"
        />
       <a href="presale">
          <div className="w-full flex justify-end sm:-mt-[70px] -mt-[50px] pr-[40px] relative z-10">
         
            <img
              src="/images/doge-cookie-logo.png"
              alt="stamp"
              className="sm:w-[155px] w-[100px] sm:h-[155px] h-[100px] object-contain"
            />
          </div>
        </a>
      
        
        </div>
      </div>
    
  </section>
) 
};

export default Hero;



