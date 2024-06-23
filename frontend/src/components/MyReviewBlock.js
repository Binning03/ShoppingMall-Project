import React from 'react';
import { Card, Blockquote, Rating, RatingStar, Button } from "flowbite-react";

import { useSendRequest } from '../shared/hook/send-request';

const ReviewBlock = (props) => {
  const reviewId = props.id;
  const { sendRequest } = useSendRequest();
  
  const deleteReview = async (evt) => {
    evt.preventDefault();
    try {
      // const responseData = 
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/reviews/${reviewId}`,
        'DELETE'
      );
      alert("Delete a review successfully")
      window.location.reload(true);
    } catch (err) {}
  };
  
  return (
    <Card className="mx-8">
      <figure className="max-w-screen-md">
        <div className="mb-4 flex items-center">
          <Rating size="md">
            {[...Array(props.star)].map((a, i) => (
              <RatingStar key={i} />
            ))}
            {[...Array(5 - props.star)].map((a, i) => (
              <RatingStar filled={false} key={i} />
            ))}
          </Rating>
        </div>
        <Blockquote>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {props.comment}
          </p>
        </Blockquote>
        <figcaption className="mt-1 flex items-center space-x-3">
          <div className="flex items-center divide-x-2 divide-gray-300 dark:divide-gray-700">
            <cite className="pr-3 font-medium text-gray-900 dark:text-white">to <a className="text-blue-600 underline underline-offset-1" href={`https://frontenddemo.run.goorm.site/product/${props.productId}`}>{props.product}</a></cite>
          </div>
        </figcaption>
        <Button className="mt-3" color="failure" onClick={deleteReview}>Delete Review</Button>
      </figure>
    </Card>
  );
};

export default ReviewBlock;