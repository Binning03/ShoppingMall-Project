import React, {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';
import { Table, TableBody, TableHead, TableHeadCell } from "flowbite-react";

import { AuthContext } from '../../shared/context/auth-context';
import categorySelector from '../../shared/util/categorySelector';
import { useSendRequest } from '../../shared/hook/send-request';
import ErrorModal from '../../shared/util/ErrorModal';

import HistoryProduct from './HistoryProduct';

const MyHistory = () => {
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
    <div className="flex justify-center">
      <Table>
        <TableHead>
          <TableHeadCell>Product name</TableHeadCell>
          <TableHeadCell>Category</TableHeadCell>
          <TableHeadCell>Price</TableHeadCell>
          <TableHeadCell>Stock</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {userData?.history.map((product) => (
            <HistoryProduct 
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
  );
};

export default MyHistory;