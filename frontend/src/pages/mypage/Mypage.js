import React, {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';
import { Card, Avatar } from "flowbite-react";

import { useSendRequest } from '../../shared/hook/send-request';
import UserImage from "../../shared/image/userImage.png";
import ErrorModal from '../../shared/util/ErrorModal';
import { AuthContext } from '../../shared/context/auth-context';

const Mypage = () => {
  const [ isError, setIsError ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState("");
  const [ userData, setUserData ] = useState();
  
  const userId = useParams().uid
  const { sendRequest } = useSendRequest();
  const auth = useContext(AuthContext);
  
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
      <Card className="w-1/3">
        <div className="flex flex-col items-center pb-10">
          <Avatar 
            alt="User Image"
            size="lg"
            img={UserImage}
            rounded
          />
          <h5 className="mb-1 text-3xl font-medium text-gray-900 dark:text-white">{userData?.name}</h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">email: {userData?.email}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">address: {userData?.address}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">phone number: {userData?.phonenumber}</span>
          <div className="mt-4 flex space-x-3 lg:mt-6">
            <a
              href={`/review/${userId}`}
              className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
              Show my reviews
            </a>
          </div>
          <div className="mt-4 flex space-x-3 lg:mt-6">
            <a
              href={`/history/${userId}`}
              className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
              Show my purchase history
            </a>
          </div>
          <div className="mt-4 flex space-x-3 lg:mt-6">
            <a
              href={`/edit/${userId}`}
              className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
              Edit my info
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Mypage;