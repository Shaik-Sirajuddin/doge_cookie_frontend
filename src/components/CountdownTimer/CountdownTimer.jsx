import {useState, useEffect} from 'react';
import './CountdownTimer.css';
import {getRemainingTimeUntilMsTimestamp} from './Utils/CountdownTimerUtils';

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
        <div className='timer-VT323'>
        <p className='text-white timer-VT323'>presale stage 1</p>
        <div className="countdown-timer timer-VT323 white-glassmorphism">
            <span>{remainingTime.days}</span>
            <span>days</span>
            <span className="two-numbers timer-VT323">{remainingTime.hours}</span>
            <span>hours</span>
            <span className="two-numbers timer-VT323">{remainingTime.minutes}</span>
            <span>minutes</span>
            <span className="two-numbers timer-VT323">{remainingTime.seconds}</span>
            <span>seconds</span>
        </div>
        </div>
        
    );
}

export default CountdownTimer;