import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import { TableCell, TableRow } from "flowbite-react";

import { useSendRequest } from '../../shared/hook/send-request';
import ErrorModal from '../../shared/util/ErrorModal';

const CartProduct = (props) => {
  const [ isError, setIsError ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState("");
  const userId = useParams().uid;
  const { sendRequest } = useSendRequest();
  
  const deleteFromCart = async (evt) => {
    evt.preventDefault();
    try {
      // const responseData = 
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/carts/${userId}/${props.id}`,
        'DELETE'
      );
    } catch (err) {
      setIsError(true);
      setErrorMessage(err.message);
    }
    alert("Delete from a cart successfully");
    window.location.reload();
  };
  
  if(isError){
    return (
      <ErrorModal 
        header="Error occurs"
        message1={errorMessage}
        message2="Please try again"
      />
    );  
  }
  
  return (
    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        <a className="text-blue-600 underline underline-offset-1" href={`/product/${props.id}`}>{props.name}</a>
      </TableCell>
      <TableCell>{props.category}</TableCell>
      <TableCell>{props.price}</TableCell>
      <TableCell>{props.stock}</TableCell>
      <TableCell>
        <span onClick={deleteFromCart} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
          Delete
        </span>
      </TableCell>
    </TableRow>
  );
}

export default CartProduct;