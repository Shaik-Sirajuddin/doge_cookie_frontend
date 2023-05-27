import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { differenceInSeconds, intervalToDuration, formatDuration } from 'date-fns';


export default function CountdownTimer() {
    const targetDate = new Date('2023-06-01T00:00:00'); // Set your target date here
    const [countdown, setCountdown] = useState(getCountdownTime());

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown(getCountdownTime());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    function getCountdownTime() {
        const seconds = differenceInSeconds(targetDate, new Date());
        return seconds > 0 ? seconds : 0;
    }

    function formatCountdown() {
        const duration = intervalToDuration({ start: 0, end: countdown * 1000 });
        return formatDuration(duration, {
            format: ['months', 'days', 'hours', 'minutes', 'seconds'],
            delimiter: ' : ',
        });
    }

    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center -mx-4">
                {formatCountdown().split(':').map((count, index) => (
                    <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-4">
                        <div className="h-full bg-white p-4 rounded-lg shadow">
                            <div className="flex flex-col items-center">
                                <span className="text-3xl font-bold">{count}</span>
                                <span className="text-sm">
                                    {index === 0 ? 'Months' : index === 1 ? 'Days' : index === 2 ? 'Hours' : index === 3 ? 'Minutes' : 'Seconds'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
// export default CountdownTimer;