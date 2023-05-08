import {useState, useEffect} from 'react';

import {getRemainingTimeUntilMsTimestamp} from './Utils/CountdownTimerUtils';

import './timer.css'

const defaultRemainingTime = {
    seconds: '00',
    minutes: '00',
    hours: '00',
    days: '00'
}

const CountdownTimer = ({countdownTimestampMs}) => {
    const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateRemainingTime(countdownTimestampMs);
        }, 1000);
        return () => clearInterval(intervalId);
    },[countdownTimestampMs]);

    function updateRemainingTime(countdown) {
        setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
    }

    return(
        <div className='timer'>
            <div >{remainingTime.days}</div>
            <div >days</div>
            <div className="two-numbers">{remainingTime.hours}</div>
            <div>hours</div>
            <div className="two-numbers">{remainingTime.minutes}</div>
            <div>minutes</div>
            <div className="two-numbers">{remainingTime.seconds}</div>
            <div>seconds</div>
        </div>
        
    );
}

export default CountdownTimer;