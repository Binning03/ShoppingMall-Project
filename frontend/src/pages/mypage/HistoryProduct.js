import React from 'react';
import { TableCell, TableRow } from "flowbite-react";

const CartProduct = (props) => {
  return (
    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        <a className="text-blue-600 underline underline-offset-1" href={`/product/${props.id}`}>{props.name}</a>
      </TableCell>
      <TableCell>{props.category}</TableCell>
      <TableCell>{props.price}</TableCell>
      <TableCell>{props.stock}</TableCell>
    </TableRow>
  );
}

export default CartProduct;