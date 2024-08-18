import React from 'react';
import { FaStar } from 'react-icons/fa';

const Rating = ({ rating, onRating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => onRating(ratingValue)}
              className="hidden"
            />
            <FaStar
              size={24}
              color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
              className="cursor-pointer hover:fill-slate-400"
            />
          </label>
        );
      })}
    </div>
  );
};

export default Rating;
