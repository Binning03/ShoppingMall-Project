import React from 'react';
import { Card, Blockquote, Rating, RatingStar } from "flowbite-react";

const ReviewBlock = (props) => {
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
        <figcaption className="mt-3 flex items-center space-x-3">
          <div className="flex items-center divide-x-2 divide-gray-300 dark:divide-gray-700">
            <cite className="pr-3 font-medium text-gray-900 dark:text-white">{props.user}</cite>
          </div>
        </figcaption>
      </figure>
    </Card>
  );
};

export default ReviewBlock;