import React from 'react'
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
export const AuditSpace = () => {
    const reviews = [
        { id: 1, name: 'UNISWAP', review: 'One of the Best.', imageUrl: 'https://picsum.photos/80/80?random=1' },
        { id: 2, name: 'COINDCX', review: 'Safest among all.', imageUrl: 'https://picsum.photos/80/80?random=2' },
        { id: 3, name: 'BINANCE', review: 'Profitable.', imageUrl: 'https://picsum.photos/80/80?random=3' },
    ];

    return (
        <div className="bg-yellow-200 py-10">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-6 text-center">100% Trusted and Audited by the following third parties:</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white p-4 shadow-md rounded-xl flex">
                            <img src={review.imageUrl} alt={review.name} className="w-16 h-16 object-cover rounded-full mr-4" />
                            <div>
                                <h3 className="text-lg font-bold mb-2">{review.name}</h3>
                                <p className="text-gray-700">{review.review}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};