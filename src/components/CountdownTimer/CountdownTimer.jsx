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
        <div className="grid grid-cols-5 gap-4">
            <div className="col-span-3 bg-gray-200 p-4 rounded-lg">
                <div className="staking-plans">
                    <h3>Total $DogeCookie tokens sold:</h3>
                </div>
                <div className="mt-4 flex justify-between">
                    <div className="text-lg text-gray-600">9,679,318.5937178</div>
                    <div className="text-lg text-green-600">41.48%</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                        <div className="h-full w-0 bg-white opacity-75 animate-progress" style={{ width: '53.6%' }}></div>
                    </div>
                </div>
                <div className="mt-4 flex justify-between">
                    <div className="text-sm text-gray-600">
                        Current Price: $0.0403685
                    </div>
                    <div className="text-sm text-gray-600">Total: 23,333,333</div>
                </div>
            </div>

            <div className="col-span-2 bg-gray-200 rounded-lg flex items-center">
                <div className="container mx-auto px-4">
                    <div className="staking-plans">
                       <h6 className="text">
                         Pre-Sale Starts In :
                       </h6>
                    </div>
                    <div className="flex flex-wrap justify-center -mx-2">
                        {formatCountdown().split(':').map((count, index) => (
                            <div key={index} className="text-4xl font-bold p-1 mb-4">
                            <div className="h-full bg-black p-2 rounded-lg shadow flex flex-col items-center">
                                <div className="text-lg text-white">
                                    <span>{count}</span>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}
