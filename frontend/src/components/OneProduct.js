import React from 'react';
import { Card } from "flowbite-react";

const OneProduct = (props) => {
  return (
    <a href={`/product/${props.id}`}>
      <Card
        className="basis-1/3 mx-8 my-8 min-w-48 max-w-64"
        imgAlt="image"
        imgSrc={props.image}
      >
        <h5 className="text-3xl font-bold text-gray-900 dark:text-white">
          {props.name}
        </h5>
        <span className="text-2xl font-bold text-gray-900 dark:text-white">${props.price}</span>
      </Card>
    </a>
  );
};

export default OneProduct;