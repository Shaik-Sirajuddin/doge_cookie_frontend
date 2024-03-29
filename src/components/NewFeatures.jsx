/** @format */

import styles from "../styles";

const NewFeatures = ({
  imgUrl,
  title,
  presale,
  subtitle,
  dollarPrice,
  totalPrice,
}) => (
  <div className="flex-1 flex flex-col sm:max-w-[250px] min-w-[210px]">
    <div
      className={`${styles.flexCenter} w-[70px] h-[70px] rounded-[24px] bg-[#323F5D]`}
    >
      <img src={imgUrl} alt="icon" className="w-1/2 h-1/2 object-contain" />
    </div>
    <h1 className="mt-[26px] font-bold text-[24px] leading-[30.24px] text-white">
      {title}
    </h1>
    <h1 className="mt-[26px] font-bold text-[24px] leading-[30.24px] text-white">
      {presale}
    </h1>
    <div style={{ height: "20px" }}></div>
    <p className="flex-1 mt-[16px] font-normal text-[18px] text-[#fff] leading-[32.4px]">
      {subtitle}
    </p>
    <p className="flex-1 mt-[16px] font-normal text-[18px] text-[#fff] leading-[32.4px]">
      {dollarPrice}
    </p>
    <p className="flex-1 mt-[16px] font-normal text-[18px] text-[#fff] leading-[32.4px]">
      {totalPrice}
    </p>
  </div>
);

export default NewFeatures;
