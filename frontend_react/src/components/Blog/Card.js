import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faStar } from '@fortawesome/free-solid-svg-icons';

const Card = ({ cardItem }) => {
     const formattedTime = formatDistanceToNow(new Date(cardItem.added_date_time), { addSuffix: true, includeSeconds: true });
  return (
    <>
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden my-4 transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
        {cardItem.image && <img className="w-full h-48 object-cover" src={cardItem.image} alt='card image' />}
        <div className="px-6 py-4">
          {cardItem.category && (
            <span className="inline-block bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">
              {cardItem.category}
            </span>
          )}
          <div className="font-bold text-xl mt-2 mb-2">{cardItem.title}</div>
          <p className="text-gray-700 text-base">
            By {cardItem.author.username} - {formattedTime}
          </p>
        </div>
        <div className="px-6 py-4">
          <p className="text-gray-700 text-base mb-2">{cardItem.content}</p>
        </div>
        <div className="px-6 py-4 flex flex-wrap justify-between items-center border-t border-gray-200">
          <div className="flex items-center text-gray-700 mb-2 md:mb-0">
            <FontAwesomeIcon icon={faComments} className="mr-2" />
            <span className="font-bold">{cardItem.comments && cardItem.comments.length}</span> Comments
          </div>
          <div className="flex items-center text-gray-700">
            <FontAwesomeIcon icon={faStar} className="mr-1" />
            <span className="font-bold">{cardItem.rating}</span> Ratings
          </div>
        </div>
      </div>
    </>
   
  );
};

export default Card;
