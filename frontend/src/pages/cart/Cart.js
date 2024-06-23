import React, {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';
import { Table, TableBody, TableHead, TableHeadCell, Button  } from "flowbite-react";

import categorySelector from '../../shared/util/categorySelector';
import { AuthContext } from '../../shared/context/auth-context';
import { useSendRequest } from '../../shared/hook/send-request';
import ErrorModal from '../../shared/util/ErrorModal';

import CartProduct from './CartProduct';

const Cart = () => {
  const [ isError, setIsError ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState("");
  const [ userData, setUserData ] = useState();
  
  const auth = useContext(AuthContext);
  const userId = useParams().uid
  const { sendRequest } = useSendRequest();
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/${userId}`
        );
        setUserData(responseData.user);
      } catch (err) {
        setIsError(true);
        setErrorMessage(err.message);
      }
    };
    fetchUser();
    if(userId !== auth.userId) {
      setIsError(true);
      setErrorMessage('Invalid userId');
    }
  }, [sendRequest, userId, auth]);
  

  
  const deleteAllFromCart = async (evt) => {
    evt.preventDefault();
    try {
      // const responseData = 
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/carts/${userId}`,
        'DELETE'
      );
      alert("Delete All from a cart successfully");
      window.location.reload();
    } catch (err) {
      setIsError(true);
      setErrorMessage(err.message);
    }
  };
  
  const Payment = async (evt) => {
    evt.preventDefault();
    try {
      // const responseData = 
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/${userId}`,
        'POST'
      );
      alert("Pay for products in cart successfully");
      window.location.href = '/';
    } catch (err) {
      setIsError(true);
      setErrorMessage(err.message);
    }
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
    <>
      <div className="flex justify-center">
        <Table>
          <TableHead>
            <TableHeadCell>Product name</TableHeadCell>
            <TableHeadCell>Category</TableHeadCell>
            <TableHeadCell>Price</TableHeadCell>
            <TableHeadCell>Stock</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Delete</span>
            </TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {userData?.cart.map((product) => (
              <CartProduct 
                key={product.id}
                id={product.id}
                name={product.name}
                category={categorySelector(Number(product.category))}
                price={product.price}
                stock={product.stock}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <span className="flex justify-center">
          <Button onClick={Payment}>Payment</Button>
          <Button color="dark" onClick={deleteAllFromCart}>Clear Cart</Button>
        </span>
      </div>
    </>
  );
};

export default Cart;