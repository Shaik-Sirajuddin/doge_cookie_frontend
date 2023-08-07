/** @format */

import React from "react";

import Countdown from "react-countdown";
const renderer = ({ days, hours, minutes, seconds, completed, className }) => {
  hours = (days % 24) + hours;
  if (completed) {
    localStorage.setItem("presale", "ended");
    return (
      <h3 style={{ color: "#DC3545", marginBottom: "30px" }}>
        Presale has Ended!
      </h3>
    );
  } else {
    localStorage.setItem("presale", "running");
    return (
      <div className={`countdown ${className}`}>
        <div className="item">
          <span className="subtitle">{days < 10 ? `0${days}` : days}</span>
          <span>Days</span>
        </div>
        <div className="item">
          <span className="subtitle">{hours < 10 ? `0${hours}` : hours}</span>
          <span>Hours</span>
        </div>
        <div className="item">
          <span className="subtitle">
            {minutes < 10 ? `0${minutes}` : minutes}
          </span>
          <span>Mins</span>
        </div>
        <div className="item">
          <span className="subtitle">
            {seconds < 10 ? `0${seconds}` : seconds}
          </span>
          <span>Secs</span>
        </div>
      </div>
    );
  }
};
const CountdownCard = ({ targetDate }) => {
  const convertDate = (date, tzString) => {
    return new Date(
      (typeof date === "string" ? new Date(date) : date).toLocaleString(
        "en-US",
        { timeZone: tzString }
      )
    );
  };
  return (
    <Countdown
      date={convertDate(targetDate, "Asia/singapore")}
      renderer={renderer}
    />
  );
};

export default CountdownCard;
