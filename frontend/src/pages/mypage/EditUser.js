import React, { useContext, useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { Button, Label, TextInput, Card } from "flowbite-react";

import { AuthContext } from '../../shared/context/auth-context';
import { useSendRequest } from '../../shared/hook/send-request';
import ErrorModal from '../../shared/util/ErrorModal';

const Signup = () => {
  const [ isError, setIsError ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState("");
  const [ userData, setUserData ] = useState();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phonenumber: ""
  });
  const auth = useContext(AuthContext);
  const userId = useParams().uid;
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
  
  const handleChange = (evt) => {
    const changedField = evt.target.name;
    const newValue = evt.target.value;
    setFormData((currData) => {
      return {
        ...currData,
        [changedField]: newValue,
      };
    });
  };
  
  const submitHandler = async (evt) => {
    evt.preventDefault();
    try {
      // const responseData = 
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/${userId}`,
        'PATCH',
        JSON.stringify({
          name: formData.name,
          address: formData.address,
          phonenumber: formData.phonenumber
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      window.location.href = `https://frontenddemo.run.goorm.site/user/${userId}`
    } catch (err) {
      setIsError(true);
      setErrorMessage(err.message);
    }
  };
  
  useEffect(() => {
    setFormData({
      name: userData?.name || "",
      address: userData?.address || "",
      phonenumber: userData?.phonenumber || "",
    });
  }, [userData]);
  
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
      <Card className="w-1/2 max-w-96">
        <form className="flex max-w-md flex-col gap-4" onSubmit={submitHandler}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your name" />
            </div>
            <TextInput id="name" type="text" value={formData.name} onChange={handleChange} name="name" required shadow />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="address" value="Your address" />
            </div>
            <TextInput id="address" type="text" value={formData.address} onChange={handleChange} name="address" required shadow />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="phonenumber" value="Your phonenumber" />
            </div>
            <TextInput id="phonenumber" type="text" value={formData.phonenumber} onChange={handleChange} name="phonenumber" required shadow />
          </div>
          <Button type="submit">Edit User info</Button>
        </form>
      </Card>
    </div>
  );
};

export default Signup;