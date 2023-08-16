import React from 'react';

const StarIcon = ({ filled }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={filled ? 'gold' : '#ccc'}
        >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2l2.5 7.5H22l-6.5 4.5 2.5 7.5L12 17l-6.5 4.5 2.5-7.5L2 9.5h7.5z" />
        </svg>
    );
};

export default StarIcon;