import React, { useState } from 'react';

export default function ReturnsCal() {


    const [sliderValue, setSliderValue] = useState(50);
    const [inputValue, setInputValue] = useState('');

    const handleSliderChange = (e) => {
        setSliderValue(e.target.value);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form submission logic here
        console.log('Slider Value:', sliderValue);
        console.log('Input Value:', inputValue);
    };

    return (

        <div className="staking-page">
            <h2>Returns Calculator</h2>
            <div
                style={{
                    // display: "flex",
                    alignContent: "center",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                }}
            >
                <form className="w-64 mx-auto mt-8" onSubmit={handleSubmit}>
                    <div className="mb-4  items-center justify-center">
                        <div className="staking-plans">
                            <h3>$DOGE</h3> </div>

                        <input
                            className="staking-amount"
                            id="inputField"
                            type="number"
                            min={0}
                            placeholder="Enter a value"
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <h6>Value : 25$</h6>
                    </div>
                    <div>
                        Move the slider to see how much your $BIG
                        will be worth at different price targets!
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="slider">
                            Slider
                        </label>
                        <input
                            className="w-full"
                            id="slider"
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={sliderValue}
                            onChange={handleSliderChange}
                        />
                        <span className="text-gray-700">{sliderValue}</span>
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Buy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
